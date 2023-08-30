import {
  CommandRunner,
  InquirerService,
  Option,
  SubCommand,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { IterationService } from '../iteration.service';
import { UpdateIterationContentRequestDTO } from '../dto';
import { getCommonDateDTO } from '../../../common/command/utils/common-date-command.utils';
import { validate } from 'class-validator';
import {
  IterationDTO,
  IterationContentDTO,
  IterationMetadataDTO,
} from '../dto';
import {
  TASK_STATUS_TYPE_ARRAY,
  TASK_RISK_TYPE_ARRAY,
  TASK_PRIORITY_TYPE_ARRAY,
  SCRUM_COLUMNS,
  DEFAULT_SCRUM_COLUMN,
  UPDATE_ACTION_TYPE,
} from '../../../common/constant';
import {
  ColumnsAnswerDTO,
  DescriptionAnswerDTO,
  GoalAnswerDTO,
  IdAnswerDTO,
  IterationIdAnswerDTO,
  IterationNameAnswerDTO,
  IterationPriorityAnswerDTO,
  IterationRiskAnswerDTO,
  IterationStatusAnswerDTO,
  IterationTasksAnswerDTO,
  IterationTypeAnswerDTO,
  TagsAnswerDTO,
  UuidAnswerDTO,
} from '../../../common/command/dto';
import {
  isValidUuids,
  validateCompletedAt,
  validateCreatedAt,
  validateEndDate,
  validateIterationId,
  validateIterationName,
  validateIterationType,
  validateProjectStatus,
  validateStartDate,
  validateStartedAt,
  validateTaskPriority,
  validateTaskRisk,
  validateUpdatedAt,
  validateUserId,
  validateUuid,
} from '../../../common/command/validation';
import {
  convertStringToArray,
  convertStringToIdUuidStatusArray,
  isValidIdUuidStatusArray,
} from '../../../utils/array';
import { IdUuidStatusDTO } from '../../../common/dto';

@Injectable()
@SubCommand({
  name: 'update-content',
  description: 'A command to update a iteration conten',
})
export class UpdateIterationContentCommand extends CommandRunner {
  private readonly logger = new Logger(UpdateIterationContentCommand.name);
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
    // this.logger.verbose('passedParam: ' + JSON.stringify(passedParams, null, 2));
    // this.logger.verbose('options: ' + JSON.stringify(options, null, 2));

    const iterationMetadata: IterationMetadataDTO = {
      name: options?.name ?? '',
      status: options?.status ?? '',
      priority: options?.priority ?? '',
      risk: options?.risk ?? '',
      tags: options?.tags ?? [],
      dates: options?.dates ?? undefined,
      iterationType: options?.iterationType ?? '',
      // storyPoints: options?.storyPoints ?? '',
    };
    const IterationContent: IterationContentDTO = {
      description: options?.description ?? '',
      goal: options?.goal ?? '',
      tasks: options?.tasks ?? [],
      columns: options?.columns ?? [],
    };
    const iteration: IterationDTO = {
      ID: options?.id ?? '',
      UUID: options?.uuid ?? '00000000-0000-0000-0000-000000000000',
      metadata: iterationMetadata,
      content: IterationContent,
      // ...options,
    };

    // ********************************************************************

    // if (!iteration.ID) {
    //   iteration.ID = (
    //     await this.inquirer.ask<IterationIdAnswerDTO>(
    //       'iteration-id-questions',
    //       options,
    //     )
    //   ).ID;
    // }

    while (!iteration.UUID) {
      iteration.UUID = (
        await this.inquirer.ask<UuidAnswerDTO>('uuid-questions', options)
      ).UUID;
    }

    // ********************************************************************
    // Update Metadata

    if (!iteration.metadata.name) {
      iteration.metadata.name = (
        await this.inquirer.ask<IterationNameAnswerDTO>(
          'iteration-name-questions',
          options,
        )
      ).iterationName;
    }

    while (!iteration.metadata.status) {
      iteration.metadata.status = (
        await this.inquirer.ask<IterationStatusAnswerDTO>(
          'iteration-status-questions',
          options,
        )
      ).iterationStatus;
    }

    while (!iteration.metadata.priority) {
      iteration.metadata.priority = (
        await this.inquirer.ask<IterationPriorityAnswerDTO>(
          'iteration-priority-questions',
          options,
        )
      ).iterationPriority;
    }

    while (!iteration.metadata.risk) {
      iteration.metadata.risk = (
        await this.inquirer.ask<IterationRiskAnswerDTO>(
          'iteration-risk-questions',
          options,
        )
      ).iterationRisk;
    }

    while (!iteration.metadata.tags) {
      iteration.metadata.tags = (
        await this.inquirer.ask<TagsAnswerDTO>('tags-questions', options)
      ).tags;
    }

    while (!iteration.metadata.iterationType) {
      iteration.metadata.iterationType = (
        await this.inquirer.ask<IterationTypeAnswerDTO>(
          'iteration-type-questions',
          options,
        )
      ).iterationType;
    }

    // while (!iteration.metadata.storyPoints) {
    //   iteration.metadata.storyPoints = (
    //     await this.inquirer.ask<IterationStoryPointsAnswerDTO>(
    //       'iteration-story-points-questions',
    //       options,
    //     )
    //   ).iterationStoryPoints;
    // }

    // ********************************************************************
    // Update Dates

    iteration.metadata.dates = await getCommonDateDTO(
      // this.configService,
      this.inquirer,
      options,
      UPDATE_ACTION_TYPE,
    );

    // ********************************************************************
    // Update Content

    while (!iteration.content.description) {
      iteration.content.description = (
        await this.inquirer.ask<DescriptionAnswerDTO>(
          'description-questions',
          options,
        )
      ).description;
    }

    while (!iteration.content.goal) {
      iteration.content.goal = (
        await this.inquirer.ask<GoalAnswerDTO>('goal-questions', options)
      ).goal;
    }

    while (!iteration.content.tasks) {
      iteration.content.tasks = (
        await this.inquirer.ask<IterationTasksAnswerDTO>(
          'iteration-tasks-questions',
          options,
        )
      ).iterationTasks;
    }

    while (!iteration.content.columns) {
      iteration.content.columns = (
        await this.inquirer.ask<ColumnsAnswerDTO>('columns-questions', options)
      ).columns;
    }

    this.logger.verbose(JSON.stringify(iteration, null, 2));

    // ********************************************************************

    const updateIterationContentRequestDTO: UpdateIterationContentRequestDTO = {
      // ID: iteration.ID,
      UUID: iteration.UUID,
      // metadata: new IterationMetadataDTO(
      //   iteration.metadata.name,
      //   iteration.metadata.status,
      //   iteration.metadata.priority,
      //   iteration.metadata.risk,
      //   iteration.metadata.tags,
      //   iteration.metadata.dates,
      //   iteration.metadata.iterationType,
      // ),
      content: new IterationContentDTO(
        iteration.content.description,
        iteration.content.goal,
        iteration.content.tasks,
        iteration.content.columns,
      ),
    };

    try {
      this.logger.verbose(
        JSON.stringify(updateIterationContentRequestDTO, null, 2),
      );
      await this.iterationService.updateIterationContent(
        updateIterationContentRequestDTO.UUID,
        updateIterationContentRequestDTO,
      );
    } catch (error: any) {
      this.logger.error(error.message);
      this.logger.debug(error.stack);
    }
  }

  // @Option({
  //   flags: '-i, --id [id]',
  //   description: 'The id of the iteration',
  //   // defaultValue: 'PPP-0000',
  // })
  // parseId(val: string): string {
  //   const res = validateIterationId(val);
  //   if (res === true) {
  //     return val;
  //   }
  //   throw new Error(res + ': ' + val + '\n');
  // }

  @Option({
    flags: '-u, --uuid [UUID]',
    description: 'The UUID of the iteration',
    // defaultValue: '00000000-0000-0000-0000-000000000000',
  })
  parseUUID(val: string): string {
    const res = validateUuid(val);
    if (res === true) {
      return val;
    }
    throw new Error(res + ': ' + val + '\n');
  }

  // ********************************************************************
  // Update Metadata

  @Option({
    flags: '-n, --name [name]',
    description: 'The name of the iteration',
    // defaultValue: 'default-iteration-name',
  })
  parseName(val: string): string {
    const res = validateIterationName(val);
    if (res === true) {
      return val;
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-t, --status [status]',
    description: 'The status of the iteration',
    // defaultValue: 'default-iteration-status',
    choices: TASK_STATUS_TYPE_ARRAY,
  })
  parseStatus(val: string): string {
    const res = validateProjectStatus(val);
    if (res === true) {
      return val;
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-p, --priority [priority]',
    description: 'The priority of the iteration',
    // defaultValue: 'default-iteration-priority',
    choices: TASK_PRIORITY_TYPE_ARRAY,
  })
  parsePriority(val: string): string {
    const res = validateTaskPriority(val);
    if (res === true) {
      return val;
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-r, --risk [risk]',
    description: 'The risk of the iteration',
    // defaultValue: 'default-iteration-risk',
    choices: TASK_RISK_TYPE_ARRAY,
  })
  parseRisk(val: string): string {
    const res = validateTaskRisk(val);
    if (res === true) {
      return val;
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-g, --tags [tags...]',
    description: 'The tags of the iteration',
    // defaultValue: 'default-iteration-tags',
  })
  parseTags(val: string[]): string[] {
    return val;
  }

  @Option({
    flags: '-y, --iterationType [iterationType]',
    description: 'The type of the iteration',
    // defaultValue: 'default-iteration-type',
  })
  parseIterationType(val: string): string {
    const res = validateIterationType(val);
    if (res === true) {
      return val;
    }
    throw new Error(res + ': ' + val + '\n');
  }

  // @Option({
  //   flags: '-t, --storyPointsTotal [storyPointsTotal]',
  //   description: 'The total story points of the iteration',
  //   // defaultValue: 'default-iteration-story-points-total',
  // })
  // parseStoryPointsTotal(val: string): string {
  //   return val;
  // }

  // @Option({
  //   flags: '-c, --storyPointsCompleted [storyPointsCompleted]',
  //   description: 'The completed story points of the iteration',
  //   // defaultValue: 'default-iteration-story-points-completed',
  // })
  // parseStoryPointsCompleted(val: string): string {
  //   return val;
  // }

  // @Option({
  //   flags: '-r, --storyPointsRemaining [storyPointsRemaining]',
  //   description: 'The remaining story points of the iteration',
  //   // defaultValue: 'default-iteration-story-points-remaining',
  // })
  // parseStoryPointsRemaining(val: string): string {
  //   return val;
  // }

  // ********************************************************************
  // Update Dates

  // @Option({
  //   flags: '-c, --createdBy [createdBy]',
  //   description: 'The user who created the iteration',
  //   // defaultValue: 'default-created-by',
  // })
  // parseCreatedBy(val: string): string {
  //   const res = validateUserId(val);
  //   if (res === true) {
  //     return val;
  //   }
  //   throw new Error(res + ': ' + val + '\n');
  // }

  // @Option({
  //   flags: '-d, --createdAt [createdAt]',
  //   description: 'The date when the iteration was created',
  //   // defaultValue: 'default-created-date',
  // })
  // parseCreatedAt(val: string): string {
  //   const res = validateCreatedAt(val);
  //   if (res === true) {
  //     return new Date(val).toISOString();
  //   }
  //   throw new Error(res + ': ' + val + '\n');
  // }

  @Option({
    flags: '-b, --updatedBy [updatedBy]',
    description: 'The user who last updated the iteration',
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
    description: 'The date when the iteration was last updated',
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
    description: 'The user who started the iteration',
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
    description: 'The date when the iteration was started',
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
    description: 'The start date of the iteration',
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
    description: 'The end date of the iteration',
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
    description: 'The user who completed the iteration',
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
    description: 'The date when the iteration was completed',
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

  @Option({
    flags: '-d, --description [description]',
    description: 'The description of the iteration',
    // defaultValue: 'default-iteration-description',
  })
  parseDescription(val: string): string {
    return val;
  }

  @Option({
    flags: '-g, --goal [goal]',
    description: 'The goal of the iteration',
    // defaultValue: 'default-iteration-goal',
  })
  parseGoal(val: string): string {
    return val;
  }

  @Option({
    flags: '-t, --tasks [tasks...]',
    description: 'The tasks of the iteration',
    // defaultValue: 'default-iteration-tasks',
  })
  parseTasks(val: string): IdUuidStatusDTO[] {
    const items: IdUuidStatusDTO[] = convertStringToIdUuidStatusArray(val);
    if (!isValidIdUuidStatusArray(items)) {
      throw new Error(
        UpdateIterationContentCommand.name +
          ': Invalid user ID, UUID, Status in the list: ' +
          val,
      );
    }
    return items;
  }

  // @Option({
  //   flags: '-c, --columns [columns...]',
  //   description: 'The columns of the iteration',
  //   defaultValue: DEFAULT_SCRUM_COLUMN,
  //   choices: SCRUM_COLUMNS,
  // })
  // parseColumns(val: string): string[] {
  //   const items: string[] = convertStringToArray(val);
  //   if (!isValidUuids(items)) {
  //     throw new Error(UpdateIterationContentCommand.name + ': Invalid user ID, UUID, Status in the list: ' + val);
  //   }
  //   return items;
  // }

  // ********************************************************************
}

// npm run build
// nestjs build
// node ./dist/cmd.main iteration update --help
// node ./dist/cmd.main iteration update --uuid 00000000-0000-0000-0000-000000000001
