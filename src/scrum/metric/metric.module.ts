import { Module } from '@nestjs/common';
// import { MetricController } from './metric.controller';
import { ConfigModule } from '../../config/config.module';
import { CommonCommandModule } from '../../common/command/common-command.module';
import { MetricService } from './metric.service';
import { MetricLocalRepository as MetricRepository } from './repository/metric-local.repository';
// import { MetricPrismaRepository as MetricRepository } from './metric/repositories/metric-prisma.repository';
import { CsvModule } from '../../utils/csv/csv.module';
import { JsonModule } from '../../utils/json/json.module';
import { YamlModule } from '../../utils/yaml/yaml.module';
import { MarkdownModule } from '../../utils/markdown/markdown.module';
import {
  MetricCommand,
  ListMetricsCommand,
  GetMetricCommand,
  CreateMetricCommand,
  UpdateMetricCommand,
  DeleteMetricCommand,
  UpdateMetricMetadataCommand,
  UpdateMetricContentCommand,
  ListMetricIdsAndUUIDsCommand,
} from './command';

@Module({
  imports: [ConfigModule, JsonModule, CsvModule, YamlModule, MarkdownModule],
  // controllers: [
  //   MetricController,
  // ],
  providers: [
    CommonCommandModule,
    MetricRepository,
    MetricService,
    MetricCommand,
    ListMetricsCommand,
    GetMetricCommand,
    CreateMetricCommand,
    UpdateMetricCommand,
    DeleteMetricCommand,
    UpdateMetricMetadataCommand,
    UpdateMetricContentCommand,
    ListMetricIdsAndUUIDsCommand,
  ],
  exports: [MetricService],
})
export class MetricModule {}
