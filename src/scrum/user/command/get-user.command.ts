import {
  CommandRunner,
  InquirerService,
  Option,
  SubCommand,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { UserService } from '../user.service';
import { UserCommandOptionsDTO } from './dto/user-command-options.dto';
import { GetUserCommandOptionsDTO } from './dto/get-user-command-options.dto';
import { UuidAnswerDTO } from '../../common/command/dto/uuid-answer.dto';

@Injectable()
@SubCommand({
  name: 'get',
  description: 'A command to get a user',
})
export class GetUserCommand extends CommandRunner {
  private readonly logger = new Logger(GetUserCommand.name);
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
    this.logger.debug('>>> Getting user');
    // this.logger.debug(passedParams);
    // this.logger.debug(options);

    const userCommandOptions: GetUserCommandOptionsDTO = {
      UUID: options?.uuid ?? '00000000-0000-0000-0000-000000000000',
      // metadata: null,
      // content: null,
      // ...options,
    };

    while (!userCommandOptions.UUID) {
      userCommandOptions.UUID = (
        await this.inquirer.ask<UuidAnswerDTO>('uuid-questions', options)
      ).UUID;
    }

    this.displayResults(userCommandOptions.UUID ?? 'N/A');

    const user: UserCommandOptionsDTO = await this.userService.getUser(
      userCommandOptions.UUID,
    );
    console.log(JSON.stringify(user, null, 2));
  }

  displayResults(UUID: string): void {
    console.log(`UUID: ${UUID}`);
  }

  @Option({
    flags: '-u, --uuid [UUID]',
    description: 'The UUID of the user',
    // defaultValue: '00000000-0000-0000-0000-000000000000',
  })
  parseUUID(val: string): string {
    return val;
  }
}

// npm run build
// nestjs build
// node ./dist/cmd.main user get --help
// node ./dist/cmd.main user get --uuid 00000000-0000-0000-0000-000000000001
