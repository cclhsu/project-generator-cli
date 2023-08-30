import {
  CommandRunner,
  InquirerService,
  Option,
  SubCommand,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { TaskService } from '../task.service';
import { UpdateTaskRequestDTO } from '../dto';
import { getCommonDateDTO } from '../../../common/command/utils/common-date-command.utils';
import { validate } from 'class-validator';
import { TaskDTO, TaskContentDTO, TaskMetadataDTO } from '../dto';
import {
  AssigneeAnswerDTO,
  MessagesAnswerDTO,
  ContextAnswerDTO,
  DescriptionAnswerDTO,
  LinksAnswerDTO,
  IdAnswerDTO,
  IterationsAnswerDTO,
  TaskNameAnswerDTO,
  TagsAnswerDTO,
  TaskIdAnswerDTO,
  TaskPriorityAnswerDTO,
  TaskRelationsAnswerDTO,
  TaskRiskAnswerDTO,
  TaskStatusAnswerDTO,
  TaskTypeAnswerDTO,
  UuidAnswerDTO,
  IterationsIdUuidStatusAnswerDTO,
} from '../../../common/command/dto';
import {
  getTaskStoryPointsDTO,
  getTaskDescriptionDTO,
  getlinksDTO,
} from './utils';
import {
  validateAcceptanceCriterion,
  validateCompletedAt,
  validateCreatedAt,
  validateDefinitionOfDone,
  validateEndDate,
  validateStartDate,
  validateStartedAt,
  validateTaskComplexity,
  validateTaskDependency,
  validateTaskEffort,
  validateTaskId,
  validateTaskPriority,
  validateTaskRisk,
  validateTaskStatus,
  validateTaskType,
  validateTaskUncertainty,
  validateUuid,
  validateUpdatedAt,
  validateUserId,
  validateUrl,
  validateUserStory,
  validateTaskName,
  validateNameUrl,
  convertStringToNameUrlDTO,
} from '../../../common/command/validation';
import { UPDATE_ACTION_TYPE } from '../../../common/constant';
import { IdUuidDTO, IdUuidStatusDTO, NameUrlDTO } from '../../../common/dto';
import { CreateProjectCommand } from '../../../scrum/project/command';
import {
  convertStringToIdUuidArray,
  convertStringToIdUuidStatusArray,
  convertStringToNameUrlArray,
  isValidIdUuidArray,
  isValidIdUuidStatusArray,
  isValidNameUrlArray,
} from '../../../utils/array';

@Injectable()
@SubCommand({
  name: 'update',
  description: 'A command to update a task',
})
export class UpdateTaskCommand extends CommandRunner {
  private readonly logger = new Logger(UpdateTaskCommand.name);
  constructor(
    private readonly inquirer: InquirerService,
    private readonly taskService: TaskService,
  ) {
    super();
  }

  async run(
    passedParams: string[],
    options?: Record<string, any> | undefined,
  ): Promise<void> {
    this.logger.debug('>>> Updating task');
    // this.logger.verbose('passedParam: ' + JSON.stringify(passedParams, null, 2));
    // this.logger.verbose('options: ' + JSON.stringify(options, null, 2));

    const taskMetadata: TaskMetadataDTO = {
      name: options?.name ?? '',
      taskType: options?.taskType ?? undefined,
      assignee: options?.assignee ?? undefined,
      status: options?.status ?? undefined,
      priority: options?.priority ?? undefined,
      risk: options?.risk ?? undefined,
      tags: options?.tags ?? undefined,
      dates: options?.dates ?? undefined,
      storyPoint: options?.storyPoint ?? undefined,
      iterations: options?.iterations ?? undefined,
      relations: options?.relations ?? undefined,
    };
    const TaskContent: TaskContentDTO = {
      context: options?.context ?? undefined,
      description: options?.description ?? undefined,
      links: options?.links ?? undefined,
      messages: options?.messages ?? undefined,
    };
    const task: TaskDTO = {
      ID: options?.id ?? '',
      UUID: options?.uuid ?? '00000000-0000-0000-0000-000000000000',
      metadata: taskMetadata,
      content: TaskContent,
      // ...options,
    };

    // ********************************************************************

    // if (!task.ID) {
    //   task.ID = (
    //     await this.inquirer.ask<TaskIdAnswerDTO>('task-id-questions', options)
    //   ).ID;
    // }

    while (!task.UUID) {
      task.UUID = (
        await this.inquirer.ask<UuidAnswerDTO>('uuid-questions', options)
      ).UUID;
    }

    // ********************************************************************
    // Update Metadata

    if (!task.metadata.name) {
      task.metadata.name = (
        await this.inquirer.ask<TaskNameAnswerDTO>(
          'task-name-questions',
          options,
        )
      ).taskName;
    }

    while (!task.metadata.taskType) {
      task.metadata.taskType = (
        await this.inquirer.ask<TaskTypeAnswerDTO>(
          'task-type-questions',
          options,
        )
      ).taskType;
    }

    while (!task.metadata.assignee) {
      task.metadata.assignee = (
        await this.inquirer.ask<AssigneeAnswerDTO>(
          'assignee-questions',
          options,
        )
      ).assignee;
    }

    while (!task.metadata.status) {
      task.metadata.status = (
        await this.inquirer.ask<TaskStatusAnswerDTO>(
          'task-status-questions',
          options,
        )
      ).taskStatus;
    }

    while (!task.metadata.priority) {
      task.metadata.priority = (
        await this.inquirer.ask<TaskPriorityAnswerDTO>(
          'task-priority-questions',
          options,
        )
      ).taskPriority;
    }

    while (!task.metadata.risk) {
      task.metadata.risk = (
        await this.inquirer.ask<TaskRiskAnswerDTO>(
          'task-risk-questions',
          options,
        )
      ).taskRisk;
    }

    while (!task.metadata.tags) {
      task.metadata.tags = (
        await this.inquirer.ask<TagsAnswerDTO>('tags-questions', options)
      ).tags;
    }

    while (!task.metadata.storyPoint) {
      task.metadata.storyPoint = await getTaskStoryPointsDTO(
        this.inquirer,
        options,
      );
    }

    if (!task.metadata.iterations) {
      task.metadata.iterations = (
        await this.inquirer.ask<IterationsIdUuidStatusAnswerDTO>(
          'iteration-id-uuid-status-questions',
          options,
        )
      ).iterations;
    }

    if (!task.metadata.relations) {
      task.metadata.relations = (
        await this.inquirer.ask<TaskRelationsAnswerDTO>(
          'task-relations-questions',
          options,
        )
      ).taskRelations;
    }

    // ********************************************************************
    // Update Dates

    task.metadata.dates = await getCommonDateDTO(
      // this.configService,
      this.inquirer,
      options,
      UPDATE_ACTION_TYPE,
    );

    // ********************************************************************
    // Update Content

    while (!task.content.context) {
      task.content.context = (
        await this.inquirer.ask<ContextAnswerDTO>('context-questions', options)
      ).context;
    }

    while (!task.content.description) {
      task.content.description = await getTaskDescriptionDTO(
        this.inquirer,
        options,
      );
    }

    if (!task.content.links) {
      task.content.links = await getlinksDTO(this.inquirer, options);
    }

    if (!task.content.messages) {
      task.content.messages = (
        await this.inquirer.ask<MessagesAnswerDTO>(
          'messages-questions',
          options,
        )
      ).messages;
    }

    this.logger.verbose(JSON.stringify(task, null, 2));

    // ********************************************************************

    const updateTaskRequestDTO: UpdateTaskRequestDTO = {
      // ID: task.ID,
      UUID: task.UUID,
      metadata: new TaskMetadataDTO(
        task.metadata.name,
        task.metadata.taskType,
        task.metadata.assignee,
        task.metadata.status,
        task.metadata.priority,
        task.metadata.risk,
        task.metadata.tags,
        task.metadata.dates,
        task.metadata.storyPoint,
        task.metadata.iterations ?? [],
        task.metadata.relations ?? [],
      ),
      content: new TaskContentDTO(
        task.content.context,
        task.content.description,
        task.content.links ?? [],
        task.content.messages ?? [],
      ),
    };

    try {
      this.logger.verbose(JSON.stringify(updateTaskRequestDTO, null, 2));
      await this.taskService.updateTask(
        updateTaskRequestDTO.UUID,
        updateTaskRequestDTO,
      );
    } catch (error: any) {
      this.logger.error(error.message);
      this.logger.debug(error.stack);
    }
  }

  // @Option({
  //   flags: '-i, --id [id]',
  //   description: 'The id of the task',
  //   // defaultValue: 'PPP-0000',
  // })
  // parseId(val: string): string {
  //   const res = validateTaskId(val);
  //   if (res === true) {
  //     return val;
  //   }
  //   throw new Error(res + ': ' + val + '\n');
  // }

  @Option({
    flags: '-u, --uuid [UUID]',
    description: 'The UUID of the task',
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
    description: 'The name of the task',
    // defaultValue: 'default-task-name',
  })
  parseName(val: string): string {
    const res = validateTaskName(val);
    if (res === true) {
      return val;
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-y, --taskType [taskType]',
    description: 'The type of the task',
    // defaultValue: 'default-task-type',
  })
  parseTaskType(val: string): string {
    const res = validateTaskType(val);
    if (res === true) {
      return val;
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-a, --assignee [assignee]',
    description: 'The assignee of the task',
    // defaultValue: 'default-assignee',
  })
  parseAssignee(val: string): string {
    return val;
  }

  @Option({
    flags: '-s, --status [status]',
    description: 'The status of the task',
    // defaultValue: 'default-status',
  })
  parseStatus(val: string): string {
    const res = validateTaskStatus(val);
    if (res === true) {
      return val;
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-p, --priority [priority]',
    description: 'The priority of the task',
    // defaultValue: 'default-priority',
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
    description: 'The risk of the task',
    // defaultValue: 'default-risk',
  })
  parseRisk(val: string): string {
    const res = validateTaskRisk(val);
    if (res === true) {
      return val;
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-t, --tags [tags]',
    description: 'The tags of the task',
    // defaultValue: 'default-tags',
  })
  parseTags(val: string): string {
    return val;
  }

  // @Option({
  //   flags: '-s, --storyPoint [storyPoint]',
  //   description: 'The story point of the task',
  //   // defaultValue: 'default-story-point',
  // })
  // parseStoryPoint(val: string): string {
  //   return val;
  // }

  @Option({
    flags: '-c, --taskComplexity [taskComplexity]',
    description: 'The complexity of the task',
    // defaultValue: 'default-task-complexity',
  })
  parseTaskComplexity(val: string): string {
    const res = validateTaskComplexity(val);
    if (res === true) {
      return val;
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-u, --taskUncertainty [taskUncertainty]',
    description: 'The uncertainty of the task',
    // defaultValue: 'default-task-uncertainty',
  })
  parseTaskUncertainty(val: string): string {
    const res = validateTaskUncertainty(val);
    if (res === true) {
      return val;
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-d, --taskDependency [taskDependency]',
    description: 'The dependency of the task',
    // defaultValue: 'default-task-dependency',
  })
  parseTaskDependency(val: string): string {
    const res = validateTaskDependency(val);
    if (res === true) {
      return val;
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-e, --taskEffort [taskEffort]',
    description: 'The effort of the task',
    // defaultValue: 'default-task-effort',
  })
  parseTaskEffort(val: string): string {
    const res = validateTaskEffort(val);
    if (res === true) {
      return val;
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-t, --iterations [iterations]',
    description: 'The iterations of the project',
    // defaultValue: 'default-project-iterations',
  })
  parseIterations(val: string): IdUuidStatusDTO[] {
    const items: IdUuidStatusDTO[] = convertStringToIdUuidStatusArray(val);
    if (!isValidIdUuidStatusArray(items)) {
      throw new Error(
        CreateProjectCommand.name +
          ': Invalid user ID, UUID, Status in the list: ' +
          val,
      );
    }
    return items;
  }

  @Option({
    flags: '-r, --relations [relations]',
    description: 'The relations of the task',
    // defaultValue: 'default-relations',
  })
  parseRelations(val: string): string {
    return val;
  }

  // ********************************************************************
  // Update Dates

  // @Option({
  //   flags: '-c, --createdBy [createdBy]',
  //   description: 'The user who created the task',
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
  //   description: 'The date when the task was created',
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
    description: 'The user who last updated the task',
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
    description: 'The date when the task was last updated',
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
    description: 'The user who started the task',
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
    description: 'The date when the task was started',
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
    description: 'The start date of the task',
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
    description: 'The end date of the task',
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
    description: 'The user who completed the task',
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
    description: 'The date when the task was completed',
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
    flags: '-c, --context [context]',
    description: 'The context of the task',
    // defaultValue: 'default-context',
  })
  parseContext(val: string): string {
    return val;
  }

  // @Option({
  //   flags: '-d, --description [description]',
  //   description: 'The description of the task',
  //   // defaultValue: 'default-description',
  // })
  // parseDescription(val: string): string {
  //   return val;
  // }

  @Option({
    flags: '-s, --summary [summary]',
    description: 'The summary of the task',
    // defaultValue: 'default-summary',
  })
  parseSummary(val: string): string {
    return val;
  }

  @Option({
    flags: '-d, --details [details]',
    description: 'The details of the task',
    // defaultValue: 'default-details',
  })
  parseDetails(val: string): string {
    return val;
  }

  @Option({
    flags: '-u, --userStories [userStories]',
    description: 'The user stories of the task',
    // defaultValue: 'default-user-stories',
  })
  parseUserStories(val: string): string {
    const res = validateUserStory(val);
    if (res === true) {
      return val;
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-a, --acceptanceCriteria [acceptanceCriteria]',
    description: 'The acceptance criteria of the task',
    // defaultValue: 'default-acceptance-criteria',
  })
  parseAcceptanceCriteria(val: string): string {
    const res = validateAcceptanceCriterion(val);
    if (res === true) {
      return val;
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-d, --definitionOfDone [definitionOfDone]',
    description: 'The definition of done of the task',
    // defaultValue: 'default-definition-of-done',
  })
  parseDefinitionOfDone(val: string): string {
    const res = validateDefinitionOfDone(val);
    if (res === true) {
      return val;
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-l, --links [links]',
    description: 'The links of the task',
    // defaultValue: 'default-links',
  })
  parseLinks(val: string): NameUrlDTO[] {
    const items: NameUrlDTO[] = convertStringToNameUrlArray(val);
    if (!isValidNameUrlArray(items)) {
      throw new Error(
        CreateProjectCommand.name + ': Invalid name, url in the list: ' + val,
      );
    }
    return items;
  }

  @Option({
    flags: '-u, --url [url]',
    description: 'The url of the task',
    // defaultValue: 'default-url',
  })
  parseUrl(val: string): NameUrlDTO {
    const res = validateNameUrl(val);
    if (res === true) {
      return convertStringToNameUrlDTO(val);
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-m, --messages [messages]',
    description: 'The messages of the task',
    // defaultValue: 'default-messages',
  })
  parseMessages(val: string): IdUuidDTO[] {
    const items: IdUuidDTO[] = convertStringToIdUuidArray(val);
    if (!isValidIdUuidArray(items)) {
      throw new Error(
        CreateProjectCommand.name +
          ': Invalid user ID, UUID in the list: ' +
          val,
      );
    }
    return items;
  }
}

// npm run build
// nestjs build
// node ./dist/cmd.main task update --help
// node ./dist/cmd.main task update --uuid 3 --id ABC-123 --name "Task 1" --createdBy john.doe --createdAt "2021-01-01T00:00:00.000Z" --updatedBy john.doe --updatedAt "2021-01-01T00:00:00.000Z" --startedBy john.doe --startedAt "2021-01-01T00:00:00.000Z" --startDate "2021-01-01T00:00:00.000Z" --endDate "2021-01-01T00:00:00.000Z" --completedBy john.doe --completedAt "2021-01-01T00:00:00.000Z"
