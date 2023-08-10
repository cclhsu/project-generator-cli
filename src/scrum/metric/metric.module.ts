import { Module } from '@nestjs/common';
// import { MetricController } from './metric.controller';
import { ConfigModule } from 'src/config/config.module';
import { CommonCommandModule } from '../common/command/common-command.module';
import { MetricService } from './metric.service';
import { MetricLocalRepository as MetricRepository } from './repository/metric-local.repository';
// import { UserPrismaRepository as UserRepository } from './user/repositories/user-prisma.repository';
import { MetricCommand } from './command/metric.command';
import { CreateMetricCommand } from './command/create-metric.command';
import { DeleteMetricCommand } from './command/delete-metric.command';
import { GetMetricCommand } from './command/get-metric.command';
import { ListMetricsCommand } from './command/list-metrics.command';
import { UpdateMetricCommand } from './command/update-metric.command';
import { CsvModule } from 'src/utils/csv/csv.module';
import { JsonModule } from 'src/utils/json/json.module';
import { YamlModule } from 'src/utils/yaml/yaml.module';
import { MarkdownModule } from 'src/utils/markdown/markdown.module';

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
  ],
  exports: [MetricService],
})
export class MetricModule {}
