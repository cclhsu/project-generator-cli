import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { CreateMetricRequestDTO } from '../dto';
import { UpdateMetricRequestDTO } from '../dto';
import { MetricEntity } from '../entity/metric.entity';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { MetricMetadataEntity } from '../entity/metric-metadata.entity';
import { MetricContentEntity } from '../entity/metric-content.entity';
import { CommonDateEntity } from '../../../common/entity/common-date.entity';
import { existsSync, mkdirSync, readFileSync } from 'fs';
import {
  DEFAULT_DATABASE_STORAGE_DEVICE_TYPE,
  DEFAULT_FILE_STORAGE_DEVICE_TYPE,
  DEFAULT_FILE_STORAGE_EXTENSION,
  DEFAULT_STORAGE_DEVICE_TYPE,
  DEFAULT_STORAGE_FILE_TYPE,
  DEFAULT_METRIC_FILE_PATH,
  DEFAULT_METRIC_PATH,
  STORAGE_DEVICE_TYPES,
} from '../../../common/constant';
import { glob } from 'glob';
import { createDirectory } from '../../../utils/directory/directory.utils';
import { deleteFile } from '../../../utils/file/file.utils';
import { MetricMetadataDTO, MetricContentDTO, MetricIdUuidDTO } from '../dto';

@Injectable()
export class MetricLocalRepository {
  private readonly logger = new Logger(MetricLocalRepository.name);
  private storageStrategy: StorageStrategy;

  private metrics: MetricEntity[] = [];

  constructor(
    @Inject('ReadSingleFromJSON')
    private readonly readSingleFromJSON: <T>(filePath: string) => Promise<T>,
    @Inject('WriteSingleToJSON')
    private readonly writeSingleToJSON: <T>(filePath: string, data: T) => void,
    @Inject('ReadSingleFromYAML')
    private readonly readSingleFromYAML: <T>(filePath: string) => Promise<T>,
    @Inject('WriteSingleToYAML')
    private readonly writeSingleToYAML: <T>(filePath: string, data: T) => void,
    @Inject('ReadSingleFromCSV')
    private readonly readSingleFromCSV: <T>(filePath: string) => Promise<T>,
    @Inject('WriteSingleToCSV')
    private readonly writeSingleToCSV: <T>(filePath: string, data: T) => void,
    // @Inject('ReadSingleFromMarkdown')
    // private readonly readSingleFromMarkdown: <T>(filePath: string) => Promise<T>,
    // @Inject('WriteSingleToMarkdown')
    // private readonly writeSingleToMarkdown: <T>(filePath: string, data: T) => void,
    @Inject('ReadArrayFromJSON')
    private readonly readArrayFromJSON: <T>(filePath: string) => Promise<T[]>,
    @Inject('WriteArrayToJSON')
    private readonly writeArrayToJSON: <T>(filePath: string, data: T[]) => void,
    @Inject('ReadArrayFromYAML')
    private readonly readArrayFromYAML: <T>(filePath: string) => Promise<T[]>,
    @Inject('WriteArrayToYAML')
    private readonly writeArrayToYAML: <T>(filePath: string, data: T[]) => void,
    @Inject('ReadArrayFromCSV')
    private readonly readArrayFromCSV: <T>(filePath: string) => Promise<T[]>,
    @Inject('WriteArrayToCSV')
    private readonly writeArrayToCSV: <T>(filePath: string, data: T[]) => void, // @Inject('ReadArrayFromMarkdown') // private readonly readArrayFromMarkdown: <T>(filePath: string) => Promise<T[]>, // @Inject('WriteArrayToMarkdown') // private readonly writeArrayToMarkdown: <T>(filePath: string, data: T[]) => void,
  ) {
    this.storageStrategy = this.getStorageStrategy();
  }

