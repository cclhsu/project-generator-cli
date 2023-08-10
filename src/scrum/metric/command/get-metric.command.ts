import {
  CommandRunner,
  InquirerService,
  Option,
  SubCommand,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { MetricService } from '../metric.service';
import { MetricCommandOptionsDTO } from './dto/metric-command-options.dto';
import { GetMetricCommandOptionsDTO } from './dto/get-metric-command-options.dto';
import { UuidAnswerDTO } from '../../common/command/dto/uuid-answer.dto';

@Injectable()
@SubCommand({
  name: 'get',
  description: 'A command to get a metric',
})
export class GetMetricCommand extends CommandRunner {
  private readonly logger = new Logger(GetMetricCommand.name);
  constructor(
    private readonly inquirer: InquirerService,
    private readonly metricService: MetricService,
  ) {
    super();
  }

  async run(
    passedParams: string[],
    options?: Record<string, any> | undefined,
  ): Promise<void> {
    this.logger.debug('>>> Getting metric');
    // this.logger.debug(passedParams);
    // this.logger.debug(options);

    const metricCommandOptions: GetMetricCommandOptionsDTO = {
      UUID: options?.uuid ?? '00000000-0000-0000-0000-000000000000',
      // metadata: null,
      // content: null,
      // ...options,
    };

    while (!metricCommandOptions.UUID) {
      metricCommandOptions.UUID = (
        await this.inquirer.ask<UuidAnswerDTO>('uuid-questions', options)
      ).UUID;
    }

    this.displayResults(metricCommandOptions.UUID ?? 'N/A');

    const metric: MetricCommandOptionsDTO = await this.metricService.getMetric(
      metricCommandOptions.UUID,
    );
    console.log(JSON.stringify(metric, null, 2));
  }

  displayResults(UUID: string): void {
    console.log(`UUID: ${UUID}`);
  }

  @Option({
    flags: '-u, --uuid [UUID]',
    description: 'The UUID of the metric',
    // defaultValue: '00000000-0000-0000-0000-000000000000',
  })
  parseUUID(val: string): string {
    return val;
  }
}

// npm run build
// nestjs build
// node ./dist/cmd.main metric get --help
// node ./dist/cmd.main metric get --uuid 00000000-0000-0000-0000-000000000001
