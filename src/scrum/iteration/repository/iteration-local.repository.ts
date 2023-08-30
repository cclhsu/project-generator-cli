import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { CreateIterationRequestDTO, IterationIdUuidStatusDTO } from '../dto';
import { UpdateIterationRequestDTO } from '../dto';
import { IterationEntity } from '../entity/iteration.entity';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { IterationMetadataEntity } from '../entity/iteration-metadata.entity';
import { IterationContentEntity } from '../entity/iteration-content.entity';
import { CommonDateEntity } from '../../../common/entity/common-date.entity';
import { existsSync, mkdirSync, readFileSync } from 'fs';
import {
  DEFAULT_DATABASE_STORAGE_DEVICE_TYPE,
  DEFAULT_FILE_STORAGE_DEVICE_TYPE,
  DEFAULT_FILE_STORAGE_EXTENSION,
  DEFAULT_STORAGE_DEVICE_TYPE,
  DEFAULT_STORAGE_FILE_TYPE,
  DEFAULT_ITERATION_FILE_PATH,
  DEFAULT_ITERATION_PATH,
  STORAGE_DEVICE_TYPES,
} from '../../../common/constant';
import { glob } from 'glob';
import { createDirectory } from '../../../utils/directory/directory.utils';
import { deleteFile } from '../../../utils/file/file.utils';
import {
  IterationMetadataDTO,
  IterationContentDTO,
  IterationIdUuidDTO,
} from '../dto';

@Injectable()
export class IterationLocalRepository {
  private readonly logger = new Logger(IterationLocalRepository.name);
  private storageStrategy: StorageStrategy;

  private iterations: IterationEntity[] = [];

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

