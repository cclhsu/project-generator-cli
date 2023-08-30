import { Command, CommandRunner, InquirerService } from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '../../../config/config.service';
import { IterationService } from '../iteration.service';
import { ListIterationsCommand } from './list-iterations.command';
import { CreateIterationCommand } from './create-iteration.command';
import { DeleteIterationCommand } from './delete-iteration.command';
import { GetIterationCommand } from './get-iteration.command';
import { UpdateIterationCommand } from './update-iteration.command';
import { UpdateIterationMetadataCommand } from './update-iteration-metadata.command';
import { UpdateIterationContentCommand } from './update-iteration-content.command';
import { ListIterationIdsAndUUIDsCommand } from './list-iteration-ids-uuids.command';
import { ListIterationIdsUUIDsStatusesCommand } from './list-iteration-ids-uuids-statuses.command';

@Injectable()
@Command({
  name: 'iteration',
  description: 'A set of commands for managing iteration',
  arguments: '<action> [options]',
  subCommands: [
    ListIterationsCommand,
    GetIterationCommand,
    CreateIterationCommand,
    UpdateIterationCommand,
    DeleteIterationCommand,
    UpdateIterationMetadataCommand,
    UpdateIterationContentCommand,
    ListIterationIdsAndUUIDsCommand,
    ListIterationIdsUUIDsStatusesCommand,
  ],
})
export class IterationCommand extends CommandRunner {
  private readonly logger = new Logger(IterationCommand.name);
  constructor(
    private readonly inquirer: InquirerService,
    private readonly configService: ConfigService,
    private readonly iterationService: IterationService,
  ) {
    super();
  }

  async run(
    passedParams: string[],
    options?: Record<string, any> | undefined,
  ): Promise<void> {
    // throw new Error('Method not implemented.');
    this.logger.debug('>>> Running iteration command');
  }
}

// npm run build
// nestjs build
// node ./dist/cmd.main iteration --help
// node ./dist/cmd.main iteration

// node ./dist/cmd.main iteration -s src -g github -l iteration -t library -e team -u user -n project -m module
