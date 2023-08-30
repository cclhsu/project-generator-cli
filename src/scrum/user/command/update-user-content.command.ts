import {
  CommandRunner,
  InquirerService,
  Option,
  SubCommand,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { UserService } from '../user.service';
import {
  UpdateUserContentRequestDTO,
  UserContentDTO,
  UserMetadataDTO,
} from '../dto';
import { getCommonDateDTO } from '../../../common/command/utils/common-date-command.utils';
import { validate } from 'class-validator';
import {
  EmailAnswerDTO,
  UserFirstNameAnswerDTO,
  IdAnswerDTO,
  UserLastNameAnswerDTO,
  UserFullNameAnswerDTO,
  PasswordAnswerDTO,
  PhoneAnswerDTO,
  ProjectRolesAnswerDTO,
  ScrumRolesAnswerDTO,
  UserIdAnswerDTO,
  UuidAnswerDTO,
} from '../../../common/command/dto';
import {
  validateCompletedAt,
  validateCreatedAt,
  validateEmail,
  validateEndDate,
  validatePhone,
  validateProjectRoles,
  validateScrumRoles,
  validateStartDate,
  validateStartedAt,
  validateUuid,
  validateUpdatedAt,
  validateUserId,
} from '../../../common/command/validation';
import {
  UPDATE_ACTION_TYPE,
  convertStringToProjectRoles,
  convertStringToScrumRoles,
} from '../../../common/constant';
import { UserDTO } from '../dto';

@Injectable()
@SubCommand({
  name: 'update-content',
  description: 'A command to update a user content',
})
export class UpdateUserContentCommand extends CommandRunner {
  private readonly logger = new Logger(UpdateUserContentCommand.name);
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
    // this.logger.verbose('passedParam: ' + JSON.stringify(passedParams, null, 2));
    // this.logger.verbose('options: ' + JSON.stringify(options, null, 2));

    const userMetadata: UserMetadataDTO = {
      name: options?.name ?? '',
      dates: options?.dates ?? undefined,
    };
    const UserContent: UserContentDTO = {
      email: options?.email ?? '',
      phone: options?.phone ?? '',
      lastName: options?.lastName ?? '',
      firstName: options?.firstName ?? '',
      projectRoles: options?.projectRoles ?? [],
      scrumRoles: options?.scrumRoles ?? [],
      password: options?.password ?? '',
    };
    const user: UserDTO = {
      ID: options?.id ?? '',
      UUID: options?.uuid ?? '00000000-0000-0000-0000-000000000000',
      metadata: userMetadata,
      content: UserContent,
      // ...options,
    };

    // ********************************************************************

    // if (!user.ID) {
    //   user.ID = (
    //     await this.inquirer.ask<UserIdAnswerDTO>('user-id-questions', options)
    //   ).ID;
    // }

    while (!user.UUID) {
      user.UUID = (
        await this.inquirer.ask<UuidAnswerDTO>('uuid-questions', options)
      ).UUID;
    }

    // ********************************************************************
    // Update Metadata

    // if (!user.metadata.name) {
    //   user.metadata.name = (
    //     await this.inquirer.ask<UserFullNameAnswerDTO>('user-full-name-questions', options)
    //   ).fullName;
    // }

    // ********************************************************************
    // Update Dates

    user.metadata.dates = await getCommonDateDTO(
      // this.configService,
      this.inquirer,
      options,
      UPDATE_ACTION_TYPE,
    );

    // ********************************************************************
    // Update Content

    this.logger.verbose(JSON.stringify(user, null, 2));

    while (!user.content.email) {
      user.content.email = (
        await this.inquirer.ask<EmailAnswerDTO>('email-questions', options)
      ).email;
    }

    while (!user.content.phone) {
      user.content.phone = (
        await this.inquirer.ask<PhoneAnswerDTO>('phone-questions', options)
      ).phone;
    }

    while (!user.content.lastName) {
      user.content.lastName = (
        await this.inquirer.ask<UserLastNameAnswerDTO>(
          'last-name-questions',
          options,
        )
      ).lastName;
    }

    while (!user.content.firstName) {
      user.content.firstName = (
        await this.inquirer.ask<UserFirstNameAnswerDTO>(
          'first-name-questions',
          options,
        )
      ).firstName;
    }

    while (!user.content.projectRoles) {
      user.content.projectRoles = (
        await this.inquirer.ask<ProjectRolesAnswerDTO>(
          'project-roles-questions',
          options,
        )
      ).projectRoles;
    }

    while (!user.content.scrumRoles) {
      user.content.scrumRoles = (
        await this.inquirer.ask<ScrumRolesAnswerDTO>(
          'scrum-roles-questions',
          options,
        )
      ).scrumRoles;
    }

    while (!user.content.password) {
      user.content.password = (
        await this.inquirer.ask<PasswordAnswerDTO>(
          'password-questions',
          options,
        )
      ).password;
    }

    // ********************************************************************

    const updateUserContentRequestDTO: UpdateUserContentRequestDTO = {
      // ID: user.ID,
      UUID: user.UUID,
      // metadata: new UserMetadataDTO(
      //   user.metadata.name,
      //   user.metadata.dates,
      // ),
      content: new UserContentDTO(
        user.content.email,
        user.content.phone,
        user.content.lastName,
        user.content.firstName,
        user.content.projectRoles,
        user.content.scrumRoles,
        user.content.password,
      ),
    };

    try {
      this.logger.verbose(JSON.stringify(updateUserContentRequestDTO, null, 2));
      await this.userService.updateUserContent(
        updateUserContentRequestDTO.UUID,
        updateUserContentRequestDTO,
      );
    } catch (error: any) {
      this.logger.error(error.message);
      this.logger.debug(error.stack);
    }
  }

  // @Option({
  //   flags: '-i, --id [id]',
  //   description: 'The id of the user',
  //   // defaultValue: 'PPP-0000',
  // })
  // parseId(val: string): string {
  //   const res = validateUserId(val);
  //   if (res === true) {
  //     return val;
  //   }
  //   throw new Error(res + ': ' + val + '\n');
  // }

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

  // ********************************************************************
  // Update Metadata

  // @Option({
  //   flags: '-n, --name [name]',
  //   description: 'The name of the user',
  //   // defaultValue: 'default-user-name',
  // })
  // parseName(val: string): string {
  //   return val;
  // }

  // ********************************************************************
  // Update Dates

  // @Option({
  //   flags: '-c, --createdBy [createdBy]',
  //   description: 'The user who created the user',
  //   // defaultValue: 'default-created-by',
  // })
  // parseCreatedBy(val: string): string {
  //   const res = validateUserId(val);
  //   if (res === true) {
  //     return val;
  //   }
  //   throw new Error(res + ': ' + val + '\n');
  // }

  // @Option({
  //   flags: '-d, --createdAt [createdAt]',
  //   description: 'The date when the user was created',
  //   // defaultValue: 'default-created-date',
  // })
  // parseCreatedAt(val: string): string {
  //   const res = validateCreatedAt(val);
  //   if (res === true) {
  //     return new Date(val).toISOString();
  //   }
  //   throw new Error(res + ': ' + val + '\n');
  // }

  @Option({
    flags: '-b, --updatedBy [updatedBy]',
    description: 'The user who last updated the user',
    // defaultValue: 'default-updated-by',
  })
  parseUpdatedBy(val: string): string {
    const res = validateUserId(val);
    if (res === true) {
      return val;
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-e, --updatedAt [updatedAt]',
    description: 'The date when the user was last updated',
    // defaultValue: 'default-updated-date',
  })
  parseUpdatedAt(val: string): string {
    const res = validateUpdatedAt(val);
    if (res === true) {
      return new Date(val).toISOString();
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-s, --startedBy [startedBy]',
    description: 'The user who started the user',
    // defaultValue: 'default-started-by',
  })
  parseStartedBy(val: string): string {
    const res = validateUserId(val);
    if (res === true) {
      return val;
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-t, --startedAt [startedAt]',
    description: 'The date when the user was started',
    // defaultValue: 'default-started-date',
  })
  parseStartedAt(val: string): string {
    const res = validateStartedAt(val);
    if (res === true) {
      return new Date(val).toISOString();
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-a, --startDate [startDate]',
    description: 'The start date of the user',
    // defaultValue: 'default-start-date',
  })
  parseStartDate(val: string): string {
    const res = validateStartDate(val);
    if (res === true) {
      return new Date(val).toISOString();
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-z, --endDate [endDate]',
    description: 'The end date of the user',
    // defaultValue: 'default-end-date',
  })
  parseEndDate(val: string): string {
    const res = validateEndDate(val);
    if (res === true) {
      return new Date(val).toISOString();
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-m, --completedBy [completedBy]',
    description: 'The user who completed the user',
    // defaultValue: 'default-completed-by',
  })
  parseCompletedBy(val: string): string {
    const res = validateUserId(val);
    if (res === true) {
      return val;
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-p, --completedAt [completedAt]',
    description: 'The date when the user was completed',
    // defaultValue: 'default-completed-date',
  })
  parseCompletedAt(val: string): string {
    const res = validateCompletedAt(val);
    if (res === true) {
      return new Date(val).toISOString();
    }
    throw new Error(res + ': ' + val + '\n');
  }

  // ********************************************************************
  // Update Content

  @Option({
    flags: '-e, --email [email]',
    description: 'The email of the user',
    // defaultValue: 'default-email',
  })
  parseEmail(val: string): string {
    const res = validateEmail(val);
    if (res === true) {
      return val;
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-p, --phone [phone]',
    description: 'The phone of the user',
    // defaultValue: 'default-phone',
  })
  parsePhone(val: string): string {
    const res = validatePhone(val);
    if (res === true) {
      return val;
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-l, --lastName [lastName]',
    description: 'The last name of the user',
    // defaultValue: 'default-last-name',
  })
  parseLastName(val: string): string {
    return val;
  }

  @Option({
    flags: '-f, --firstName [firstName]',
    description: 'The first name of the user',
    // defaultValue: 'default-first-name',
  })
  parseFirstName(val: string): string {
    return val;
  }

  @Option({
    flags: '-r, --projectRoles [projectRoles...]',
    description: 'The project roles of the user',
    // defaultValue: 'default-project-roles',
  })
  parseProjectRoles(val: string): string[] {
    const res = validateProjectRoles(val);
    if (res === true) {
      return convertStringToProjectRoles(val);
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-u, --scrumRoles [scrumRoles...]',
    description: 'The scrum roles of the user',
    // defaultValue: 'default-scrum-roles',
  })
  parseScrumRoles(val: string): string[] {
    const res = validateScrumRoles(val);
    if (res === true) {
      return convertStringToScrumRoles(val);
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-w, --password [password]',
    description: 'The password of the user',
    // defaultValue: 'default-password',
  })
  parsePassword(val: string): string {
    return val;
  }

  // ********************************************************************
}

