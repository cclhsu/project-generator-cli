import {
  CommandRunner,
  InquirerService,
  Option,
  SubCommand,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { UserService } from '../user.service';
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
      UUID: options?.UUID ?? '00000000-0000-0000-0000-000000000000',
    };

    if (!userCommandOptions.UUID) {
      userCommandOptions.UUID = (
        await this.inquirer.ask<UuidAnswerDTO>('uuid-questions', options)
      ).UUID;
    }

    this.displayResults(userCommandOptions.UUID ?? 'N/A');

    this.userService.getUser(userCommandOptions.UUID);
  }

  displayResults(UUID: string): void {
    console.log(`UUID: ${UUID}`);
  }

  @Option({
    flags: '-u, --uuid [UUID]',
    description: 'The UUID of the team',
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
