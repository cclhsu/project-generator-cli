import {
  CommandRunner,
  InquirerService,
  Option,
  SubCommand,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { MetricService } from '../metric.service';
import { validate } from 'class-validator';
import {
  MetricMetadataDTO,
  MetricContentDTO,
  MetricDTO,
  CreateMetricRequestDTO,
} from '../dto';
import { getCommonDateDTO } from '../../../common/command/utils/common-date-command.utils';
import { IdAnswerDTO, MetricNameAnswerDTO } from '../../../common/command/dto';
import {
  validateCompletedAt,
  validateCreatedAt,
  validateEndDate,
  validateStartDate,
  validateStartedAt,
  validateUuid,
  validateUpdatedAt,
  validateUserId,
  validateMetricName,
} from '../../../common/command/validation';

@Injectable()
@SubCommand({
  name: 'create',
  description: 'A command to create a metric',
})
export class CreateMetricCommand extends CommandRunner {
  private readonly logger = new Logger(CreateMetricCommand.name);
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
    this.logger.debug('>>> Creating metric');
    // this.logger.verbose('passedParam: ' + JSON.stringify(passedParams, null, 2));
    // this.logger.verbose('options: ' + JSON.stringify(options, null, 2));

    const metricMetadata: MetricMetadataDTO = {
      name: options?.name ?? '',
      dates: options?.dates ?? undefined,
    };
    const MetricContent: MetricContentDTO = {};
    const metric: MetricDTO = {
      ID: options?.id ?? 'METRIC-0000',
      UUID: options?.uuid ?? '00000000-0000-0000-0000-000000000000',
      metadata: metricMetadata,
      content: MetricContent,
      // ...options,
    };

    // ********************************************************************

    while (!metric.ID) {
      metric.ID = (
        await this.inquirer.ask<IdAnswerDTO>('id-questions', options)
      ).ID;
    }

    // while (!metric.UUID) {
    //   metric.UUID = (
    //     await this.inquirer.ask<UuidAnswerDTO>('uuid-questions', options)
    //   ).UUID;
    // }

    // ********************************************************************
    // Update Metadata

    while (!metric.metadata.name) {
      metric.metadata.name = (
        await this.inquirer.ask<MetricNameAnswerDTO>(
          'metric-name-questions',
          options,
        )
      ).metricName;
    }

    // ********************************************************************
    // Update Dates

    metric.metadata.dates = await getCommonDateDTO(
      // this.configService,
      this.inquirer,
      options,
    );

    // ********************************************************************
    // Update Content

    this.logger.verbose(JSON.stringify(metric, null, 2));

    // ********************************************************************

    const createMetricRequestDTO: CreateMetricRequestDTO = {
      ID: metric.ID,
      UUID: metric.UUID,
      metadata: new MetricMetadataDTO(
        metric.metadata.name,
        metric.metadata.dates,
      ),
      content: new MetricContentDTO(),
    };

    try {
      this.logger.verbose(JSON.stringify(createMetricRequestDTO, null, 2));
      await this.metricService.createMetric(createMetricRequestDTO);
    } catch (error: any) {
      this.logger.error(error.message);
      this.logger.debug(error.stack);
    }
  }

  @Option({
    flags: '-i, --id [id]',
    description: 'The id of the metric',
    // defaultValue: 'PPP-0000',
  })
  parseId(val: string): string {
    // const res = validateMetricId(val);
    // if (res === true) {
    //   return val;
    // }
    // throw new Error(res + ': ' + val + '\n');
    return val;
  }

  // @Option({
  //   flags: '-u, --uuid [UUID]',
  //   description: 'The UUID of the metric',
  //   // defaultValue: '00000000-0000-0000-0000-000000000000',
  // })
  // parseUUID(val: string): string {
  //   const res = validateUuid(val);
  //   if (res === true) {
  //     return val;
  //   }
  //   throw new Error(res + ': ' + val + '\n');
  // }

  // ********************************************************************
  // Update Metadata

  @Option({
    flags: '-n, --name [name]',
    description: 'The name of the metric',
    // defaultValue: 'default-metric-name',
  })
  parseName(val: string): string {
    const res = validateMetricName(val);
    if (res === true) {
      return val;
    }
    throw new Error(res + ': ' + val + '\n');
  }

  // ********************************************************************
  // Update Dates

  @Option({
    flags: '-c, --createdBy [createdBy]',
    description: 'The user who created the metric',
    // defaultValue: 'default-created-by',
  })
  parseCreatedBy(val: string): string {
    const res = validateUserId(val);
    if (res === true) {
      return val;
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-d, --createdAt [createdAt]',
    description: 'The date when the metric was created',
    // defaultValue: 'default-created-date',
  })
  parseCreatedAt(val: string): string {
    const res = validateCreatedAt(val);
    if (res === true) {
      return new Date(val).toISOString();
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-b, --updatedBy [updatedBy]',
    description: 'The user who last updated the metric',
    // defaultValue: 'default-updated-by',
  })
  parseUpdatedBy(val: string): string {
    const res = validateUserId(val);
    if (res === true) {
      return val;
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-e, --updatedAt [updatedAt]',
    description: 'The date when the metric was last updated',
    // defaultValue: 'default-updated-date',
  })
  parseUpdatedAt(val: string): string {
    const res = validateUpdatedAt(val);
    if (res === true) {
      return new Date(val).toISOString();
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-s, --startedBy [startedBy]',
    description: 'The user who started the metric',
    // defaultValue: 'default-started-by',
  })
  parseStartedBy(val: string): string {
    const res = validateUserId(val);
    if (res === true) {
      return val;
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-t, --startedAt [startedAt]',
    description: 'The date when the metric was started',
    // defaultValue: 'default-started-date',
  })
  parseStartedAt(val: string): string {
    const res = validateStartedAt(val);
    if (res === true) {
      return new Date(val).toISOString();
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-a, --startDate [startDate]',
    description: 'The start date of the metric',
    // defaultValue: 'default-start-date',
  })
  parseStartDate(val: string): string {
    const res = validateStartDate(val);
    if (res === true) {
      return new Date(val).toISOString();
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-z, --endDate [endDate]',
    description: 'The end date of the metric',
    // defaultValue: 'default-end-date',
  })
  parseEndDate(val: string): string {
    const res = validateEndDate(val);
    if (res === true) {
      return new Date(val).toISOString();
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-m, --completedBy [completedBy]',
    description: 'The user who completed the metric',
    // defaultValue: 'default-completed-by',
  })
  parseCompletedBy(val: string): string {
    const res = validateUserId(val);
    if (res === true) {
      return val;
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-p, --completedAt [completedAt]',
    description: 'The date when the metric was completed',
    // defaultValue: 'default-completed-date',
  })
  parseCompletedAt(val: string): string {
    const res = validateCompletedAt(val);
    if (res === true) {
      return new Date(val).toISOString();
    }
    throw new Error(res + ': ' + val + '\n');
  }

  // ********************************************************************
  // Update Content

  // ********************************************************************
}

// npm run build
// nestjs build
// node ./dist/cmd.main metric create --help
// node ./dist/cmd.main metric create --id ABC --name 'Metric ABC' --startDate '2021-01-01' --endDate '2021-12-31'
// node ./dist/cmd.main metric create --id XYZ --name 'Metric XYZ' --createdBy 'Jane Doe' --startDate '2022-01-01' --endDate '2022-12-31'
