import { Command, CommandRunner, InquirerService } from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { UserService } from '../user.service';
import { ListUsersCommand } from './list-users.command';
import { GetUserCommand } from './get-user.command';
import { CreateUserCommand } from './create-user.command';
import { UpdateUserCommand } from './update-user.command';
import { DeleteUserCommand } from './delete-user.command';

@Injectable()
@Command({
  name: 'user',
  description: 'A set of commands for managing user',
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
  constructor(
    private readonly inquirer: InquirerService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
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

// node ./dist/cmd.main user -s src -g github -l user -t library -e user -u user -n user -m module