  // Get all iteration IDs, UUIDs, and statuses
  async listIterationIdsUUIDsStatuses(): Promise<IterationIdUuidStatusDTO[]> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.listIterationIdsUUIDsStatuses();
  }

  // Get all iteration IDs and UUIDs
  async listIterationIdsAndUUIDs(): Promise<IterationIdUuidDTO[]> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.listIterationIdsAndUUIDs();
  }

  // Get all iterations
  async listIterations(): Promise<IterationEntity[]> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.listIterations();
  }

  // Get a iteration by UUID
  async getIteration(UUID: string): Promise<IterationEntity> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.getIteration(UUID);
  }

  // Create a new iteration
  async createIteration(
    createIterationRequestDTO: CreateIterationRequestDTO,
  ): Promise<IterationEntity> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.createIteration(createIterationRequestDTO);
  }

  // Update a iteration by UUID
  async updateIteration(
    UUID: string,
    updateIterationRequestDTO: UpdateIterationRequestDTO,
  ): Promise<IterationEntity> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.updateIteration(UUID, updateIterationRequestDTO);
  }

  // Delete a iteration by UUID
  async deleteIteration(UUID: string): Promise<IterationEntity> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.deleteIteration(UUID);
  }

  // Get a iteration by ID
  async getIterationByID(ID: string): Promise<IterationEntity> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.getIterationByID(ID);
  }

  // Get a iteration by name
  async getIterationByName(name: string): Promise<IterationEntity> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.getIterationByName(name);
  }

  // Update a iteration metadata by UUID
  async updateIterationMetadata(
    UUID: string,
    updatedMetadata: IterationMetadataDTO,
  ): Promise<IterationMetadataDTO> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.updateIterationMetadata(UUID, updatedMetadata);
  }

  // Update a iteration content by UUID
  async updateIterationContent(
    UUID: string,
    updatedContent: IterationContentDTO,
  ): Promise<IterationContentDTO> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.updateIterationContent(UUID, updatedContent);
  }

  // Get a iteration metadata by UUID
  async getIterationMetadata(UUID: string): Promise<IterationMetadataDTO> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.getIterationMetadata(UUID);
  }

  // Get a iteration content by UUID
  async getIterationContent(UUID: string): Promise<IterationContentDTO> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.getIterationContent(UUID);
  }

  private getStorageStrategy(): StorageStrategy {
    if (DEFAULT_STORAGE_DEVICE_TYPE === 'file') {
      if (DEFAULT_FILE_STORAGE_DEVICE_TYPE === 'json') {
        if (DEFAULT_STORAGE_FILE_TYPE === 'single') {
          return new SingleJsonStorage(
            DEFAULT_ITERATION_FILE_PATH,
            this.readArrayFromJSON,
            this.writeArrayToJSON,
          );
        } else if (DEFAULT_STORAGE_FILE_TYPE === 'multiple') {
          return new MultipleJsonStorage(
            DEFAULT_ITERATION_PATH,
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
    return String(this.iterations.length + 1);
    // return uuidv4();
  }

  async readIterationFromJSON(filePath: string): Promise<IterationEntity> {
    return this.readSingleFromJSON<IterationEntity>(filePath);
  }

  async writeIterationToJSON(
    filePath: string,
    iteration: IterationEntity,
  ): Promise<void> {
    this.writeSingleToJSON<IterationEntity>(filePath, iteration);
  }

  async readIterationFromYAML(filePath: string): Promise<IterationEntity> {
    return this.readSingleFromYAML<IterationEntity>(filePath);
  }

  async writeIterationToYAML(
    filePath: string,
    iteration: IterationEntity,
  ): Promise<void> {
    this.writeSingleToYAML<IterationEntity>(filePath, iteration);
  }

  async readIterationFromCSV(filePath: string): Promise<IterationEntity> {
    return this.readSingleFromCSV<IterationEntity>(filePath);
  }

  async writeIterationToCSV(
    filePath: string,
    iteration: IterationEntity,
  ): Promise<void> {
    this.writeSingleToCSV<IterationEntity>(filePath, iteration);
  }

  async readIterationsFromJSON(filePath: string): Promise<IterationEntity[]> {
    return this.readArrayFromJSON<IterationEntity>(filePath);
  }

  async writeIterationsToJSON(
    filePath: string,
    iterations: IterationEntity[],
  ): Promise<void> {
    this.writeArrayToJSON<IterationEntity>(filePath, iterations);
  }

  async readIterationsFromYAML(filePath: string): Promise<IterationEntity[]> {
    return this.readArrayFromYAML<IterationEntity>(filePath);
  }

  async writeIterationsToYAML(
    filePath: string,
    iterations: IterationEntity[],
  ): Promise<void> {
    this.writeArrayToYAML<IterationEntity>(filePath, iterations);
  }

  async readIterationsFromCSV(filePath: string): Promise<IterationEntity[]> {
    return this.readArrayFromCSV<IterationEntity>(filePath);
  }

  async writeIterationsToCSV(
    filePath: string,
    iterations: IterationEntity[],
  ): Promise<void> {
    this.writeArrayToCSV<IterationEntity>(filePath, iterations);
  }
}

interface StorageStrategy {
  listIterationIdsUUIDsStatuses(): Promise<IterationIdUuidStatusDTO[]>;
  listIterationIdsAndUUIDs(): Promise<IterationIdUuidDTO[]>;
  listIterations(): Promise<IterationEntity[]>;
  getIteration(UUID: string): Promise<IterationEntity>;
  createIteration(
    createIterationRequestDTO: CreateIterationRequestDTO,
  ): Promise<IterationEntity>;
  updateIteration(
    UUID: string,
    updateIterationRequestDTO: UpdateIterationRequestDTO,
  ): Promise<IterationEntity>;
  deleteIteration(UUID: string): Promise<IterationEntity>;
  getIterationByID(ID: string): Promise<IterationEntity>;
  getIterationByName(name: string): Promise<IterationEntity>;
  updateIterationMetadata(
    uuid: string,
    updatedMetadata: IterationMetadataDTO,
  ): Promise<IterationMetadataDTO>;
  updateIterationContent(
    uuid: string,
    updatedContent: IterationContentDTO,
  ): Promise<IterationContentDTO>;
  getIterationMetadata(uuid: string): Promise<IterationMetadataDTO>;
  getIterationContent(uuid: string): Promise<IterationContentDTO>;
  // searchIterations(query: string): Promise<IterationEntity[]>;
}

class MemoryStorage implements StorageStrategy {
  private readonly logger = new Logger(MemoryStorage.name);
  private iterations: IterationEntity[] = [
    // new IterationEntity(
    //    ABC-123',
    //   '00000000-0000-0000-0000-000000000001',
    //   new IterationMetadataEntity(
    //     'Iteration 1',
    //     new CommonDateEntity(
    //       new Date('2021-01-01T00:00:00.000Z'),
    //       'john.doe',
    //       new Date('2021-01-01T00:00:00.000Z'),
    //       'john.doe',
    //       new Date('2021-01-01T00:00:00.000Z'),
    //       'john.doe',
    //       new Date('2021-01-01T00:00:00.000Z'),
    //       new Date('2021-01-01T00:00:00.000Z'),
    //       new Date('2021-01-01T00:00:00.000Z'),
    //       'john.doe',
    //     ),
    //   ),
    //   new IterationContentEntity(
    //     ['john.doe', 'jane.doe'],
    //     'john.doe',
    //     'jane.doe',
    //   ),
    // ),
    // new IterationEntity(
    //   'XYZ-789',
    //   '00000000-0000-0000-0000-000000000002',
    //   new IterationMetadataEntity(
    //     'Iteration 2',
    //     new CommonDateEntity(
    //       new Date('2021-01-01T00:00:00.000Z'),
    //       'jane.doe',
    //       new Date('2021-01-01T00:00:00.000Z'),
    //       'jane.doe',
    //       new Date('2021-01-01T00:00:00.000Z'),
    //       'jane.doe',
    //       new Date('2021-01-01T00:00:00.000Z'),
    //       new Date('2021-01-01T00:00:00.000Z'),
    //       new Date('2021-01-01T00:00:00.000Z'),
    //       'jane.doe',
    //     ),
    //   ),
    //   new IterationContentEntity(
    //     ['john.doe', 'jane.doe'],
    //     'john.doe',
    //     'jane.doe',
    //   ),
    // ),
  ];

  async listIterationIdsUUIDsStatuses(): Promise<IterationIdUuidStatusDTO[]> {
    return this.iterations.map((iteration) => ({
      ID: iteration.ID,
      UUID: iteration.UUID,
      status: iteration.metadata.status,
    }));
  }

  async listIterationIdsAndUUIDs(): Promise<IterationIdUuidDTO[]> {
    return this.iterations.map((iteration) => ({
      ID: iteration.ID,
      UUID: iteration.UUID,
    }));
  }

  async listIterations(): Promise<IterationEntity[]> {
    return this.iterations;
  }

  async getIteration(UUID: string): Promise<IterationEntity> {
    const iteration: IterationEntity | undefined = this.iterations.find(
      (iteration) => iteration.UUID === UUID,
    );
    if (!iteration) {
      throw new NotFoundException(`Iteration ${UUID} cannot be found`);
    }
    return iteration;
  }

  async createIteration(
    createIterationRequestDTO: CreateIterationRequestDTO,
  ): Promise<IterationEntity> {
    const newUUID: string = uuidV4();
    const newIterationMetadata: IterationMetadataEntity = plainToInstance(
      IterationMetadataEntity,
      createIterationRequestDTO.metadata,
    );
    const newIterationContent: IterationContentEntity = plainToInstance(
      IterationContentEntity,
      createIterationRequestDTO.content,
    );
    const newIteration: IterationEntity = new IterationEntity(
      createIterationRequestDTO.ID,
      newUUID,
      newIterationMetadata,
      newIterationContent,
    );
    this.iterations.push(newIteration);
    return newIteration;
  }

  async updateIteration(
    UUID: string,
    updateIterationRequestDTO: UpdateIterationRequestDTO,
  ): Promise<IterationEntity> {
    const iterationIndex = this.iterations.findIndex(
      (iteration) => iteration.UUID === UUID,
    );
    if (iterationIndex === -1) {
      throw new NotFoundException(`Iteration ${UUID} cannot be found`);
    }
    const updatedIterationMetadata: IterationMetadataEntity = {
      ...this.iterations[iterationIndex].metadata,
      ...instanceToPlain(updateIterationRequestDTO.metadata),
    };
    const updatedIterationContent: IterationContentEntity = {
      ...this.iterations[iterationIndex].content,
      ...updateIterationRequestDTO.content,
    };
    const updatedIteration = new IterationEntity(
      this.iterations[iterationIndex].ID,
      UUID,
      updatedIterationMetadata,
      updatedIterationContent,
    );
    this.iterations[iterationIndex] = updatedIteration;
    return updatedIteration;
  }

  async deleteIteration(UUID: string): Promise<IterationEntity> {
    const iterationIndex = this.iterations.findIndex(
      (iteration) => iteration.UUID === UUID,
    );
    if (iterationIndex === -1) {
      throw new NotFoundException(`Iteration ${UUID} cannot be found`);
    }
    const deletedIteration: IterationEntity = this.iterations.splice(
      iterationIndex,
      1,
    )[0];
    return deletedIteration;
  }

  async getIterationByID(ID: string): Promise<IterationEntity> {
    const iteration: IterationEntity | undefined = this.iterations.find(
      (iteration) => iteration.ID === ID,
    );
    if (!iteration) {
      throw new NotFoundException(`Iteration ${ID} cannot be found`);
    }
    return iteration;
  }

  async getIterationByName(name: string): Promise<IterationEntity> {
    const iteration: IterationEntity | undefined = this.iterations.find(
      (iteration) => iteration.metadata.name === name,
    );
    if (!iteration) {
      throw new NotFoundException(`Iteration ${name} cannot be found`);
    }
    return iteration;
  }

  // Update a iteration metadata by UUID
  async updateIterationMetadata(
    uuid: string,
    updatedMetadata: IterationMetadataDTO,
  ): Promise<IterationMetadataDTO> {
    this.logger.log(
      `Iteration UUID: ${uuid} | Iteration Metadata: ${updatedMetadata}`,
    );
    const iterationIndex = this.iterations.findIndex(
      (iteration) => iteration.UUID === uuid,
    );
    if (iterationIndex === -1) {
      throw new NotFoundException(`Iteration ${uuid} cannot be found`);
    }
    const updatedIterationMetadata: IterationMetadataEntity = {
      ...this.iterations[iterationIndex].metadata,
      ...instanceToPlain(updatedMetadata),
    };
    const updatedIteration = new IterationEntity(
      this.iterations[iterationIndex].ID,
      uuid,
      updatedIterationMetadata,
      this.iterations[iterationIndex].content,
    );
    this.iterations[iterationIndex] = updatedIteration;
    return updatedIteration.metadata;
  }

  // Update a iteration content by UUID
  async updateIterationContent(
    uuid: string,
    updatedContent: IterationContentDTO,
  ): Promise<IterationContentDTO> {
    this.logger.log(
      `Iteration UUID: ${uuid} | Iteration Content: ${updatedContent}`,
    );
    const iterationIndex = this.iterations.findIndex(
      (iteration) => iteration.UUID === uuid,
    );
    if (iterationIndex === -1) {
      throw new NotFoundException(`Iteration ${uuid} cannot be found`);
    }
    const updatedIterationContent: IterationContentEntity = {
      ...this.iterations[iterationIndex].content,
      ...updatedContent,
    };
    this.iterations[iterationIndex].metadata.dates.updatedAt = new Date();
    const updatedIteration = new IterationEntity(
      this.iterations[iterationIndex].ID,
      uuid,
      this.iterations[iterationIndex].metadata,
      updatedIterationContent,
    );
    this.iterations[iterationIndex] = updatedIteration;
    return updatedIteration.content;
  }

  // Get a iteration metadata by UUID
  async getIterationMetadata(uuid: string): Promise<IterationMetadataDTO> {
    this.logger.log(`Iteration UUID: ${uuid}`);
    const iterationIndex = this.iterations.findIndex(
      (iteration) => iteration.UUID === uuid,
    );
    if (iterationIndex === -1) {
      throw new NotFoundException(`Iteration ${uuid} cannot be found`);
    }
    return this.iterations[iterationIndex].metadata;
  }

  // Get a iteration content by UUID
  async getIterationContent(uuid: string): Promise<IterationContentDTO> {
    this.logger.log(`Iteration UUID: ${uuid}`);
    const iterationIndex = this.iterations.findIndex(
      (iteration) => iteration.UUID === uuid,
    );
    if (iterationIndex === -1) {
      throw new NotFoundException(`Iteration ${uuid} cannot be found`);
    }
    return this.iterations[iterationIndex].content;
  }
}

class SingleJsonStorage implements StorageStrategy {
  private readonly logger = new Logger(SingleJsonStorage.name);
  constructor(
    private readonly filePath: string,
    private readonly readFromJSON: <T>(filePath: string) => Promise<T[]>,
    private readonly writeToJSON: <T>(filePath: string, data: T[]) => void,
  ) {}

  async listIterationIdsUUIDsStatuses(): Promise<IterationIdUuidStatusDTO[]> {
    const iterations: IterationEntity[] =
      await this.readFromJSON<IterationEntity>(this.filePath);
    return iterations.map((iteration) => ({
      ID: iteration.ID,
      UUID: iteration.UUID,
      status: iteration.metadata.status,
    }));
  }

  async listIterationIdsAndUUIDs(): Promise<IterationIdUuidDTO[]> {
    const iterations: IterationEntity[] =
      await this.readFromJSON<IterationEntity>(this.filePath);
    return iterations.map((iteration) => ({
      ID: iteration.ID,
      UUID: iteration.UUID,
    }));
  }

  async listIterations(): Promise<IterationEntity[]> {
    return this.readFromJSON<IterationEntity>(this.filePath);
  }

  async getIteration(UUID: string): Promise<IterationEntity> {
    const iterations: IterationEntity[] =
      await this.readFromJSON<IterationEntity>(this.filePath);
    const iteration: IterationEntity | undefined = iterations.find(
      (iteration) => iteration.UUID === UUID,
    );
    if (!iteration) {
      throw new NotFoundException(`Iteration ${UUID} cannot be found`);
    }
    return iteration;
  }

  async createIteration(
    createIterationRequestDTO: CreateIterationRequestDTO,
  ): Promise<IterationEntity> {
    const iterations: IterationEntity[] =
      await this.readFromJSON<IterationEntity>(this.filePath);
    const newUUID: string = uuidV4();
    const newIterationMetadata: IterationMetadataEntity = plainToInstance(
      IterationMetadataEntity,
      createIterationRequestDTO.metadata,
    );
    const newIterationContent: IterationContentEntity = plainToInstance(
      IterationContentEntity,
      createIterationRequestDTO.content,
    );
    const newIteration: IterationEntity = new IterationEntity(
      createIterationRequestDTO.ID,
      newUUID,
      newIterationMetadata,
      newIterationContent,
    );
    iterations.push(newIteration);
    this.writeToJSON(this.filePath, iterations);
    return newIteration;
  }

  async updateIteration(
    UUID: string,
    updateIterationRequestDTO: UpdateIterationRequestDTO,
  ): Promise<IterationEntity> {
    const iterations: IterationEntity[] =
      await this.readFromJSON<IterationEntity>(this.filePath);
    const iterationIndex = iterations.findIndex(
      (iteration) => iteration.UUID === UUID,
    );
    if (iterationIndex === -1) {
      throw new NotFoundException(`Iteration ${UUID} cannot be found`);
    }
    const updatedIterationMetadata: IterationMetadataEntity = {
      ...iterations[iterationIndex].metadata,
      ...instanceToPlain(updateIterationRequestDTO.metadata),
    };
    const updatedIterationContent: IterationContentEntity = {
      ...iterations[iterationIndex].content,
      ...updateIterationRequestDTO.content,
    };
    const updatedIteration = new IterationEntity(
      iterations[iterationIndex].ID,
      UUID,
      updatedIterationMetadata,
      updatedIterationContent,
    );
    iterations[iterationIndex] = updatedIteration;
    this.writeToJSON(this.filePath, iterations);
    return updatedIteration;
  }

  async deleteIteration(UUID: string): Promise<IterationEntity> {
    const iterations: IterationEntity[] =
      await this.readFromJSON<IterationEntity>(this.filePath);
    const iterationIndex = iterations.findIndex(
      (iteration) => iteration.UUID === UUID,
    );
    if (iterationIndex === -1) {
      throw new NotFoundException(`Iteration ${UUID} cannot be found`);
    }
    const deletedIteration: IterationEntity = iterations.splice(
      iterationIndex,
      1,
    )[0];
    this.writeToJSON(this.filePath, iterations);
    return deletedIteration;
  }

  async getIterationByID(ID: string): Promise<IterationEntity> {
    const iterations: IterationEntity[] =
      await this.readFromJSON<IterationEntity>(this.filePath);
    const iteration: IterationEntity | undefined = iterations.find(
      (iteration) => iteration.ID === ID,
    );
    if (!iteration) {
      throw new NotFoundException(`Iteration ${ID} cannot be found`);
    }
    return iteration;
  }

  async getIterationByName(name: string): Promise<IterationEntity> {
    const iterations: IterationEntity[] =
      await this.readFromJSON<IterationEntity>(this.filePath);
    const iteration: IterationEntity | undefined = iterations.find(
      (iteration) => iteration.metadata.name === name,
    );
    if (!iteration) {
      throw new NotFoundException(`Iteration ${name} cannot be found`);
    }
    return iteration;
  }

  // Update a iteration metadata by UUID
  async updateIterationMetadata(
    uuid: string,
    updatedMetadata: IterationMetadataDTO,
  ): Promise<IterationMetadataDTO> {
    this.logger.log(
      `Iteration UUID: ${uuid} | Iteration Metadata: ${updatedMetadata}`,
    );
    const iterations: IterationEntity[] =
      await this.readFromJSON<IterationEntity>(this.filePath);
    const iterationIndex = iterations.findIndex(
      (iteration) => iteration.UUID === uuid,
    );
    if (iterationIndex === -1) {
      throw new NotFoundException(`Iteration ${uuid} cannot be found`);
    }
    const updatedIterationMetadata: IterationMetadataEntity = {
      ...iterations[iterationIndex].metadata,
      ...instanceToPlain(updatedMetadata),
    };
    const updatedIteration = new IterationEntity(
      iterations[iterationIndex].ID,
      uuid,
      updatedIterationMetadata,
      iterations[iterationIndex].content,
    );
    iterations[iterationIndex] = updatedIteration;
    this.writeToJSON(this.filePath, iterations);
    return updatedIteration.metadata;
  }

  // Update a iteration content by UUID
  async updateIterationContent(
    uuid: string,
    updatedContent: IterationContentDTO,
  ): Promise<IterationContentDTO> {
    this.logger.log(
      `Iteration UUID: ${uuid} | Iteration Content: ${updatedContent}`,
    );
    const iterations: IterationEntity[] =
      await this.readFromJSON<IterationEntity>(this.filePath);
    const iterationIndex = iterations.findIndex(
      (iteration) => iteration.UUID === uuid,
    );
    if (iterationIndex === -1) {
      throw new NotFoundException(`Iteration ${uuid} cannot be found`);
    }
    const updatedIterationContent: IterationContentEntity = {
      ...iterations[iterationIndex].content,
      ...updatedContent,
    };
    iterations[iterationIndex].metadata.dates.updatedAt = new Date();
    const updatedIteration = new IterationEntity(
      iterations[iterationIndex].ID,
      uuid,
      iterations[iterationIndex].metadata,
      updatedIterationContent,
    );
    iterations[iterationIndex] = updatedIteration;
    this.writeToJSON(this.filePath, iterations);
    return updatedIteration.content;
  }

  // Get a iteration metadata by UUID
  async getIterationMetadata(uuid: string): Promise<IterationMetadataDTO> {
    this.logger.log(`Iteration UUID: ${uuid}`);
    const iterations: IterationEntity[] =
      await this.readFromJSON<IterationEntity>(this.filePath);
    const iterationIndex = iterations.findIndex(
      (iteration) => iteration.UUID === uuid,
    );
    if (iterationIndex === -1) {
      throw new NotFoundException(`Iteration ${uuid} cannot be found`);
    }
    return iterations[iterationIndex].metadata;
  }

  // Get a iteration content by UUID
  async getIterationContent(uuid: string): Promise<IterationContentDTO> {
    this.logger.log(`Iteration UUID: ${uuid}`);
    const iterations: IterationEntity[] =
      await this.readFromJSON<IterationEntity>(this.filePath);
    const iterationIndex = iterations.findIndex(
      (iteration) => iteration.UUID === uuid,
    );
    if (iterationIndex === -1) {
      throw new NotFoundException(`Iteration ${uuid} cannot be found`);
    }
    return iterations[iterationIndex].content;
  }
}

class MultipleJsonStorage implements StorageStrategy {
  private readonly logger = new Logger(MultipleJsonStorage.name);
  constructor(
    private readonly dirPath: string,
    private readonly readFromJSON: <T>(filePath: string) => Promise<T>,
    private readonly writeToJSON: <T>(filePath: string, data: T) => void,
  ) {}

  async listIterationIdsUUIDsStatuses(): Promise<IterationIdUuidStatusDTO[]> {
    const filesPath: string[] = glob.sync(
      `${this.dirPath}/*.${DEFAULT_FILE_STORAGE_EXTENSION}`,
    );
    const iterations: IterationEntity[] = [];
    for (const filePath of filesPath) {
      if (existsSync(filePath)) {
        const iteration: IterationEntity =
          await this.readFromJSON<IterationEntity>(filePath);
        if (iteration) {
          iterations.push(iteration);
        }
      }
    }
    return iterations.map((iteration) => ({
      ID: iteration.ID,
      UUID: iteration.UUID,
      status: iteration.metadata.status,
    }));
  }

  async listIterationIdsAndUUIDs(): Promise<IterationIdUuidDTO[]> {
    const filesPath: string[] = glob.sync(
      `${this.dirPath}/*.${DEFAULT_FILE_STORAGE_EXTENSION}`,
    );
    const iterations: IterationEntity[] = [];
    for (const filePath of filesPath) {
      if (existsSync(filePath)) {
        const iteration: IterationEntity =
          await this.readFromJSON<IterationEntity>(filePath);
        if (iteration) {
          iterations.push(iteration);
        }
      }
    }
    return iterations.map((iteration) => ({
      ID: iteration.ID,
      UUID: iteration.UUID,
    }));
  }

  async listIterations(): Promise<IterationEntity[]> {
    const filesPath: string[] = glob.sync(
      `${this.dirPath}/*.${DEFAULT_FILE_STORAGE_EXTENSION}`,
    );
    const iterations: IterationEntity[] = [];
    for (const filePath of filesPath) {
      if (existsSync(filePath)) {
        const iteration: IterationEntity =
          await this.readFromJSON<IterationEntity>(filePath);
        if (iteration) {
          iterations.push(iteration);
        }
      }
    }
    return iterations;
  }

  async getIteration(UUID: string): Promise<IterationEntity> {
    const filePath = `${this.dirPath}/${UUID}.${DEFAULT_FILE_STORAGE_EXTENSION}`;
    if (existsSync(filePath)) {
      return this.readFromJSON<IterationEntity>(filePath);
    } else {
      throw new NotFoundException(`Iteration ${UUID} cannot be found`);
    }
  }

  async createIteration(
    createIterationRequestDTO: CreateIterationRequestDTO,
  ): Promise<IterationEntity> {
    const newUUID: string = uuidV4();
    const newIterationMetadata: IterationMetadataEntity = plainToInstance(
      IterationMetadataEntity,
      createIterationRequestDTO.metadata,
    );
    const newIterationContent: IterationContentEntity = plainToInstance(
      IterationContentEntity,
      createIterationRequestDTO.content,
    );
    const newIteration: IterationEntity = new IterationEntity(
      createIterationRequestDTO.ID,
      newUUID,
      newIterationMetadata,
      newIterationContent,
    );
    const filePath = `${this.dirPath}/${newUUID}.${DEFAULT_FILE_STORAGE_EXTENSION}`;
    this.writeToJSON(filePath, newIteration);
    return newIteration;
  }

  async updateIteration(
    UUID: string,
    updateIterationRequestDTO: UpdateIterationRequestDTO,
  ): Promise<IterationEntity> {
    const filePath = `${this.dirPath}/${UUID}.${DEFAULT_FILE_STORAGE_EXTENSION}`;
    if (existsSync(filePath)) {
      const iteration: IterationEntity =
        await this.readFromJSON<IterationEntity>(filePath);
      if (!iteration) {
        throw new NotFoundException(`Iteration ${UUID} cannot be found`);
      }
      const updatedIterationMetadata: IterationMetadataEntity = {
        ...iteration.metadata,
        ...instanceToPlain(updateIterationRequestDTO.metadata),
      };
      const updatedIterationContent: IterationContentEntity = {
        ...iteration.content,
        ...updateIterationRequestDTO.content,
      };
      const updatedIteration = new IterationEntity(
        iteration.ID,
        UUID,
        updatedIterationMetadata,
        updatedIterationContent,
      );
      this.writeToJSON(filePath, updatedIteration);
      return updatedIteration;
    } else {
      throw new NotFoundException(`Iteration ${UUID} cannot be found`);
    }
  }

  async deleteIteration(UUID: string): Promise<IterationEntity> {
    const filePath = `${this.dirPath}/${UUID}.${DEFAULT_FILE_STORAGE_EXTENSION}`;
    this.logger.debug(filePath);
    if (existsSync(filePath)) {
      const deletedIteration: IterationEntity =
        await this.readFromJSON<IterationEntity>(filePath);
      if (!deletedIteration) {
        throw new NotFoundException(`Iteration ${UUID} cannot be found`);
      }
      await deleteFile(filePath);
      return deletedIteration;
    } else {
      throw new NotFoundException(`Iteration ${UUID} cannot be found`);
    }
  }

  async getIterationByID(ID: string): Promise<IterationEntity> {
    const filesPath: string[] = glob.sync(
      `${this.dirPath}/*.${DEFAULT_FILE_STORAGE_EXTENSION}`,
    );
    for (const filePath of filesPath) {
      if (existsSync(filePath)) {
        const iteration: IterationEntity =
          await this.readFromJSON<IterationEntity>(filePath);
        if (iteration.ID === ID) {
          return iteration;
        }
      }
    }
    throw new NotFoundException(`Iteration ${ID} cannot be found`);
  }

  async getIterationByName(name: string): Promise<IterationEntity> {
    const filesPath: string[] = glob.sync(
      `${this.dirPath}/*.${DEFAULT_FILE_STORAGE_EXTENSION}`,
    );
    for (const filePath of filesPath) {
      if (existsSync(filePath)) {
        const iteration: IterationEntity =
          await this.readFromJSON<IterationEntity>(filePath);
        if (iteration.metadata.name === name) {
          return iteration;
        }
      }
    }
    throw new NotFoundException(`Iteration ${name} cannot be found`);
  }

  // Update a iteration metadata by UUID
  async updateIterationMetadata(
    uuid: string,
    updatedMetadata: IterationMetadataDTO,
  ): Promise<IterationMetadataDTO> {
    this.logger.log(
      `Iteration UUID: ${uuid} | Iteration Metadata: ${updatedMetadata}`,
    );
    const filePath = `${this.dirPath}/${uuid}.${DEFAULT_FILE_STORAGE_EXTENSION}`;
    if (existsSync(filePath)) {
      const iteration: IterationEntity =
        await this.readFromJSON<IterationEntity>(filePath);
      if (!iteration) {
        throw new NotFoundException(`Iteration ${uuid} cannot be found`);
      }
      const updatedIterationMetadata: IterationMetadataEntity = {
        ...iteration.metadata,
        ...instanceToPlain(updatedMetadata),
      };
      const updatedIteration = new IterationEntity(
        iteration.ID,
        uuid,
        updatedIterationMetadata,
        iteration.content,
      );
      this.writeToJSON(filePath, updatedIteration);
      return updatedIteration.metadata;
    } else {
      throw new NotFoundException(`Iteration ${uuid} cannot be found`);
    }
  }

  // Update a iteration content by UUID
  async updateIterationContent(
    uuid: string,
    updatedContent: IterationContentDTO,
  ): Promise<IterationContentDTO> {
    this.logger.log(
      `Iteration UUID: ${uuid} | Iteration Content: ${updatedContent}`,
    );
    const filePath = `${this.dirPath}/${uuid}.${DEFAULT_FILE_STORAGE_EXTENSION}`;
    if (existsSync(filePath)) {
      const iteration: IterationEntity =
        await this.readFromJSON<IterationEntity>(filePath);
      if (!iteration) {
        throw new NotFoundException(`Iteration ${uuid} cannot be found`);
      }
      const updatedIterationContent: IterationContentEntity = {
        ...iteration.content,
        ...updatedContent,
      };
      iteration.metadata.dates.updatedAt = new Date();
      const updatedIteration = new IterationEntity(
        iteration.ID,
        uuid,
        iteration.metadata,
        updatedIterationContent,
      );
      this.writeToJSON(filePath, updatedIteration);
      return updatedIteration.content;
    } else {
      throw new NotFoundException(`Iteration ${uuid} cannot be found`);
    }
  }

  // Get a iteration metadata by UUID
  async getIterationMetadata(uuid: string): Promise<IterationMetadataDTO> {
    this.logger.log(`Iteration UUID: ${uuid}`);
    const filePath = `${this.dirPath}/${uuid}.${DEFAULT_FILE_STORAGE_EXTENSION}`;
    if (existsSync(filePath)) {
      const iteration: IterationEntity =
        await this.readFromJSON<IterationEntity>(filePath);
      if (!iteration) {
        throw new NotFoundException(`Iteration ${uuid} cannot be found`);
      }
      return iteration.metadata;
    } else {
      throw new NotFoundException(`Iteration ${uuid} cannot be found`);
    }
  }

  // Get a iteration content by UUID
  async getIterationContent(uuid: string): Promise<IterationContentDTO> {
    this.logger.log(`Iteration UUID: ${uuid}`);
    const filePath = `${this.dirPath}/${uuid}.${DEFAULT_FILE_STORAGE_EXTENSION}`;
    if (existsSync(filePath)) {
      const iteration: IterationEntity =
        await this.readFromJSON<IterationEntity>(filePath);
      if (!iteration) {
        throw new NotFoundException(`Iteration ${uuid} cannot be found`);
      }
      return iteration.content;
    } else {
      throw new NotFoundException(`Iteration ${uuid} cannot be found`);
    }
  }
}
