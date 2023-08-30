import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateMetricRequestDTO } from './dto/create-metric-request.dto';
import { UpdateMetricRequestDTO } from './dto/update-metric-request.dto';
import { MetricResponseDTO } from './dto/metric-response.dto';
import { MetricEntity } from './entity/metric.entity';
import { MetricLocalRepository as MetricRepository } from './repository/metric-local.repository';
import { MetricMetadataDTO } from './dto/metric-metadata.dto';
import { MetricContentDTO } from './dto/metric-content.dto';
import {
  UpdateMetricContentRequestDTO,
  UpdateMetricMetadataRequestDTO,
  MetricContentResponseDTO,
  MetricMetadataResponseDTO,
  MetricIdUuidDTO,
} from './dto';
import { validate } from 'class-validator';
import { validateDtoMetadataContent } from '../../utils/validation/validation.utils';
import { CommonDateDTO } from '../../common/dto';
import { updateCommonDates } from '../../common/command/utils';

@Injectable()
export class MetricService {
  private readonly logger = new Logger(MetricService.name);

  constructor(private readonly metricRepository: MetricRepository) {}

  async listMetricIdsAndUUIDs(): Promise<MetricIdUuidDTO[]> {
    return this.metricRepository.listMetricIdsAndUUIDs();
  }

  async listMetrics(): Promise<MetricResponseDTO[]> {
    const metrics = await this.metricRepository.listMetrics();
    this.logger.log(`Metrics: ${JSON.stringify(metrics, null, 2)}`);
    return this.convertToMetricResponseList(metrics);
  }

  async getMetric(uuid: string): Promise<MetricResponseDTO> {
    const metric = await this.metricRepository.getMetric(uuid);
    if (!metric) {
      throw new NotFoundException('Metric not found');
    }
    this.logger.log(`Metric: ${JSON.stringify(metric, null, 2)}`);
    return this.convertToMetricResponse(metric);
  }

  async createMetric(
    createMetricRequestDTO: CreateMetricRequestDTO,
  ): Promise<MetricResponseDTO> {
    const {
      ID,
      UUID,
      metadata: { name },
    } = createMetricRequestDTO;

    if (await this.isMetricExist(name, ID, UUID)) {
      throw new Error('Metric with the same name, ID, or UUID already exists');
    }

    const error = await validateDtoMetadataContent<CreateMetricRequestDTO>(
      createMetricRequestDTO,
    );
    if (error) {
      throw new Error(error);
    }

    // Create the metric
    const metric = await this.metricRepository.createMetric(
      createMetricRequestDTO,
    );
    this.logger.log(`Metric: ${JSON.stringify(metric, null, 2)}`);
    return this.convertToMetricResponse(metric);
  }

  async updateMetric(
    uuid: string,
    updateMetricRequestDTO: UpdateMetricRequestDTO,
  ): Promise<MetricResponseDTO> {
    // Check if metric exists
    const metric = await this.getMetric(uuid);
    if (!metric) {
      throw new NotFoundException('Metric not found');
    }

    const dates: CommonDateDTO = updateCommonDates(
      metric.metadata.dates,
      updateMetricRequestDTO.metadata.dates,
    );
    updateMetricRequestDTO.metadata.dates = dates;

    const error = await validateDtoMetadataContent<UpdateMetricRequestDTO>(
      updateMetricRequestDTO,
    );
    if (error) {
      throw new Error(error);
    }

    // Update the metric
    const updatedMetric = await this.metricRepository.updateMetric(
      uuid,
      updateMetricRequestDTO,
    );

    if (!updatedMetric) {
      throw new Error('Failed to update metric');
    }

    this.logger.log(`Metric: ${JSON.stringify(updatedMetric, null, 2)}`);
    return this.convertToMetricResponse(updatedMetric);
  }

  async deleteMetric(uuid: string): Promise<MetricResponseDTO> {
    // Check if metric exists
    const metric = await this.getMetric(uuid);
    if (!metric) {
      throw new NotFoundException('Metric not found');
    }

    // Delete the metric
    const deleteMetric = await this.metricRepository.deleteMetric(uuid);
    if (!deleteMetric) {
      throw new Error('Failed to delete metric');
    }

    this.logger.log(`Metric: ${JSON.stringify(deleteMetric, null, 2)}`);
    return this.convertToMetricResponse(deleteMetric);
  }

  async getMetricByID(ID: string): Promise<MetricResponseDTO> {
    const metric = await this.metricRepository.getMetricByID(ID);
    if (!metric) {
      throw new NotFoundException('Metric not found');
    }
    this.logger.log(`Metric: ${JSON.stringify(metric, null, 2)}`);
    return this.convertToMetricResponse(metric);
  }

  async getMetricByName(name: string): Promise<MetricResponseDTO> {
    const metric = await this.metricRepository.getMetricByName(name);
    if (!metric) {
      throw new NotFoundException('Metric not found');
    }
    this.logger.log(`Metric: ${JSON.stringify(metric, null, 2)}`);
    return this.convertToMetricResponse(metric);
  }

  async listMetricsWithMetadata(): Promise<MetricMetadataResponseDTO[]> {
    const metrics = await this.metricRepository.listMetrics();
    return metrics.map((metric) =>
      this.convertToMetricMetadataResponse(metric),
    );
  }