  // Get all metric IDs and UUIDs
  async listMetricIdsAndUUIDs(): Promise<MetricIdUuidDTO[]> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.listMetricIdsAndUUIDs();
  }

  // Get all metrics
  async listMetrics(): Promise<MetricEntity[]> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.listMetrics();
  }

  // Get a metric by UUID
  async getMetric(UUID: string): Promise<MetricEntity> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.getMetric(UUID);
  }

  // Create a new metric
  async createMetric(
    createMetricRequestDTO: CreateMetricRequestDTO,
  ): Promise<MetricEntity> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.createMetric(createMetricRequestDTO);
  }

  // Update a metric by UUID
  async updateMetric(
    UUID: string,
    updateMetricRequestDTO: UpdateMetricRequestDTO,
  ): Promise<MetricEntity> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.updateMetric(UUID, updateMetricRequestDTO);
  }

  // Delete a metric by UUID
  async deleteMetric(UUID: string): Promise<MetricEntity> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.deleteMetric(UUID);
  }

  // Get a metric by ID
  async getMetricByID(ID: string): Promise<MetricEntity> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.getMetricByID(ID);
  }

  // Get a metric by name
  async getMetricByName(name: string): Promise<MetricEntity> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.getMetricByName(name);
  }

  // Update a metric metadata by UUID
  async updateMetricMetadata(
    UUID: string,
    updatedMetadata: MetricMetadataDTO,
  ): Promise<MetricMetadataDTO> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.updateMetricMetadata(UUID, updatedMetadata);
  }

  // Update a metric content by UUID
  async updateMetricContent(
    UUID: string,
    updatedContent: MetricContentDTO,
  ): Promise<MetricContentDTO> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.updateMetricContent(UUID, updatedContent);
  }

  // Get a metric metadata by UUID
  async getMetricMetadata(UUID: string): Promise<MetricMetadataDTO> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.getMetricMetadata(UUID);
  }

  // Get a metric content by UUID
  async getMetricContent(UUID: string): Promise<MetricContentDTO> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.getMetricContent(UUID);
  }

  private getStorageStrategy(): StorageStrategy {
    if (DEFAULT_STORAGE_DEVICE_TYPE === 'file') {
      if (DEFAULT_FILE_STORAGE_DEVICE_TYPE === 'json') {
        if (DEFAULT_STORAGE_FILE_TYPE === 'single') {
          return new SingleJsonStorage(
            DEFAULT_METRIC_FILE_PATH,
            this.readArrayFromJSON,
            this.writeArrayToJSON,
          );
        } else if (DEFAULT_STORAGE_FILE_TYPE === 'multiple') {
          return new MultipleJsonStorage(
            DEFAULT_METRIC_PATH,
            this.readSingleFromJSON,
            this.writeSingleToJSON,
          );
        }
      } else if (DEFAULT_FILE_STORAGE_DEVICE_TYPE === 'yaml') {
        // Implement YAML strategy...
        throw new Error('Unimplemented storage configuration');
      } else if (DEFAULT_FILE_STORAGE_DEVICE_TYPE === 'csv') {
        // Implement CSV strategy...
        throw new Error('Unimplemented storage configuration');
      } else if (DEFAULT_FILE_STORAGE_DEVICE_TYPE === 'md') {
        // Implement MD strategy...
        throw new Error('Unimplemented storage configuration');
      }
    } else {
      if (DEFAULT_DATABASE_STORAGE_DEVICE_TYPE === 'memory') {
        // Implement memory strategy...
        return new MemoryStorage();
      } else if (DEFAULT_DATABASE_STORAGE_DEVICE_TYPE === 'sqlite') {
        // Implement sqlite strategy...
        throw new Error('Unimplemented storage configuration');
      } else if (DEFAULT_DATABASE_STORAGE_DEVICE_TYPE === 'mongo') {
        // Implement mongo strategy...
        throw new Error('Unimplemented storage configuration');
      } else if (DEFAULT_DATABASE_STORAGE_DEVICE_TYPE === 'postgres') {
        // Implement postgres strategy...
        throw new Error('Unimplemented storage configuration');
      }
    }
    throw new Error('Unsupported storage configuration');
  }

  private generateUUID(): string {
    return String(this.metrics.length + 1);
    // return uuidv4();
  }

  async readMetricFromJSON(filePath: string): Promise<MetricEntity> {
    return this.readSingleFromJSON<MetricEntity>(filePath);
  }

  async writeMetricToJSON(
    filePath: string,
    metric: MetricEntity,
  ): Promise<void> {
    this.writeSingleToJSON<MetricEntity>(filePath, metric);
  }

  async readMetricFromYAML(filePath: string): Promise<MetricEntity> {
    return this.readSingleFromYAML<MetricEntity>(filePath);
  }

  async writeMetricToYAML(
    filePath: string,
    metric: MetricEntity,
  ): Promise<void> {
    this.writeSingleToYAML<MetricEntity>(filePath, metric);
  }

  async readMetricFromCSV(filePath: string): Promise<MetricEntity> {
    return this.readSingleFromCSV<MetricEntity>(filePath);
  }

  async writeMetricToCSV(
    filePath: string,
    metric: MetricEntity,
  ): Promise<void> {
    this.writeSingleToCSV<MetricEntity>(filePath, metric);
  }

  async readMetricsFromJSON(filePath: string): Promise<MetricEntity[]> {
    return this.readArrayFromJSON<MetricEntity>(filePath);
  }

  async writeMetricsToJSON(
    filePath: string,
    metrics: MetricEntity[],
  ): Promise<void> {
    this.writeArrayToJSON<MetricEntity>(filePath, metrics);
  }

  async readMetricsFromYAML(filePath: string): Promise<MetricEntity[]> {
    return this.readArrayFromYAML<MetricEntity>(filePath);
  }

  async writeMetricsToYAML(
    filePath: string,
    metrics: MetricEntity[],
  ): Promise<void> {
    this.writeArrayToYAML<MetricEntity>(filePath, metrics);
  }

  async readMetricsFromCSV(filePath: string): Promise<MetricEntity[]> {
    return this.readArrayFromCSV<MetricEntity>(filePath);
  }

  async writeMetricsToCSV(
    filePath: string,
    metrics: MetricEntity[],
  ): Promise<void> {
    this.writeArrayToCSV<MetricEntity>(filePath, metrics);
  }
}

