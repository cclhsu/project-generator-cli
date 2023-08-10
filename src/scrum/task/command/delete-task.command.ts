import {
  CommandRunner,
  InquirerService,
  Option,
  SubCommand,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { TaskService } from '../task.service';
import { TaskCommandOptionsDTO } from './dto/task-command-options.dto';
import { DeleteTaskCommandOptionsDTO } from './dto/delete-task-command-options.dto';
import { UuidAnswerDTO } from '../../common/command/dto/uuid-answer.dto';

@Injectable()
@SubCommand({
  name: 'delete',
  description: 'A command to delete a task',
})
export class DeleteTaskCommand extends CommandRunner {
  private readonly logger = new Logger(DeleteTaskCommand.name);
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
    this.logger.debug('>>> Deleting task');
    // this.logger.debug(passedParams);
    // this.logger.debug(options);

    const taskCommandOptions: DeleteTaskCommandOptionsDTO = {
      UUID: options?.uuid ?? '00000000-0000-0000-0000-000000000000',
      // metadata: null,
      // content: null,
      // ...options,
    };

    while (!taskCommandOptions.UUID) {
      taskCommandOptions.UUID = (
        await this.inquirer.ask<UuidAnswerDTO>('uuid-questions', options)
      ).UUID;
    }

    this.displayResults(taskCommandOptions.UUID ?? 'N/A');

    const task: TaskCommandOptionsDTO = await this.taskService.deleteTask(
      taskCommandOptions.UUID,
    );
    console.log(JSON.stringify(task, null, 2));
  }

  displayResults(UUID: string): void {
    console.log(`UUID: ${UUID}`);
  }

  @Option({
    flags: '-u, --uuid [UUID]',
    description: 'The UUID of the task',
    // defaultValue: '00000000-0000-0000-0000-000000000000',
  })
  parseUUID(val: string): string {
    return val;
  }
}

// npm run build
// nestjs build
// node ./dist/cmd.main task delete --help
// node ./dist/cmd.main task delete --uuid 00000000-0000-0000-0000-000000000001
