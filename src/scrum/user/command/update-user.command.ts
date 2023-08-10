import {
  CommandRunner,
  InquirerService,
  Option,
  SubCommand,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { UserService } from '../user.service';
import { UpdateUserRequestDTO } from '../dto/update-user-request.dto';
import { UserCommandOptionsDTO } from './dto/user-command-options.dto';
import { UserMetadataCommandOptionsDTO } from './dto/user-metadata-command-options.dto';
import { UserContentCommandOptionsDTO } from './dto/user-content-command-options.dto';
import { UuidAnswerDTO } from '../../common/command/dto/uuid-answer.dto';
import { IdAnswerDTO } from '../../common/command/dto/id-answer.dto';
import { NameAnswerDTO } from '../../common/command/dto/name-answer.dto';
import { getCommonDateCommandOptionsDTO } from '../../common/command/utils/common-date-command.utils';

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

    const userMetadataCommandOptions: UserMetadataCommandOptionsDTO = {
      ID: options?.id ?? '',
      name: options?.name ?? '',
      dates: options?.dates ?? undefined,
    };
    const UserContentCommandOptions: UserContentCommandOptionsDTO = {
      email: options?.email ?? '',
      phone: options?.phone ?? '',
      lastName: options?.lastName ?? '',
      firstName: options?.firstName ?? '',
      projectRoles: options?.projectRoles ?? [],
      scrumRoles: options?.scrumRoles ?? [],
      password: options?.password ?? '',
    };
    const userCommandOptions: UserCommandOptionsDTO = {
      UUID: options?.uuid ?? '00000000-0000-0000-0000-000000000000',
      metadata: userMetadataCommandOptions,
      content: UserContentCommandOptions,
      // ...options,
    };

    // while (!userCommandOptions.UUID) {
    //   userCommandOptions.UUID = (
    //     await this.inquirer.ask<UuidAnswerDTO>('uuid-questions', options)
    //   ).UUID;
    // }

    if (!userCommandOptions.metadata.ID) {
      userCommandOptions.metadata.ID = (
        await this.inquirer.ask<IdAnswerDTO>('id-questions', options)
      ).ID;
    }

    if (!userCommandOptions.metadata.name) {
      userCommandOptions.metadata.name = (
        await this.inquirer.ask<NameAnswerDTO>('name-questions', options)
      ).name;
    }

    // ********************************************************************

    userCommandOptions.metadata.dates = await getCommonDateCommandOptionsDTO(
      // this.configService,
      this.inquirer,
      options,
    );

    // ********************************************************************

    console.log(userCommandOptions);

    // ********************************************************************

    const updateUserRequestDTO: UpdateUserRequestDTO = {
      UUID: userCommandOptions.UUID,
      metadata: new UserMetadataCommandOptionsDTO(
        userCommandOptions.metadata.ID,
        userCommandOptions.metadata.name,
        userCommandOptions.metadata.dates,
      ),
      content: new UserContentCommandOptionsDTO(
        userCommandOptions.content.email,
        userCommandOptions.content.phone,
        userCommandOptions.content.lastName,
        userCommandOptions.content.firstName,
        userCommandOptions.content.projectRoles,
        userCommandOptions.content.scrumRoles,
        userCommandOptions.content.password,
      ),
    };

    console.log(updateUserRequestDTO);
    this.userService.updateUser(
      updateUserRequestDTO.UUID,
      updateUserRequestDTO,
    );
  }

  @Option({
    flags: '-u, --uuid [UUID]',
    description: 'The UUID of the user',
    // defaultValue: '00000000-0000-0000-0000-000000000000',
  })
  parseUUID(val: string): string {
    return val;
  }

  @Option({
    flags: '-i, --id [id]',
    description: 'The id of the user',
    // defaultValue: 'PPP-0000',
  })
  parseId(val: string): string {
    return val;
  }

  @Option({
    flags: '-n, --name [name]',
    description: 'The name of the user',
    // defaultValue: 'default-user-name',
  })
  parseName(val: string): string {
    return val;
  }

  // ********************************************************************

  @Option({
    flags: '-c, --createdBy [createdBy]',
    description: 'The user who created the user',
    // defaultValue: 'default-created-by',
  })
  parseCreatedBy(val: string): string {
    return val;
  }

  @Option({
    flags: '-d, --createdDate [createdDate]',
    description: 'The date when the user was created',
    // defaultValue: 'default-created-date',
  })
  parseCreatedDate(val: string): string {
    return val;
  }

  @Option({
    flags: '-b, --updatedBy [updatedBy]',
    description: 'The user who last updated the user',
    // defaultValue: 'default-updated-by',
  })
  parseUpdatedBy(val: string): string {
    return val;
  }

  @Option({
    flags: '-e, --updatedDate [updatedDate]',
    description: 'The date when the user was last updated',
    // defaultValue: 'default-updated-date',
  })
  parseUpdatedDate(val: string): string {
    return val;
  }

  @Option({
    flags: '-s, --startedBy [startedBy]',
    description: 'The user who started the user',
    // defaultValue: 'default-started-by',
  })
  parseStartedBy(val: string): string {
    return val;
  }

  @Option({
    flags: '-t, --startedDate [startedDate]',
    description: 'The date when the user was started',
    // defaultValue: 'default-started-date',
  })
  parseStartedDate(val: string): string {
    return val;
  }

  @Option({
    flags: '-a, --startDate [startDate]',
    description: 'The start date of the user',
    // defaultValue: 'default-start-date',
  })
  parseStartDate(val: string): string {
    return val;
  }

  @Option({
    flags: '-z, --endDate [endDate]',
    description: 'The end date of the user',
    // defaultValue: 'default-end-date',
  })
  parseEndDate(val: string): string {
    return val;
  }

  @Option({
    flags: '-m, --completedBy [completedBy]',
    description: 'The user who completed the user',
    // defaultValue: 'default-completed-by',
  })
  parseCompletedBy(val: string): string {
    return val;
  }

  @Option({
    flags: '-p, --completedDate [completedDate]',
    description: 'The date when the user was completed',
    // defaultValue: 'default-completed-date',
  })
  parseCompletedDate(val: string): string {
    return val;
  }

  // ********************************************************************
}

// npm run build
// nestjs build
// node ./dist/cmd.main user update --help
// node ./dist/cmd.main user update --uuid 3 --id ABC-123 --name "User 1" --createdBy john.doe --createdDate "2021-01-01T00:00:00.000Z" --updatedBy john.doe --updatedDate "2021-01-01T00:00:00.000Z" --startedBy john.doe --startedDate "2021-01-01T00:00:00.000Z" --startDate "2021-01-01T00:00:00.000Z" --endDate "2021-01-01T00:00:00.000Z" --completedBy john.doe --completedDate "2021-01-01T00:00:00.000Z"