interface StorageStrategy {
  listMetricIdsAndUUIDs(): Promise<MetricIdUuidDTO[]>;
  listMetrics(): Promise<MetricEntity[]>;
  getMetric(UUID: string): Promise<MetricEntity>;
  createMetric(
    createMetricRequestDTO: CreateMetricRequestDTO,
  ): Promise<MetricEntity>;
  updateMetric(
    UUID: string,
    updateMetricRequestDTO: UpdateMetricRequestDTO,
  ): Promise<MetricEntity>;
  deleteMetric(UUID: string): Promise<MetricEntity>;
  getMetricByID(ID: string): Promise<MetricEntity>;
  getMetricByName(name: string): Promise<MetricEntity>;
  updateMetricMetadata(
    uuid: string,
    updatedMetadata: MetricMetadataDTO,
  ): Promise<MetricMetadataDTO>;
  updateMetricContent(
    uuid: string,
    updatedContent: MetricContentDTO,
  ): Promise<MetricContentDTO>;
  getMetricMetadata(uuid: string): Promise<MetricMetadataDTO>;
  getMetricContent(uuid: string): Promise<MetricContentDTO>;
  // searchMetrics(query: string): Promise<MetricEntity[]>;
}

class MemoryStorage implements StorageStrategy {
  private readonly logger = new Logger(MemoryStorage.name);
  private metrics: MetricEntity[] = [
    new MetricEntity(
      'ABC-123',
      '00000000-0000-0000-0000-000000000001',
      new MetricMetadataEntity(
        'Metric 1',
        new CommonDateEntity(
          new Date('2021-01-01T00:00:00.000Z'),
          'john.doe',
          new Date('2021-01-01T00:00:00.000Z'),
          'john.doe',
          new Date('2021-01-01T00:00:00.000Z'),
          'john.doe',
          new Date('2021-01-01T00:00:00.000Z'),
          new Date('2021-01-01T00:00:00.000Z'),
          new Date('2021-01-01T00:00:00.000Z'),
          'john.doe',
        ),
      ),
      new MetricContentEntity(),
    ),
    new MetricEntity(
      'XYZ-789',
      '00000000-0000-0000-0000-000000000002',
      new MetricMetadataEntity(
        'Metric 2',
        new CommonDateEntity(
          new Date('2021-01-01T00:00:00.000Z'),
          'jane.doe',
          new Date('2021-01-01T00:00:00.000Z'),
          'jane.doe',
          new Date('2021-01-01T00:00:00.000Z'),
          'jane.doe',
          new Date('2021-01-01T00:00:00.000Z'),
          new Date('2021-01-01T00:00:00.000Z'),
          new Date('2021-01-01T00:00:00.000Z'),
          'jane.doe',
        ),
      ),
      new MetricContentEntity(),
    ),
  ];

  async listMetricIdsAndUUIDs(): Promise<MetricIdUuidDTO[]> {
    return this.metrics.map((metric) => ({
      ID: metric.ID,
      UUID: metric.UUID,
    }));
  }

  async listMetrics(): Promise<MetricEntity[]> {
    return this.metrics;
  }

  async getMetric(UUID: string): Promise<MetricEntity> {
    const metric: MetricEntity | undefined = this.metrics.find(
      (metric) => metric.UUID === UUID,
    );
    if (!metric) {
      throw new NotFoundException(`Metric ${UUID} cannot be found`);
    }
    return metric;
  }

