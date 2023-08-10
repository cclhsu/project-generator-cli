import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateMetricRequestDTO } from './dto/create-metric-request.dto';
import { UpdateMetricRequestDTO } from './dto/update-metric-request.dto';
import { MetricResponseDTO } from './dto/metric-response.dto';
import { MetricEntity } from './entity/metric.entity';
import { MetricLocalRepository as MetricRepository } from './repository/metric-local.repository';
import { MetricMetadataDTO } from './dto/metric-metadata.dto';
import { MetricContentDTO } from './dto/metric-content.dto';
// import { MetricPrismaRepository as MetricRepository } from './repositories/metric-prisma.repository';

@Injectable()
export class MetricService {
  private readonly logger = new Logger(MetricService.name);

  constructor(private readonly metricRepository: MetricRepository) {}

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
    const name: string = createMetricRequestDTO.metadata.name;

    try {
      // Check if metric already exists
      const metricExists = await this.getMetricByName(name);
      if (metricExists) {
        throw new Error('Metric already exists');
      }
    } catch (NotFoundException) {}

    // Create the metric
    const metric = await this.metricRepository.createMetric(createMetricRequestDTO);
    this.logger.log(`Metric: ${JSON.stringify(metric, null, 2)}`);
    return this.convertToMetricResponse(metric);
  }

  async updateMetric(
    uuid: string,
    updateMetricRequestDTO: MetricResponseDTO,
  ): Promise<MetricResponseDTO> {
    // Check if metric exists
    const metric = await this.getMetric(uuid);
    if (!metric) {
      throw new NotFoundException('Metric not found');
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

  async getMetricByName(name: string): Promise<MetricResponseDTO> {
    const metric = await this.metricRepository.getMetricByName(name);
    if (!metric) {
      throw new NotFoundException('Metric not found');
    }
    this.logger.log(`Metric: ${JSON.stringify(metric, null, 2)}`);
    return this.convertToMetricResponse(metric);
  }

  // Other methods...

  convertToMetricResponse(metric: MetricEntity): MetricResponseDTO {
    const metricMetadata: MetricMetadataDTO = new MetricMetadataDTO(
      metric.metadata.ID,
      metric.metadata.name,
      metric.metadata.dates,
    );
    const metricContent: MetricContentDTO = new MetricContentDTO();
    const metricResponse: MetricResponseDTO = new MetricResponseDTO(
      metric.UUID,
      metricMetadata,
      metricContent,
    );
    return metricResponse;
  }

  convertToMetricResponseList(metrics: MetricEntity[]): MetricResponseDTO[] {
    const metricResponseList: MetricResponseDTO[] = metrics.map((metric) => {
      const metricMetadata: MetricMetadataDTO = new MetricMetadataDTO(
        metric.metadata.ID,
        metric.metadata.name,
        metric.metadata.dates,
      );
      const metricContent: MetricContentDTO = new MetricContentDTO();
      const metricResponse: MetricResponseDTO = new MetricResponseDTO(
        metric.UUID,
        metricMetadata,
        metricContent,
      );
      return metricResponse;
    });

    return metricResponseList;
  }
}
