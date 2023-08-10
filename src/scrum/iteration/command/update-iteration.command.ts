import {
  CommandRunner,
  InquirerService,
  Option,
  SubCommand,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { IterationService } from '../iteration.service';
import { UpdateIterationRequestDTO } from '../dto/update-iteration-request.dto';
import { IterationCommandOptionsDTO } from './dto/iteration-command-options.dto';
import { IterationMetadataCommandOptionsDTO } from './dto/iteration-metadata-command-options.dto';
import { IterationContentCommandOptionsDTO } from './dto/iteration-content-command-options.dto';
import { UuidAnswerDTO } from '../../common/command/dto/uuid-answer.dto';
import { IdAnswerDTO } from '../../common/command/dto/id-answer.dto';
import { NameAnswerDTO } from '../../common/command/dto/name-answer.dto';
import { getCommonDateCommandOptionsDTO } from '../../common/command/utils/common-date-command.utils';

@Injectable()
@SubCommand({
  name: 'update',
  description: 'A command to update a iteration',
})
export class UpdateIterationCommand extends CommandRunner {
  private readonly logger = new Logger(UpdateIterationCommand.name);
  constructor(
    private readonly inquirer: InquirerService,
    private readonly iterationService: IterationService,
  ) {
    super();
  }

  async run(
    passedParams: string[],
    options?: Record<string, any> | undefined,
  ): Promise<void> {
    this.logger.debug('>>> Updating iteration');
    // this.logger.debug(passedParams);
    // this.logger.debug(options);

    const iterationMetadataCommandOptions: IterationMetadataCommandOptionsDTO =
      {
        ID: options?.id ?? '',
        name: options?.name ?? '',
        status: options?.status ?? '',
        priority: options?.priority ?? '',
        risk: options?.risk ?? '',
        tags: options?.tags ?? [],
        dates: options?.dates ?? undefined,
        // iterationType: options?.iterationType ?? '',
        // storyPoints: options?.storyPoints ?? '',
      };
    const IterationContentCommandOptions: IterationContentCommandOptionsDTO = {
      description: options?.description ?? '',
      goal: options?.goal ?? '',
      // tasks: options?.tasks ?? [],
      columns: options?.columns ?? [],
    };
    const iterationCommandOptions: IterationCommandOptionsDTO = {
      UUID: options?.uuid ?? '00000000-0000-0000-0000-000000000000',
      metadata: iterationMetadataCommandOptions,
      content: IterationContentCommandOptions,
      // ...options,
    };

    // while (!iterationCommandOptions.UUID) {
    //   iterationCommandOptions.UUID = (
    //     await this.inquirer.ask<UuidAnswerDTO>('uuid-questions', options)
    //   ).UUID;
    // }

    if (!iterationCommandOptions.metadata.ID) {
      iterationCommandOptions.metadata.ID = (
        await this.inquirer.ask<IdAnswerDTO>('id-questions', options)
      ).ID;
    }

    if (!iterationCommandOptions.metadata.name) {
      iterationCommandOptions.metadata.name = (
        await this.inquirer.ask<NameAnswerDTO>('name-questions', options)
      ).name;
    }

    // ********************************************************************

    iterationCommandOptions.metadata.dates =
      await getCommonDateCommandOptionsDTO(
        // this.configService,
        this.inquirer,
        options,
      );

    // ********************************************************************

    console.log(iterationCommandOptions);

    // ********************************************************************

    const updateIterationRequestDTO: UpdateIterationRequestDTO = {
      UUID: iterationCommandOptions.UUID,
      metadata: new IterationMetadataCommandOptionsDTO(
        iterationCommandOptions.metadata.ID,
        iterationCommandOptions.metadata.name,
        iterationCommandOptions.metadata.status,
        iterationCommandOptions.metadata.priority,
        iterationCommandOptions.metadata.risk,
        iterationCommandOptions.metadata.tags,
        iterationCommandOptions.metadata.dates,
      ),
      content: new IterationContentCommandOptionsDTO(
        iterationCommandOptions.content.description,
        iterationCommandOptions.content.goal,
        // iterationCommandOptions.content.tasks,
        iterationCommandOptions.content.columns,
      ),
    };

    console.log(updateIterationRequestDTO);
    this.iterationService.updateIteration(
      updateIterationRequestDTO.UUID,
      updateIterationRequestDTO,
    );
  }

  @Option({
    flags: '-u, --uuid [UUID]',
    description: 'The UUID of the iteration',
    // defaultValue: '00000000-0000-0000-0000-000000000000',
  })
  parseUUID(val: string): string {
    return val;
  }

  @Option({
    flags: '-i, --id [id]',
    description: 'The id of the iteration',
    // defaultValue: 'PPP-0000',
  })
  parseId(val: string): string {
    return val;
  }

  @Option({
    flags: '-n, --name [name]',
    description: 'The name of the iteration',
    // defaultValue: 'default-iteration-name',
  })
  parseName(val: string): string {
    return val;
  }

  // ********************************************************************

  @Option({
    flags: '-c, --createdBy [createdBy]',
    description: 'The user who created the iteration',
    // defaultValue: 'default-created-by',
  })
  parseCreatedBy(val: string): string {
    return val;
  }

  @Option({
    flags: '-d, --createdDate [createdDate]',
    description: 'The date when the iteration was created',
    // defaultValue: 'default-created-date',
  })
  parseCreatedDate(val: string): string {
    return val;
  }

  @Option({
    flags: '-b, --updatedBy [updatedBy]',
    description: 'The user who last updated the iteration',
    // defaultValue: 'default-updated-by',
  })
  parseUpdatedBy(val: string): string {
    return val;
  }

  @Option({
    flags: '-e, --updatedDate [updatedDate]',
    description: 'The date when the iteration was last updated',
    // defaultValue: 'default-updated-date',
  })
  parseUpdatedDate(val: string): string {
    return val;
  }

  @Option({
    flags: '-s, --startedBy [startedBy]',
    description: 'The user who started the iteration',
    // defaultValue: 'default-started-by',
  })
  parseStartedBy(val: string): string {
    return val;
  }

  @Option({
    flags: '-t, --startedDate [startedDate]',
    description: 'The date when the iteration was started',
    // defaultValue: 'default-started-date',
  })
  parseStartedDate(val: string): string {
    return val;
  }

  @Option({
    flags: '-a, --startDate [startDate]',
    description: 'The start date of the iteration',
    // defaultValue: 'default-start-date',
  })
  parseStartDate(val: string): string {
    return val;
  }

  @Option({
    flags: '-z, --endDate [endDate]',
    description: 'The end date of the iteration',
    // defaultValue: 'default-end-date',
  })
  parseEndDate(val: string): string {
    return val;
  }

  @Option({
    flags: '-m, --completedBy [completedBy]',
    description: 'The user who completed the iteration',
    // defaultValue: 'default-completed-by',
  })
  parseCompletedBy(val: string): string {
    return val;
  }

  @Option({
    flags: '-p, --completedDate [completedDate]',
    description: 'The date when the iteration was completed',
    // defaultValue: 'default-completed-date',
  })
  parseCompletedDate(val: string): string {
    return val;
  }

  // ********************************************************************
}

// npm run build
// nestjs build
// node ./dist/cmd.main iteration update --help
// node ./dist/cmd.main iteration update --uuid 00000000-0000-0000-0000-000000000001
