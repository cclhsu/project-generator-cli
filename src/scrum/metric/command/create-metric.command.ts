import {
  CommandRunner,
  InquirerService,
  Option,
  SubCommand,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { MetricService } from '../metric.service';
import { CreateMetricRequestDTO } from '../dto/create-metric-request.dto';
import { MetricCommandOptionsDTO } from './dto/metric-command-options.dto';
import { MetricMetadataCommandOptionsDTO } from './dto/metric-metadata-command-options.dto';
import { MetricContentCommandOptionsDTO } from './dto/metric-content-command-options.dto';
import { UuidAnswerDTO } from '../../common/command/dto/uuid-answer.dto';
import { IdAnswerDTO } from '../../common/command/dto/id-answer.dto';
import { NameAnswerDTO } from '../../common/command/dto/name-answer.dto';
import { getCommonDateCommandOptionsDTO } from '../../common/command/utils/common-date-command.utils';

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
    // this.logger.debug(passedParams);
    // this.logger.debug(options);

    const metricMetadataCommandOptions: MetricMetadataCommandOptionsDTO = {
      ID: options?.id ?? '',
      name: options?.name ?? '',
      dates: options?.dates ?? undefined,
    };
    const MetricContentCommandOptions: MetricContentCommandOptionsDTO = {};
    const metricCommandOptions: MetricCommandOptionsDTO = {
      UUID: options?.uuid ?? '00000000-0000-0000-0000-000000000000',
      metadata: metricMetadataCommandOptions,
      content: MetricContentCommandOptions,
      // ...options,
    };

    // while (!metricCommandOptions.UUID) {
    //   metricCommandOptions.UUID = (
    //     await this.inquirer.ask<UuidAnswerDTO>('uuid-questions', options)
    //   ).UUID;
    // }

    while (!metricCommandOptions.metadata.ID) {
      metricCommandOptions.metadata.ID = (
        await this.inquirer.ask<IdAnswerDTO>('id-questions', options)
      ).ID;
    }

    while (!metricCommandOptions.metadata.name) {
      metricCommandOptions.metadata.name = (
        await this.inquirer.ask<NameAnswerDTO>('name-questions', options)
      ).name;
    }

    // ********************************************************************

    metricCommandOptions.metadata.dates = await getCommonDateCommandOptionsDTO(
      // this.configService,
      this.inquirer,
      options,
    );

    // ********************************************************************

    console.log(metricCommandOptions);

    // ********************************************************************

    const createMetricRequestDTO: CreateMetricRequestDTO = {
      UUID: metricCommandOptions.UUID,
      metadata: new MetricMetadataCommandOptionsDTO(
        metricCommandOptions.metadata.ID,
        metricCommandOptions.metadata.name,
        metricCommandOptions.metadata.dates,
      ),
      content: new MetricContentCommandOptionsDTO(),
    };

    console.log(createMetricRequestDTO);
    this.metricService.createMetric(createMetricRequestDTO);
  }

  // @Option({
  //   flags: '-u, --uuid [UUID]',
  //   description: 'The UUID of the metric',
  //   // defaultValue: '00000000-0000-0000-0000-000000000000',
  // })
  // parseUUID(val: string): string {
  //   return val;
  // }

  @Option({
    flags: '-i, --id [id]',
    description: 'The id of the metric',
    // defaultValue: 'PPP-0000',
  })
  parseId(val: string): string {
    return val;
  }

  @Option({
    flags: '-n, --name [name]',
    description: 'The name of the metric',
    // defaultValue: 'default-metric-name',
  })
  parseName(val: string): string {
    return val;
  }

  // ********************************************************************

  @Option({
    flags: '-c, --createdBy [createdBy]',
    description: 'The user who created the metric',
    // defaultValue: 'default-created-by',
  })
  parseCreatedBy(val: string): string {
    return val;
  }

  @Option({
    flags: '-d, --createdDate [createdDate]',
    description: 'The date when the metric was created',
    // defaultValue: 'default-created-date',
  })
  parseCreatedDate(val: string): string {
    return val;
  }

  @Option({
    flags: '-b, --updatedBy [updatedBy]',
    description: 'The user who last updated the metric',
    // defaultValue: 'default-updated-by',
  })
  parseUpdatedBy(val: string): string {
    return val;
  }

  @Option({
    flags: '-e, --updatedDate [updatedDate]',
    description: 'The date when the metric was last updated',
    // defaultValue: 'default-updated-date',
  })
  parseUpdatedDate(val: string): string {
    return val;
  }

  @Option({
    flags: '-s, --startedBy [startedBy]',
    description: 'The user who started the metric',
    // defaultValue: 'default-started-by',
  })
  parseStartedBy(val: string): string {
    return val;
  }

  @Option({
    flags: '-t, --startedDate [startedDate]',
    description: 'The date when the metric was started',
    // defaultValue: 'default-started-date',
  })
  parseStartedDate(val: string): string {
    return val;
  }

  @Option({
    flags: '-a, --startDate [startDate]',
    description: 'The start date of the metric',
    // defaultValue: 'default-start-date',
  })
  parseStartDate(val: string): string {
    return val;
  }

  @Option({
    flags: '-z, --endDate [endDate]',
    description: 'The end date of the metric',
    // defaultValue: 'default-end-date',
  })
  parseEndDate(val: string): string {
    return val;
  }

  @Option({
    flags: '-m, --completedBy [completedBy]',
    description: 'The user who completed the metric',
    // defaultValue: 'default-completed-by',
  })
  parseCompletedBy(val: string): string {
    return val;
  }

  @Option({
    flags: '-p, --completedDate [completedDate]',
    description: 'The date when the metric was completed',
    // defaultValue: 'default-completed-date',
  })
  parseCompletedDate(val: string): string {
    return val;
  }

  // ********************************************************************
}

// npm run build
// nestjs build
// node ./dist/cmd.main metric create --help
// node ./dist/cmd.main metric create --id ABC --name 'Metric ABC' --startDate '2021-01-01' --endDate '2021-12-31'
// node ./dist/cmd.main metric create --id XYZ --name 'Metric XYZ' --createdBy 'Jane Doe' --startDate '2022-01-01' --endDate '2022-12-31'
