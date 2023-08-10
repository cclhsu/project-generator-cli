import { MetricResponseDTO } from './metric-response.dto';

export class ListMetricResponseDTO {
  constructor(metrics: MetricResponseDTO[]) {
    this.metrics = metrics;
  }
  metrics: MetricResponseDTO[];
}
