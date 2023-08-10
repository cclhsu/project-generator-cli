import {
  Command,
  CommandRunner,
  InquirerService,
  Option,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { ListUsersCommand } from './list-users.command';
import { GetUserCommand } from './get-user.command';
import { CreateUserCommand } from './create-user.command';
import { UpdateUserCommand } from './update-user.command';
import { DeleteUserCommand } from './delete-user.command';
// import { UserService } from 'src/user/user.service';

@Injectable()
@Command({
  name: 'user',
  description: 'A set of commands for managing users',
  arguments: '<action> [options]',
  subCommands: [
    ListUsersCommand,
    GetUserCommand,
    CreateUserCommand,
    UpdateUserCommand,
    DeleteUserCommand,
  ],
})
export class UserCommand extends CommandRunner {
  private readonly logger = new Logger(UserCommand.name);
  constructor(private readonly inquirer: InquirerService) {
    super();
  }

  async run(
    passedParams: string[],
    options?: Record<string, any> | undefined,
  ): Promise<void> {
    // throw new Error('Method not implemented.');
    this.logger.debug('>>> Running user command');
  }
}

// npm run build
// nestjs build
// node ./dist/cmd.main user --help
// node ./dist/cmd.main user

// node ./dist/cmd.main user --username john.doe --email john.doe@mail.com --phone 1234567890
