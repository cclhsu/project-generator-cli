import {
  CommandRunner,
  InquirerService,
  SubCommand,
  Option,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { UserService } from '../user.service';
import { CreateUserCommandOptionsDTO } from './dto/create-user-command-options.dto';
import { UsernameAnswerDTO } from './dto/username-answer.dto';
import { EmailAnswerDTO } from './dto/email-answer.dto';
import { PhoneAnswerDTO } from './dto/phone-answer.dto';
// import { PasswordAnswerDTO } from './dto/password-answer.dto';
import { CreateUserRequestDTO } from '../dto/create-user-request.dto';

@Injectable()
@SubCommand({
  name: 'create',
  description: 'A command to create a user',
})
export class CreateUserCommand extends CommandRunner {
  private readonly logger = new Logger(CreateUserCommand.name);
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
    this.logger.debug('>>> Creating user');
    // this.logger.debug(passedParams);
    // this.logger.debug(options);

    const userCommandOptions: CreateUserCommandOptionsDTO = {
      ...options,
    };

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
      userCommandOptions.username ?? 'N/A',
      userCommandOptions.email ?? 'N/A',
      userCommandOptions.phone ?? 'N/A',
    );

    const createUserRequestDTO: CreateUserRequestDTO = {
      UUID: '00000000-0000-0000-0000-000000000000',
      username: userCommandOptions.username,
      email: userCommandOptions.email,
      phone: userCommandOptions.phone,
      password: 'changeme',
    };

    this.userService.createUser(createUserRequestDTO);
  }

  displayResults(username: string, email: string, phone: string): void {
    console.log(`Username: ${username}`);
    console.log(`Email: ${email}`);
    console.log(`Phone Number: ${phone}`);
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
// node ./dist/cmd.main user create --help
// node ./dist/cmd.main user create --username john.doe --email john.doe@mail.com --phone 0912345678