  async createMetric(
    createMetricRequestDTO: CreateMetricRequestDTO,
  ): Promise<MetricEntity> {
    const newUUID: string = uuidV4();
    const newMetricMetadata: MetricMetadataEntity = plainToInstance(
      MetricMetadataEntity,
      createMetricRequestDTO.metadata,
    );
    const newMetricContent: MetricContentEntity = plainToInstance(
      MetricContentEntity,
      createMetricRequestDTO.content,
    );
    const newMetric: MetricEntity = new MetricEntity(
      createMetricRequestDTO.ID,
      newUUID,
      newMetricMetadata,
      newMetricContent,
    );
    this.metrics.push(newMetric);
    return newMetric;
  }

  async updateMetric(
    UUID: string,
    updateMetricRequestDTO: UpdateMetricRequestDTO,
  ): Promise<MetricEntity> {
    const metricIndex = this.metrics.findIndex(
      (metric) => metric.UUID === UUID,
    );
    if (metricIndex === -1) {
      throw new NotFoundException(`Metric ${UUID} cannot be found`);
    }
    const updatedMetricMetadata: MetricMetadataEntity = {
      ...this.metrics[metricIndex].metadata,
      ...instanceToPlain(updateMetricRequestDTO.metadata),
    };
    const updatedMetricContent: MetricContentEntity = {
      ...this.metrics[metricIndex].content,
      ...updateMetricRequestDTO.content,
    };
    const updatedMetric = new MetricEntity(
      this.metrics[metricIndex].ID,
      UUID,
      updatedMetricMetadata,
      updatedMetricContent,
    );
    this.metrics[metricIndex] = updatedMetric;
    return updatedMetric;
  }

  async deleteMetric(UUID: string): Promise<MetricEntity> {
    const metricIndex = this.metrics.findIndex(
      (metric) => metric.UUID === UUID,
    );
    if (metricIndex === -1) {
      throw new NotFoundException(`Metric ${UUID} cannot be found`);
    }
    const deletedMetric: MetricEntity = this.metrics.splice(metricIndex, 1)[0];
    return deletedMetric;
  }

  async getMetricByID(ID: string): Promise<MetricEntity> {
    const metric: MetricEntity | undefined = this.metrics.find(
      (metric) => metric.ID === ID,
    );
    if (!metric) {
      throw new NotFoundException(`Metric ${ID} cannot be found`);
    }
    return metric;
  }

  async getMetricByName(name: string): Promise<MetricEntity> {
    const metric: MetricEntity | undefined = this.metrics.find(
      (metric) => metric.metadata.name === name,
    );
    if (!metric) {
      throw new NotFoundException(`Metric ${name} cannot be found`);
    }
    return metric;
  }

  // Update a metric metadata by UUID
  async updateMetricMetadata(
    uuid: string,
    updatedMetadata: MetricMetadataDTO,
  ): Promise<MetricMetadataDTO> {
    this.logger.log(
      `Metric UUID: ${uuid} | Metric Metadata: ${updatedMetadata}`,
    );
    const metricIndex = this.metrics.findIndex(
      (metric) => metric.UUID === uuid,
    );
    if (metricIndex === -1) {
      throw new NotFoundException(`Metric ${uuid} cannot be found`);
    }
    const updatedMetricMetadata: MetricMetadataEntity = {
      ...this.metrics[metricIndex].metadata,
      ...instanceToPlain(updatedMetadata),
    };
    const updatedMetric = new MetricEntity(
      this.metrics[metricIndex].ID,
      uuid,
      updatedMetricMetadata,
      this.metrics[metricIndex].content,
    );
    this.metrics[metricIndex] = updatedMetric;
    return updatedMetric.metadata;
  }

  // Update a metric content by UUID
  async updateMetricContent(
    uuid: string,
    updatedContent: MetricContentDTO,
  ): Promise<MetricContentDTO> {
    this.logger.log(`Metric UUID: ${uuid} | Metric Content: ${updatedContent}`);
    const metricIndex = this.metrics.findIndex(
      (metric) => metric.UUID === uuid,
    );
    if (metricIndex === -1) {
      throw new NotFoundException(`Metric ${uuid} cannot be found`);
    }
    const updatedMetricContent: MetricContentEntity = {
      ...this.metrics[metricIndex].content,
      ...updatedContent,
    };
    this.metrics[metricIndex].metadata.dates.updatedAt = new Date();
    const updatedMetric = new MetricEntity(
      this.metrics[metricIndex].ID,
      uuid,
      this.metrics[metricIndex].metadata,
      updatedMetricContent,
    );
    this.metrics[metricIndex] = updatedMetric;
    return updatedMetric.content;
  }

