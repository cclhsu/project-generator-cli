import {
  CommandRunner,
  InquirerService,
  SubCommand,
  Option,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { UserService } from '../user.service';
import { UpdateUserCommandOptionsDTO } from './dto/update-user-command-options.dto';
import { UuidAnswerDTO } from '../../common/command/dto/uuid-answer.dto';
import { UsernameAnswerDTO } from './dto/username-answer.dto';
import { EmailAnswerDTO } from './dto/email-answer.dto';
import { PhoneAnswerDTO } from './dto/phone-answer.dto';
// import { PasswordAnswerDTO } from './dto/password-answer.dto';
import { UpdateUserRequestDTO } from '../dto/update-user-request.dto';

@Injectable()
@SubCommand({
  name: 'update',
  description: 'A command to update a user',
})
export class UpdateUserCommand extends CommandRunner {
  private readonly logger = new Logger(UpdateUserCommand.name);
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
    this.logger.debug('>>> Updating user');
    // this.logger.debug(passedParams);
    // this.logger.debug(options);

    const userCommandOptions: UpdateUserCommandOptionsDTO = {
      UUID: options?.UUID ?? '00000000-0000-0000-0000-000000000000',
      username: options?.username ?? 'N/A',
      email: options?.email ?? 'N/A',
      phone: options?.phone ?? 'N/A',
      // ...options,
    };

    if (!userCommandOptions.UUID) {
      userCommandOptions.UUID = (
        await this.inquirer.ask<UuidAnswerDTO>('uuid-questions', options)
      ).UUID;
    }

    if (!userCommandOptions.username) {
      userCommandOptions.username = (
        await this.inquirer.ask<UsernameAnswerDTO>(
          'username-questions',
          options,
        )
      ).username;
    }

    if (!userCommandOptions.email) {
      userCommandOptions.email = (
        await this.inquirer.ask<EmailAnswerDTO>('email-questions', options)
      ).email;
    }

    if (!userCommandOptions.phone) {
      userCommandOptions.phone = (
        await this.inquirer.ask<PhoneAnswerDTO>('phone-questions', options)
      ).phone;
    }

    // if (!userCommandOptions.password) {
    //   userCommandOptions.password = (
    //     await this.inquirer.ask<PasswordAnswerDTO>(
    //       'password-questions',
    //       options,
    //     )
    //   ).password;
    // }

    this.displayResults(
      userCommandOptions.UUID ?? 'N/A',
      userCommandOptions.username ?? 'N/A',
      userCommandOptions.email ?? 'N/A',
      userCommandOptions.phone ?? 'N/A',
    );

    const updateUserRequestDTO: UpdateUserRequestDTO = {
      username: userCommandOptions.username,
      email: userCommandOptions.email,
      phone: userCommandOptions.phone,
      password: 'keepPassword',
    };

    this.userService.updateUser(userCommandOptions.UUID, updateUserRequestDTO);
  }

  displayResults(
    UUID: string,
    username: string,
    email: string,
    phone: string,
  ): void {
    console.log(`UUID: ${UUID}`);
    console.log(`Username: ${username}`);
    console.log(`Email: ${email}`);
    console.log(`Phone Number: ${phone}`);
  }

  @Option({
    flags: '-u, --uuid [UUID]',
    description: 'The UUID of the team',
    // defaultValue: '00000000-0000-0000-0000-000000000000',
  })
  parseUUID(val: string): string {
    return val;
  }

  @Option({
    flags: '-n, --username [username]',
    description: 'Your name',
  })
  parseName(val: string): string {
    return val;
  }

  // @Option({
  //   flags: '-p, --password [password]',
  //   description: 'Your password',
  // })
  // parsePassword(val: string): string {
  //   return val;
  // }

  @Option({
    flags: '-e, --email [email]',
    description: 'Your email',
  })
  parseEmail(val: string): string {
    return val;
  }

  @Option({
    flags: '-p, --phone [phone]',
    description: 'Your phone number',
  })
  parsePhone(val: string): string {
    return val;
  }
}

// npm run build
// nestjs build
// node ./dist/cmd.main user update --help
// node ./dist/cmd.main user update --uuid 00000000-0000-0000-0000-000000000001 --username john.doe --email john.doe@mail.com --phone 0912345678
