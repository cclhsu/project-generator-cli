import {
  CommandRunner,
  InquirerService,
  Option,
  SubCommand,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { UserService } from '../user.service';
import { UserDTO } from '../dto/user.dto';
import { UuidAnswerDTO } from '../../../common/command/dto';
import { validateUuid } from '../../../common/command/validation';
import { GetUserByUuidRequestDTO } from '../dto';

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
    // this.logger.verbose('passedParam: ' + JSON.stringify(passedParams, null, 2));
    // this.logger.verbose('options: ' + JSON.stringify(options, null, 2));

    const user: GetUserByUuidRequestDTO = {
      UUID: options?.uuid ?? '00000000-0000-0000-0000-000000000000',
      // metadata: null,
      // content: null,
      // ...options,
    };

    // ********************************************************************

    while (!user.UUID) {
      user.UUID = (
        await this.inquirer.ask<UuidAnswerDTO>('uuid-questions', options)
      ).UUID;
    }

    this.logger.verbose(`config: ${JSON.stringify(user.UUID, null, 2)}`);

    try {
      const userDTO: UserDTO = await this.userService.getUser(user.UUID);
      console.log(JSON.stringify(userDTO, null, 2));
    } catch (error: any) {
      this.logger.error(error.message);
      this.logger.debug(error.stack);
    }
  }

  @Option({
    flags: '-u, --uuid [UUID]',
    description: 'The UUID of the user',
    // defaultValue: '00000000-0000-0000-0000-000000000000',
  })
  parseUUID(val: string): string {
    const res = validateUuid(val);
    if (res === true) {
      return val;
    }
    throw new Error(res + ': ' + val + '\n');
  }
}

// npm run build
// nestjs build
// node ./dist/cmd.main user get --help
// node ./dist/cmd.main user get --uuid 00000000-0000-0000-0000-000000000001
