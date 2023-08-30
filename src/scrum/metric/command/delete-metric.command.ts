import {
  CommandRunner,
  InquirerService,
  Option,
  SubCommand,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { MetricService } from '../metric.service';
import { GetMetricByUuidRequestDTO, MetricDTO } from '../dto';
import { UuidAnswerDTO } from '../../../common/command/dto';
import {
  validateCompletedAt,
  validateCreatedAt,
  validateEndDate,
  validateStartDate,
  validateStartedAt,
  validateUuid,
  validateUpdatedAt,
} from '../../../common/command/validation';

@Injectable()
@SubCommand({
  name: 'delete',
  description: 'A command to delete a metric',
})
export class DeleteMetricCommand extends CommandRunner {
  private readonly logger = new Logger(DeleteMetricCommand.name);
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
    this.logger.debug('>>> Deleting metric');
    // this.logger.verbose('passedParam: ' + JSON.stringify(passedParams, null, 2));
    // this.logger.verbose('options: ' + JSON.stringify(options, null, 2));

    const metric: GetMetricByUuidRequestDTO = {
      UUID: options?.uuid ?? '00000000-0000-0000-0000-000000000000',
      // metadata: null,
      // content: null,
      // ...options,
    };

    // ********************************************************************

    while (!metric.UUID) {
      metric.UUID = (
        await this.inquirer.ask<UuidAnswerDTO>('uuid-questions', options)
      ).UUID;
    }
    this.logger.verbose(`config: ${JSON.stringify(metric.UUID, null, 2)}`);

    try {
      const metricDTO: MetricDTO = await this.metricService.deleteMetric(
        metric.UUID,
      );
      this.logger.verbose(JSON.stringify(metricDTO, null, 2));
    } catch (error: any) {
      this.logger.error(error.message);
      this.logger.debug(error.stack);
    }
  }

  @Option({
    flags: '-u, --uuid [UUID]',
    description: 'The UUID of the metric',
    // defaultValue: '00000000-0000-0000-0000-000000000000',
  })
  parseUUID(val: string): string {
    const res = validateUuid(val);
    if (res === true) {
      return val;
    }
    throw new Error(res + ': ' + val + '\n');
  }
}

// npm run build
// nestjs build
// node ./dist/cmd.main metric delete --help
// node ./dist/cmd.main metric delete --uuid 00000000-0000-0000-0000-000000000001
