import {
  CommandRunner,
  InquirerService,
  Option,
  SubCommand,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { IterationService } from '../iteration.service';
import { IterationIdUuidDTO } from '../dto/iteration-id-uuid.dto';
import { instanceToPlain } from 'class-transformer';

@Injectable()
@SubCommand({
  name: 'list-iteration-ids-uuids',
  description: 'A command to list iterations',
  options: { isDefault: true },
})
export class ListIterationIdsAndUUIDsCommand extends CommandRunner {
  private readonly logger = new Logger(ListIterationIdsAndUUIDsCommand.name);
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
    this.logger.debug('>>> Listing iteration');
    // this.logger.verbose('passedParam: ' + JSON.stringify(passedParams, null, 2));
    // this.logger.verbose('options: ' + JSON.stringify(options, null, 2));

    try {
      const iteration: IterationIdUuidDTO[] =
        await this.iterationService.listIterationIdsAndUUIDs();
      console.log(JSON.stringify(iteration, null, 2));
    } catch (error: any) {
      this.logger.error(error.message);
      this.logger.debug(error.stack);
    }
  }
}

// npm run build
// nestjs build
// node ./dist/cmd.main iteration list --help
// node ./dist/cmd.main iteration list