  // Get a metric metadata by UUID
  async getMetricMetadata(uuid: string): Promise<MetricMetadataDTO> {
    this.logger.log(`Metric UUID: ${uuid}`);
    const metricIndex = this.metrics.findIndex(
      (metric) => metric.UUID === uuid,
    );
    if (metricIndex === -1) {
      throw new NotFoundException(`Metric ${uuid} cannot be found`);
    }
    return this.metrics[metricIndex].metadata;
  }

  // Get a metric content by UUID
  async getMetricContent(uuid: string): Promise<MetricContentDTO> {
    this.logger.log(`Metric UUID: ${uuid}`);
    const metricIndex = this.metrics.findIndex(
      (metric) => metric.UUID === uuid,
    );
    if (metricIndex === -1) {
      throw new NotFoundException(`Metric ${uuid} cannot be found`);
    }
    return this.metrics[metricIndex].content;
  }
}

class SingleJsonStorage implements StorageStrategy {
  private readonly logger = new Logger(SingleJsonStorage.name);
  constructor(
    private readonly filePath: string,
    private readonly readFromJSON: <T>(filePath: string) => Promise<T[]>,
    private readonly writeToJSON: <T>(filePath: string, data: T[]) => void,
  ) {}

  async listMetricIdsAndUUIDs(): Promise<MetricIdUuidDTO[]> {
    const metrics: MetricEntity[] = await this.readFromJSON<MetricEntity>(
      this.filePath,
    );
    return metrics.map((metric) => ({
      ID: metric.ID,
      UUID: metric.UUID,
    }));
  }

  async listMetrics(): Promise<MetricEntity[]> {
    return this.readFromJSON<MetricEntity>(this.filePath);
  }

  async getMetric(UUID: string): Promise<MetricEntity> {
    const metrics: MetricEntity[] = await this.readFromJSON<MetricEntity>(
      this.filePath,
    );
    const metric: MetricEntity | undefined = metrics.find(
      (metric) => metric.UUID === UUID,
    );
    if (!metric) {
      throw new NotFoundException(`Metric ${UUID} cannot be found`);
    }
    return metric;
  }

  async createMetric(
    createMetricRequestDTO: CreateMetricRequestDTO,
  ): Promise<MetricEntity> {
    const metrics: MetricEntity[] = await this.readFromJSON<MetricEntity>(
      this.filePath,
    );
    const newUUID: string = uuidV4();
    const newMetricMetadata: MetricMetadataEntity = plainToInstance(
      MetricMetadataEntity,
      createMetricRequestDTO.metadata,
    );
    const newMetricContent: MetricContentEntity = plainToInstance(
      MetricContentEntity,
      createMetricRequestDTO.content,
    );
    const newMetric: MetricEntity = new MetricEntity(
      createMetricRequestDTO.ID,
      newUUID,
      newMetricMetadata,
      newMetricContent,
    );
    metrics.push(newMetric);
    this.writeToJSON(this.filePath, metrics);
    return newMetric;
  }

  async updateMetric(
    UUID: string,
    updateMetricRequestDTO: UpdateMetricRequestDTO,
  ): Promise<MetricEntity> {
    const metrics: MetricEntity[] = await this.readFromJSON<MetricEntity>(
      this.filePath,
    );
    const metricIndex = metrics.findIndex((metric) => metric.UUID === UUID);
    if (metricIndex === -1) {
      throw new NotFoundException(`Metric ${UUID} cannot be found`);
    }
    const updatedMetricMetadata: MetricMetadataEntity = {
      ...metrics[metricIndex].metadata,
      ...instanceToPlain(updateMetricRequestDTO.metadata),
    };
    const updatedMetricContent: MetricContentEntity = {
      ...metrics[metricIndex].content,
      ...updateMetricRequestDTO.content,
    };
    const updatedMetric = new MetricEntity(
      metrics[metricIndex].ID,
      UUID,
      updatedMetricMetadata,
      updatedMetricContent,
    );
    metrics[metricIndex] = updatedMetric;
    this.writeToJSON(this.filePath, metrics);
    return updatedMetric;
  }

  async deleteMetric(UUID: string): Promise<MetricEntity> {
    const metrics: MetricEntity[] = await this.readFromJSON<MetricEntity>(
      this.filePath,
    );
    const metricIndex = metrics.findIndex((metric) => metric.UUID === UUID);
    if (metricIndex === -1) {
      throw new NotFoundException(`Metric ${UUID} cannot be found`);
    }
    const deletedMetric: MetricEntity = metrics.splice(metricIndex, 1)[0];
    this.writeToJSON(this.filePath, metrics);
    return deletedMetric;
  }

