import {
  CommandRunner,
  InquirerService,
  Option,
  SubCommand,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { TaskService } from '../task.service';
import { CreateTaskRequestDTO } from '../dto/create-task-request.dto';
import { TaskCommandOptionsDTO } from './dto/task-command-options.dto';
import { TaskMetadataCommandOptionsDTO } from './dto/task-metadata-command-options.dto';
import { TaskContentCommandOptionsDTO } from './dto/task-content-command-options.dto';
import { UuidAnswerDTO } from '../../common/command/dto/uuid-answer.dto';
import { IdAnswerDTO } from '../../common/command/dto/id-answer.dto';
import { NameAnswerDTO } from '../../common/command/dto/name-answer.dto';
import { getCommonDateCommandOptionsDTO } from '../../common/command/utils/common-date-command.utils';

@Injectable()
@SubCommand({
  name: 'create',
  description: 'A command to create a task',
})
export class CreateTaskCommand extends CommandRunner {
  private readonly logger = new Logger(CreateTaskCommand.name);
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
    this.logger.debug('>>> Creating task');
    // this.logger.debug(passedParams);
    // this.logger.debug(options);

    const taskMetadataCommandOptions: TaskMetadataCommandOptionsDTO = {
      ID: options?.id ?? '',
      name: options?.name ?? '',
      taskType: options?.taskType ?? undefined,
      assignee: options?.assignee ?? undefined,
      status: options?.status ?? undefined,
      priority: options?.priority ?? undefined,
      risk: options?.risk ?? undefined,
      tags: options?.tags ?? undefined,
      dates: options?.dates ?? undefined,
      storyPoint: options?.storyPoint ?? undefined,
      sprints: options?.sprints ?? undefined,
      relations: options?.relations ?? undefined,
    };
    const TaskContentCommandOptions: TaskContentCommandOptionsDTO = {
      description: options?.description ?? undefined,
      documentationLinks: options?.documentationLinks ?? undefined,
      comments: options?.comments ?? undefined,
    };
    const taskCommandOptions: TaskCommandOptionsDTO = {
      UUID: options?.uuid ?? '00000000-0000-0000-0000-000000000000',
      metadata: taskMetadataCommandOptions,
      content: TaskContentCommandOptions,
      // ...options,
    };

    // while (!taskCommandOptions.UUID) {
    //   taskCommandOptions.UUID = (
    //     await this.inquirer.ask<UuidAnswerDTO>('uuid-questions', options)
    //   ).UUID;
    // }

    while (!taskCommandOptions.metadata.ID) {
      taskCommandOptions.metadata.ID = (
        await this.inquirer.ask<IdAnswerDTO>('id-questions', options)
      ).ID;
    }

    while (!taskCommandOptions.metadata.name) {
      taskCommandOptions.metadata.name = (
        await this.inquirer.ask<NameAnswerDTO>('name-questions', options)
      ).name;
    }

    // ********************************************************************

    taskCommandOptions.metadata.dates = await getCommonDateCommandOptionsDTO(
      // this.configService,
      this.inquirer,
      options,
    );

    // ********************************************************************

    console.log(taskCommandOptions);

    // ********************************************************************

    const createTaskRequestDTO: CreateTaskRequestDTO = {
      UUID: taskCommandOptions.UUID,
      metadata: new TaskMetadataCommandOptionsDTO(
        taskCommandOptions.metadata.ID,
        taskCommandOptions.metadata.name,
        taskCommandOptions.metadata.taskType,
        taskCommandOptions.metadata.assignee,
        taskCommandOptions.metadata.status,
        taskCommandOptions.metadata.priority,
        taskCommandOptions.metadata.risk,
        taskCommandOptions.metadata.tags,
        taskCommandOptions.metadata.dates,
        taskCommandOptions.metadata.storyPoint,
        taskCommandOptions.metadata.sprints ?? [],
        taskCommandOptions.metadata.relations ?? [],
      ),
      content: new TaskContentCommandOptionsDTO(
        taskCommandOptions.content.description,
        taskCommandOptions.content.documentationLinks ?? [],
        taskCommandOptions.content.comments ?? [],
      ),
    };

    console.log(createTaskRequestDTO);
    this.taskService.createTask(createTaskRequestDTO);
  }

  // @Option({
  //   flags: '-u, --uuid [UUID]',
  //   description: 'The UUID of the task',
  //   // defaultValue: '00000000-0000-0000-0000-000000000000',
  // })
  // parseUUID(val: string): string {
  //   return val;
  // }

  @Option({
    flags: '-i, --id [id]',
    description: 'The id of the task',
    // defaultValue: 'PPP-0000',
  })
  parseId(val: string): string {
    return val;
  }

  @Option({
    flags: '-n, --name [name]',
    description: 'The name of the task',
    // defaultValue: 'default-task-name',
  })
  parseName(val: string): string {
    return val;
  }

  // ********************************************************************

  @Option({
    flags: '-c, --createdBy [createdBy]',
    description: 'The user who created the task',
    // defaultValue: 'default-created-by',
  })
  parseCreatedBy(val: string): string {
    return val;
  }

  @Option({
    flags: '-d, --createdDate [createdDate]',
    description: 'The date when the task was created',
    // defaultValue: 'default-created-date',
  })
  parseCreatedDate(val: string): string {
    return val;
  }

  @Option({
    flags: '-b, --updatedBy [updatedBy]',
    description: 'The user who last updated the task',
    // defaultValue: 'default-updated-by',
  })
  parseUpdatedBy(val: string): string {
    return val;
  }

  @Option({
    flags: '-e, --updatedDate [updatedDate]',
    description: 'The date when the task was last updated',
    // defaultValue: 'default-updated-date',
  })
  parseUpdatedDate(val: string): string {
    return val;
  }

  @Option({
    flags: '-s, --startedBy [startedBy]',
    description: 'The user who started the task',
    // defaultValue: 'default-started-by',
  })
  parseStartedBy(val: string): string {
    return val;
  }

  @Option({
    flags: '-t, --startedDate [startedDate]',
    description: 'The date when the task was started',
    // defaultValue: 'default-started-date',
  })
  parseStartedDate(val: string): string {
    return val;
  }

  @Option({
    flags: '-a, --startDate [startDate]',
    description: 'The start date of the task',
    // defaultValue: 'default-start-date',
  })
  parseStartDate(val: string): string {
    return val;
  }

  @Option({
    flags: '-z, --endDate [endDate]',
    description: 'The end date of the task',
    // defaultValue: 'default-end-date',
  })
  parseEndDate(val: string): string {
    return val;
  }

  @Option({
    flags: '-m, --completedBy [completedBy]',
    description: 'The user who completed the task',
    // defaultValue: 'default-completed-by',
  })
  parseCompletedBy(val: string): string {
    return val;
  }

  @Option({
    flags: '-p, --completedDate [completedDate]',
    description: 'The date when the task was completed',
    // defaultValue: 'default-completed-date',
  })
  parseCompletedDate(val: string): string {
    return val;
  }

  // ********************************************************************
}

// npm run build
// nestjs build
// node ./dist/cmd.main task create --help
// node ./dist/cmd.main task create