// npm run build
// nestjs build
// node ./dist/cmd.main user update-content --help
// node ./dist/cmd.main user update-content
// node ./dist/cmd.main user update-content --uuid 15a955b3-bc5f-4e33-a29d-eb0738b15a9f --email 'john.doe@mail.com' --phone '0999-345-678' --lastName 'Kent' --firstName 'John' --projectRoles 'PM, QA' --scrumRoles 'PO,MEMBER' --password 'P@ssw0rd999' --startDate '2023-01-01T00:00:00.000Z' --endDate '2023-12-31T00:00:00.000Z' --updatedBy john.kent
// node ./dist/cmd.main user update-content --uuid f7f7e6eb-13be-4c22-b52a-2bcba29c74a7 --email 'jane.doe@mail.com' --phone '0999-654-321' --lastName 'Kent' --firstName 'Jane' --projectRoles 'EM,DEV' --scrumRoles 'SM,MEMBER' --password 'P@ssw0rd999' --startDate '2023-01-01T00:00:00.000Z' --endDate '2023-12-31T00:00:00.000Z' --updatedBy jane.kent --startedAt '2023-01-01T00:00:00.000Z' --startedBy 'john.doe' --completedAt '2023-12-31T00:00:00.000Z' --completedBy 'jane.doe'