  async getMetricByID(ID: string): Promise<MetricEntity> {
    const metrics: MetricEntity[] = await this.readFromJSON<MetricEntity>(
      this.filePath,
    );
    const metric: MetricEntity | undefined = metrics.find(
      (metric) => metric.ID === ID,
    );
    if (!metric) {
      throw new NotFoundException(`Metric ${ID} cannot be found`);
    }
    return metric;
  }

  async getMetricByName(name: string): Promise<MetricEntity> {
    const metrics: MetricEntity[] = await this.readFromJSON<MetricEntity>(
      this.filePath,
    );
    const metric: MetricEntity | undefined = metrics.find(
      (metric) => metric.metadata.name === name,
    );
    if (!metric) {
      throw new NotFoundException(`Metric ${name} cannot be found`);
    }
    return metric;
  }

  // Update a metric metadata by UUID
  async updateMetricMetadata(
    uuid: string,
    updatedMetadata: MetricMetadataDTO,
  ): Promise<MetricMetadataDTO> {
    this.logger.log(
      `Metric UUID: ${uuid} | Metric Metadata: ${updatedMetadata}`,
    );
    const metrics: MetricEntity[] = await this.readFromJSON<MetricEntity>(
      this.filePath,
    );
    const metricIndex = metrics.findIndex((metric) => metric.UUID === uuid);
    if (metricIndex === -1) {
      throw new NotFoundException(`Metric ${uuid} cannot be found`);
    }
    const updatedMetricMetadata: MetricMetadataEntity = {
      ...metrics[metricIndex].metadata,
      ...instanceToPlain(updatedMetadata),
    };
    const updatedMetric = new MetricEntity(
      metrics[metricIndex].ID,
      uuid,
      updatedMetricMetadata,
      metrics[metricIndex].content,
    );
    metrics[metricIndex] = updatedMetric;
    this.writeToJSON(this.filePath, metrics);
    return updatedMetric.metadata;
  }

  // Update a metric content by UUID
  async updateMetricContent(
    uuid: string,
    updatedContent: MetricContentDTO,
  ): Promise<MetricContentDTO> {
    this.logger.log(`Metric UUID: ${uuid} | Metric Content: ${updatedContent}`);
    const metrics: MetricEntity[] = await this.readFromJSON<MetricEntity>(
      this.filePath,
    );
    const metricIndex = metrics.findIndex((metric) => metric.UUID === uuid);
    if (metricIndex === -1) {
      throw new NotFoundException(`Metric ${uuid} cannot be found`);
    }
    const updatedMetricContent: MetricContentEntity = {
      ...metrics[metricIndex].content,
      ...updatedContent,
    };
    metrics[metricIndex].metadata.dates.updatedAt = new Date();
    const updatedMetric = new MetricEntity(
      metrics[metricIndex].ID,
      uuid,
      metrics[metricIndex].metadata,
      updatedMetricContent,
    );
    metrics[metricIndex] = updatedMetric;
    this.writeToJSON(this.filePath, metrics);
    return updatedMetric.content;
  }

  // Get a metric metadata by UUID
  async getMetricMetadata(uuid: string): Promise<MetricMetadataDTO> {
    this.logger.log(`Metric UUID: ${uuid}`);
    const metrics: MetricEntity[] = await this.readFromJSON<MetricEntity>(
      this.filePath,
    );
    const metricIndex = metrics.findIndex((metric) => metric.UUID === uuid);
    if (metricIndex === -1) {
      throw new NotFoundException(`Metric ${uuid} cannot be found`);
    }
    return metrics[metricIndex].metadata;
  }

  // Get a metric content by UUID
  async getMetricContent(uuid: string): Promise<MetricContentDTO> {
    this.logger.log(`Metric UUID: ${uuid}`);
    const metrics: MetricEntity[] = await this.readFromJSON<MetricEntity>(
      this.filePath,
    );
    const metricIndex = metrics.findIndex((metric) => metric.UUID === uuid);
    if (metricIndex === -1) {
      throw new NotFoundException(`Metric ${uuid} cannot be found`);
    }
    return metrics[metricIndex].content;
  }
}

class MultipleJsonStorage implements StorageStrategy {
  private readonly logger = new Logger(MultipleJsonStorage.name);
  constructor(
    private readonly dirPath: string,
    private readonly readFromJSON: <T>(filePath: string) => Promise<T>,
    private readonly writeToJSON: <T>(filePath: string, data: T) => void,
  ) {}

