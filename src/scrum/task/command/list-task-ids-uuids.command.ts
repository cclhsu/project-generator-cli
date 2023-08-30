import {
  CommandRunner,
  InquirerService,
  Option,
  SubCommand,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { TaskService } from '../task.service';
import { TaskIdUuidDTO } from '../dto/task-id-uuid.dto';
import { instanceToPlain } from 'class-transformer';

@Injectable()
@SubCommand({
  name: 'list-task-ids-uuids',
  description: 'A command to list tasks',
  options: { isDefault: true },
})
export class ListTaskIdsAndUUIDsCommand extends CommandRunner {
  private readonly logger = new Logger(ListTaskIdsAndUUIDsCommand.name);
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
    // this.logger.verbose('passedParam: ' + JSON.stringify(passedParams, null, 2));
    // this.logger.verbose('options: ' + JSON.stringify(options, null, 2));

    try {
      const task: TaskIdUuidDTO[] =
        await this.taskService.listTaskIdsAndUUIDs();
      console.log(JSON.stringify(task, null, 2));
    } catch (error: any) {
      this.logger.error(error.message);
      this.logger.debug(error.stack);
    }
  }
}

// npm run build
// nestjs build
// node ./dist/cmd.main task list --help
// node ./dist/cmd.main task list
