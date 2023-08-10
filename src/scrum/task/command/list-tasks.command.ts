import {
  CommandRunner,
  InquirerService,
  Option,
  SubCommand,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { TaskService } from '../task.service';
import { TaskResponseDTO } from '../dto/task-response.dto';
import { instanceToPlain } from 'class-transformer';

@Injectable()
@SubCommand({
  name: 'list',
  description: 'A command to list tasks',
  options: { isDefault: true },
})
export class ListTasksCommand extends CommandRunner {
  private readonly logger = new Logger(ListTasksCommand.name);
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
    this.logger.debug('>>> Listing task');
    // this.logger.debug(passedParams);
    // this.logger.debug(options);

    const task: TaskResponseDTO[] = await this.taskService.listTasks();
    console.log(JSON.stringify(task, null, 2));
  }
}

// npm run build
// nestjs build
// node ./dist/cmd.main task list --help
// node ./dist/cmd.main task list