  async listMetricIdsAndUUIDs(): Promise<MetricIdUuidDTO[]> {
    const filesPath: string[] = glob.sync(
      `${this.dirPath}/*.${DEFAULT_FILE_STORAGE_EXTENSION}`,
    );
    const metrics: MetricEntity[] = [];
    for (const filePath of filesPath) {
      if (existsSync(filePath)) {
        const metric: MetricEntity = await this.readFromJSON<MetricEntity>(
          filePath,
        );
        if (metric) {
          metrics.push(metric);
        }
      }
    }
    return metrics.map((metric) => ({
      ID: metric.ID,
      UUID: metric.UUID,
    }));
  }

  async listMetrics(): Promise<MetricEntity[]> {
    const filesPath: string[] = glob.sync(
      `${this.dirPath}/*.${DEFAULT_FILE_STORAGE_EXTENSION}`,
    );
    const metrics: MetricEntity[] = [];
    for (const filePath of filesPath) {
      if (existsSync(filePath)) {
        const metric: MetricEntity = await this.readFromJSON<MetricEntity>(
          filePath,
        );
        if (metric) {
          metrics.push(metric);
        }
      }
    }
    return metrics;
  }

  async getMetric(UUID: string): Promise<MetricEntity> {
    const filePath = `${this.dirPath}/${UUID}.${DEFAULT_FILE_STORAGE_EXTENSION}`;
    if (existsSync(filePath)) {
      return this.readFromJSON<MetricEntity>(filePath);
    } else {
      throw new NotFoundException(`Metric ${UUID} cannot be found`);
    }
  }

  async createMetric(
    createMetricRequestDTO: CreateMetricRequestDTO,
  ): Promise<MetricEntity> {
    const newUUID: string = uuidV4();
    const newMetricMetadata: MetricMetadataEntity = plainToInstance(
      MetricMetadataEntity,
      createMetricRequestDTO.metadata,
    );
    const newMetricContent: MetricContentEntity = plainToInstance(
      MetricContentEntity,
      createMetricRequestDTO.content,
    );
    const newMetric: MetricEntity = new MetricEntity(
      createMetricRequestDTO.ID,
      newUUID,
      newMetricMetadata,
      newMetricContent,
    );
    const filePath = `${this.dirPath}/${newUUID}.${DEFAULT_FILE_STORAGE_EXTENSION}`;
    this.writeToJSON(filePath, newMetric);
    return newMetric;
  }

  async updateMetric(
    UUID: string,
    updateMetricRequestDTO: UpdateMetricRequestDTO,
  ): Promise<MetricEntity> {
    const filePath = `${this.dirPath}/${UUID}.${DEFAULT_FILE_STORAGE_EXTENSION}`;
    if (existsSync(filePath)) {
      const metric: MetricEntity = await this.readFromJSON<MetricEntity>(
        filePath,
      );
      if (!metric) {
        throw new NotFoundException(`Metric ${UUID} cannot be found`);
      }
      const updatedMetricMetadata: MetricMetadataEntity = {
        ...metric.metadata,
        ...instanceToPlain(updateMetricRequestDTO.metadata),
      };
      const updatedMetricContent: MetricContentEntity = {
        ...metric.content,
        ...updateMetricRequestDTO.content,
      };
      const updatedMetric = new MetricEntity(
        metric.ID,
        UUID,
        updatedMetricMetadata,
        updatedMetricContent,
      );
      this.writeToJSON(filePath, updatedMetric);
      return updatedMetric;
    } else {
      throw new NotFoundException(`Metric ${UUID} cannot be found`);
    }
  }

  async deleteMetric(UUID: string): Promise<MetricEntity> {
    const filePath = `${this.dirPath}/${UUID}.${DEFAULT_FILE_STORAGE_EXTENSION}`;
    this.logger.debug(filePath);
    if (existsSync(filePath)) {
      const deletedMetric: MetricEntity = await this.readFromJSON<MetricEntity>(
        filePath,
      );
      if (!deletedMetric) {
        throw new NotFoundException(`Metric ${UUID} cannot be found`);
      }
      await deleteFile(filePath);
      return deletedMetric;
    } else {
      throw new NotFoundException(`Metric ${UUID} cannot be found`);
    }
  }

