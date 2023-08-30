import { Command, CommandRunner, InquirerService } from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '../../../config/config.service';
import { TaskService } from '../task.service';
import { ListTasksCommand } from './list-tasks.command';
import { GetTaskCommand } from './get-task.command';
import { CreateTaskCommand } from './create-task.command';
import { UpdateTaskCommand } from './update-task.command';
import { DeleteTaskCommand } from './delete-task.command';
import { UpdateTaskMetadataCommand } from './update-task-metadata.command';
import { UpdateTaskContentCommand } from './update-task-content.command';
import { ListTaskIdsAndUUIDsCommand } from './list-task-ids-uuids.command';
import { ListTaskIdsUUIDsStatusesCommand } from './list-task-ids-uuids-statuses.command';

@Injectable()
@Command({
  name: 'task',
  description: 'A set of commands for managing task',
  arguments: '<action> [options]',
  subCommands: [
    ListTasksCommand,
    GetTaskCommand,
    CreateTaskCommand,
    UpdateTaskCommand,
    DeleteTaskCommand,
    UpdateTaskMetadataCommand,
    UpdateTaskContentCommand,
    ListTaskIdsAndUUIDsCommand,
    ListTaskIdsUUIDsStatusesCommand,
  ],
})
export class TaskCommand extends CommandRunner {
  private readonly logger = new Logger(TaskCommand.name);
  constructor(
    private readonly inquirer: InquirerService,
    private readonly configService: ConfigService,
    private readonly taskService: TaskService,
  ) {
    super();
  }

  async run(
    passedParams: string[],
    options?: Record<string, any> | undefined,
  ): Promise<void> {
    // throw new Error('Method not implemented.');
    this.logger.debug('>>> Running task command');
  }
}

// npm run build
// nestjs build
// node ./dist/cmd.main task --help
// node ./dist/cmd.main task

// node ./dist/cmd.main task -s src -g github -l task -t library -e task -u user -n task -m module
