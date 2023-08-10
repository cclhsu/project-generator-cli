import {
  CommandRunner,
  InquirerService,
  Option,
  SubCommand,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { UserService } from '../user.service';
import { UserResponseDTO } from '../dto/user-response.dto';
import { instanceToPlain } from 'class-transformer';

@Injectable()
@SubCommand({
  name: 'list',
  description: 'A command to list users',
  options: { isDefault: true },
})
export class ListUsersCommand extends CommandRunner {
  private readonly logger = new Logger(ListUsersCommand.name);
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
    // this.logger.debug(passedParams);
    // this.logger.debug(options);

    const user: UserResponseDTO[] = await this.userService.listUsers();
    console.log(JSON.stringify(user, null, 2));
  }
}

// npm run build
// nestjs build
// node ./dist/cmd.main user list --help
// node ./dist/cmd.main user list
