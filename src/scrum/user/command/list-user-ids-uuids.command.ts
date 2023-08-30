import {
  CommandRunner,
  InquirerService,
  Option,
  SubCommand,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { UserService } from '../user.service';
import { UserIdUuidDTO } from '../dto/user-id-uuid.dto';
import { instanceToPlain } from 'class-transformer';

@Injectable()
@SubCommand({
  name: 'list-user-ids-uuids',
  description: 'A command to list users',
  options: { isDefault: true },
})
export class ListUserIdsAndUUIDsCommand extends CommandRunner {
  private readonly logger = new Logger(ListUserIdsAndUUIDsCommand.name);
  constructor(
    private readonly inquirer: InquirerService,
    private readonly userService: UserService,
  ) {
    super();
  }

  async run(
    passedParams: string[],
    options?: Record<string, any> | undefined,
  ): Promise<void> {
    this.logger.debug('>>> Listing user');
    // this.logger.verbose('passedParam: ' + JSON.stringify(passedParams, null, 2));
    // this.logger.verbose('options: ' + JSON.stringify(options, null, 2));

    try {
      const user: UserIdUuidDTO[] =
        await this.userService.listUserIdsAndUUIDs();
      console.log(JSON.stringify(user, null, 2));
    } catch (error: any) {
      this.logger.error(error.message);
      this.logger.debug(error.stack);
    }
  }
}

// npm run build
// nestjs build
// node ./dist/cmd.main user list --help
// node ./dist/cmd.main user list
