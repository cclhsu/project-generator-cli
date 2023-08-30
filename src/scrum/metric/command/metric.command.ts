import { Command, CommandRunner, InquirerService } from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '../../../config/config.service';
import { MetricService } from '../metric.service';
import { ListMetricsCommand } from './list-metrics.command';
import { GetMetricCommand } from './get-metric.command';
import { CreateMetricCommand } from './create-metric.command';
import { UpdateMetricCommand } from './update-metric.command';
import { DeleteMetricCommand } from './delete-metric.command';
import { UpdateMetricMetadataCommand } from './update-metric-metadata.command';
import { UpdateMetricContentCommand } from './update-metric-content.command';
import { ListMetricIdsAndUUIDsCommand } from './list-metric-ids-uuids.command';

@Injectable()
@Command({
  name: 'metric',
  description: 'A set of commands for managing metric',
  arguments: '<action> [options]',
  subCommands: [
    ListMetricsCommand,
    GetMetricCommand,
    CreateMetricCommand,
    UpdateMetricCommand,
    DeleteMetricCommand,
    UpdateMetricMetadataCommand,
    UpdateMetricContentCommand,
    ListMetricIdsAndUUIDsCommand,
  ],
})
export class MetricCommand extends CommandRunner {
  private readonly logger = new Logger(MetricCommand.name);
  constructor(
    private readonly inquirer: InquirerService,
    private readonly configService: ConfigService,
    private readonly metricService: MetricService,
  ) {
    super();
  }

  async run(
    passedParams: string[],
    options?: Record<string, any> | undefined,
  ): Promise<void> {
    // throw new Error('Method not implemented.');
    this.logger.debug('>>> Running metric command');
  }
}

// npm run build
// nestjs build
// node ./dist/cmd.main metric --help
// node ./dist/cmd.main metric

// node ./dist/cmd.main metric -s src -g github -l metric -t library -e metric -u user -n metric -m module