  async updateMetricMetadata(
    uuid: string,
    updateMetricMetadataRequestDTO: UpdateMetricMetadataRequestDTO,
  ): Promise<MetricMetadataResponseDTO> {
    // Check if metric exists
    const metric = await this.getMetric(uuid);
    if (!metric) {
      throw new NotFoundException('Metric not found');
    }

    const dates: CommonDateDTO = updateCommonDates(
      metric.metadata.dates,
      updateMetricMetadataRequestDTO.metadata.dates,
    );
    updateMetricMetadataRequestDTO.metadata.dates = dates;

    // Update the metric
    const updatedMetricMetadata: MetricMetadataDTO =
      await this.metricRepository.updateMetricMetadata(
        uuid,
        updateMetricMetadataRequestDTO.metadata,
      );

    if (!updatedMetricMetadata) {
      throw new Error('Failed to update metric');
    }

    this.logger.log(
      `Metric: ${JSON.stringify(updatedMetricMetadata, null, 2)}`,
    );
    return new MetricMetadataResponseDTO(
      metric.ID,
      uuid,
      updatedMetricMetadata,
    );
  }

  async updateMetricContent(
    uuid: string,
    updateMetricContentRequestDTO: UpdateMetricContentRequestDTO,
  ): Promise<MetricContentResponseDTO> {
    // Check if metric exists
    const metric = await this.getMetric(uuid);
    if (!metric) {
      throw new NotFoundException('Metric not found');
    }

    // // Update the dates values UpdatedAt and UpdatedBy
    // const dates: CommonDateDTO = updateCommonDates(
    //   metric.metadata.dates,
    //   updateMetricContentRequestDTO.metadata.dates,
    //   true,
    // );
    // updateMetricContentRequestDTO.metadata.dates = dates;

    // Update the metric
    const updatedMetricContent: MetricContentDTO =
      await this.metricRepository.updateMetricContent(
        uuid,
        updateMetricContentRequestDTO.content,
      );

    if (!updatedMetricContent) {
      throw new Error('Failed to update metric');
    }

    this.logger.log(`Metric: ${JSON.stringify(updatedMetricContent, null, 2)}`);
    return new MetricContentResponseDTO(metric.ID, uuid, updatedMetricContent);
  }

  async getMetricMetadata(uuid: string): Promise<MetricMetadataResponseDTO> {
    const metric = await this.metricRepository.getMetric(uuid);
    if (!metric) {
      throw new NotFoundException('Metric not found');
    }
    this.logger.log(`Metric: ${JSON.stringify(metric, null, 2)}`);
    return new MetricMetadataResponseDTO(metric.ID, uuid, metric.metadata);
  }

  async getMetricContent(uuid: string): Promise<MetricContentResponseDTO> {
    const metric = await this.metricRepository.getMetric(uuid);
    if (!metric) {
      throw new NotFoundException('Metric not found');
    }
    this.logger.log(`Metric: ${JSON.stringify(metric, null, 2)}`);
    return new MetricContentResponseDTO(metric.ID, uuid, metric.content);
  }

  // Other methods...

  async isMetricExist(
    name: string,
    ID: string,
    UUID: string,
  ): Promise<boolean> {
    try {
      const metricByName = await this.metricRepository.getMetricByName(name);
      if (metricByName) {
        return true;
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.verbose(`Metric not found by name: ${name}`);
      } else {
        this.logger.error(error);
      }
    }

    try {
      const metricByID = await this.metricRepository.getMetricByID(ID);
      if (metricByID) {
        return true;
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.verbose(`Metric not found by ID: ${ID}`);
      } else {
        this.logger.error(error);
      }
    }

    try {
      const metricByUUID = await this.metricRepository.getMetric(UUID);
      if (metricByUUID) {
        return true;
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.verbose(`Metric not found by UUID: ${UUID}`);
      } else {
        this.logger.error(error);
      }
    }
    return false;
  }

  async isNoMetricsExist(): Promise<boolean> {
    const metrics = await this.metricRepository.listMetrics();
    return metrics.length === 0;
  }

  async isExactlyOneMetricExist(): Promise<boolean> {
    const metrics = await this.metricRepository.listMetrics();
    return metrics.length === 1;
  }

  async isAtLeastOneMetricExist(): Promise<boolean> {
    const metrics = await this.metricRepository.listMetrics();
    return metrics.length >= 1;
  }

  convertToMetricResponse(metric: MetricEntity): MetricResponseDTO {
    this.logger.verbose(
      `Converting Metric: ${JSON.stringify(metric, null, 2)}`,
    );
    const metricMetadata: MetricMetadataDTO = new MetricMetadataDTO(
      metric.metadata.name,
      metric.metadata.dates,
    );
    const metricContent: MetricContentDTO = new MetricContentDTO();
    const metricResponse: MetricResponseDTO = new MetricResponseDTO(
      metric.ID,
      metric.UUID,
      metricMetadata,
      metricContent,
    );
    return metricResponse;
  }

  convertToMetricResponseList(metrics: MetricEntity[]): MetricResponseDTO[] {
    this.logger.verbose(
      `Converting Metrics: ${JSON.stringify(metrics, null, 2)}`,
    );
    const metricResponseList: MetricResponseDTO[] = metrics.map((metric) => {
      const metricMetadata: MetricMetadataDTO = new MetricMetadataDTO(
        metric.metadata.name,
        metric.metadata.dates,
      );
      const metricContent: MetricContentDTO = new MetricContentDTO();
      const metricResponse: MetricResponseDTO = new MetricResponseDTO(
        metric.ID,
        metric.UUID,
        metricMetadata,
        metricContent,
      );
      return metricResponse;
    });

    return metricResponseList;
  }

  private convertToMetricMetadataResponse(
    metric: MetricEntity,
  ): MetricMetadataResponseDTO {
    const metricMetadata: MetricMetadataDTO = new MetricMetadataDTO(
      metric.metadata.name,
      metric.metadata.dates,
    );
    return new MetricMetadataResponseDTO(
      metric.ID,
      metric.UUID,
      metricMetadata,
    );
  }
}