  async getMetricByID(ID: string): Promise<MetricEntity> {
    const filesPath: string[] = glob.sync(
      `${this.dirPath}/*.${DEFAULT_FILE_STORAGE_EXTENSION}`,
    );
    for (const filePath of filesPath) {
      if (existsSync(filePath)) {
        const metric: MetricEntity = await this.readFromJSON<MetricEntity>(
          filePath,
        );
        if (metric.ID === ID) {
          return metric;
        }
      }
    }
    throw new NotFoundException(`Metric ${name} cannot be found`);
  }

  async getMetricByName(name: string): Promise<MetricEntity> {
    const filesPath: string[] = glob.sync(
      `${this.dirPath}/*.${DEFAULT_FILE_STORAGE_EXTENSION}`,
    );
    for (const filePath of filesPath) {
      if (existsSync(filePath)) {
        const metric = await this.readFromJSON<MetricEntity>(filePath);
        if (metric.metadata.name === name) {
          return metric;
        }
      }
    }
    throw new NotFoundException(`Metric ${name} cannot be found`);
  }

  // Update a metric metadata by UUID
  async updateMetricMetadata(
    uuid: string,
    updatedMetadata: MetricMetadataDTO,
  ): Promise<MetricMetadataDTO> {
    this.logger.log(
      `Metric UUID: ${uuid} | Metric Metadata: ${updatedMetadata}`,
    );
    const filePath = `${this.dirPath}/${uuid}.${DEFAULT_FILE_STORAGE_EXTENSION}`;
    if (existsSync(filePath)) {
      const metric: MetricEntity = await this.readFromJSON<MetricEntity>(
        filePath,
      );
      if (!metric) {
        throw new NotFoundException(`Metric ${uuid} cannot be found`);
      }
      const updatedMetricMetadata: MetricMetadataEntity = {
        ...metric.metadata,
        ...instanceToPlain(updatedMetadata),
      };
      const updatedMetric = new MetricEntity(
        metric.ID,
        uuid,
        updatedMetricMetadata,
        metric.content,
      );
      this.writeToJSON(filePath, updatedMetric);
      return updatedMetric.metadata;
    } else {
      throw new NotFoundException(`Metric ${uuid} cannot be found`);
    }
  }

  // Update a metric content by UUID
  async updateMetricContent(
    uuid: string,
    updatedContent: MetricContentDTO,
  ): Promise<MetricContentDTO> {
    this.logger.log(`Metric UUID: ${uuid} | Metric Content: ${updatedContent}`);
    const filePath = `${this.dirPath}/${uuid}.${DEFAULT_FILE_STORAGE_EXTENSION}`;
    if (existsSync(filePath)) {
      const metric: MetricEntity = await this.readFromJSON<MetricEntity>(
        filePath,
      );
      if (!metric) {
        throw new NotFoundException(`Metric ${uuid} cannot be found`);
      }
      const updatedMetricContent: MetricContentEntity = {
        ...metric.content,
        ...updatedContent,
      };
      metric.metadata.dates.updatedAt = new Date();
      const updatedMetric = new MetricEntity(
        metric.ID,
        uuid,
        metric.metadata,
        updatedMetricContent,
      );
      this.writeToJSON(filePath, updatedMetric);
      return updatedMetric.content;
    } else {
      throw new NotFoundException(`Metric ${uuid} cannot be found`);
    }
  }

  // Get a metric metadata by UUID
  async getMetricMetadata(uuid: string): Promise<MetricMetadataDTO> {
    this.logger.log(`Metric UUID: ${uuid}`);
    const filePath = `${this.dirPath}/${uuid}.${DEFAULT_FILE_STORAGE_EXTENSION}`;
    if (existsSync(filePath)) {
      const metric: MetricEntity = await this.readFromJSON<MetricEntity>(
        filePath,
      );
      if (!metric) {
        throw new NotFoundException(`Metric ${uuid} cannot be found`);
      }
      return metric.metadata;
    } else {
      throw new NotFoundException(`Metric ${uuid} cannot be found`);
    }
  }

  // Get a metric content by UUID
  async getMetricContent(uuid: string): Promise<MetricContentDTO> {
    this.logger.log(`Metric UUID: ${uuid}`);
    const filePath = `${this.dirPath}/${uuid}.${DEFAULT_FILE_STORAGE_EXTENSION}`;
    if (existsSync(filePath)) {
      const metric: MetricEntity = await this.readFromJSON<MetricEntity>(
        filePath,
      );
      if (!metric) {
        throw new NotFoundException(`Metric ${uuid} cannot be found`);
      }
      return metric.content;
    } else {
      throw new NotFoundException(`Metric ${uuid} cannot be found`);
    }
  }
}
