import {
  CommandRunner,
  InquirerService,
  Option,
  SubCommand,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { TeamService } from '../team.service';
import { UpdateTeamContentRequestDTO } from '../dto';
import { getCommonDateDTO } from '../../../common/command/utils/common-date-command.utils';
import { validate } from 'class-validator';
import { TeamDTO, TeamContentDTO, TeamMetadataDTO } from '../dto';
import {
  IdAnswerDTO,
  MembersAnswerDTO,
  ProductOwnerAnswerDTO,
  ScrumMasterAnswerDTO,
  TeamIdAnswerDTO,
  TeamNameAnswerDTO,
  UuidAnswerDTO,
} from '../../../common/command/dto';
import {
  isValidUserId,
  isValidUuid,
  isValidUuids,
  validateCompletedAt,
  validateCreatedAt,
  validateEndDate,
  validateStartDate,
  validateStartedAt,
  validateTeamId,
  validateUpdatedAt,
  validateUserId,
  validateUuid,
} from '../../../common/command/validation';
import { UPDATE_ACTION_TYPE } from '../../../common/constant';
import {
  convertStringToIdUuidArray,
  isValidIdUuidArray,
} from '../../../utils/array';
import { IdUuidDTO } from '../../../common/dto/id-uuid.dto';
import {
  convertStringToIdUuidDTO,
  validateIdUuid,
} from '../../../common/command/validation/id-uuid.validation';

@Injectable()
@SubCommand({
  name: 'update-content',
  description: 'A command to update a team content',
})
export class UpdateTeamContentCommand extends CommandRunner {
  private readonly logger = new Logger(UpdateTeamContentCommand.name);
  constructor(
    private readonly inquirer: InquirerService,
    private readonly teamService: TeamService,
  ) {
    super();
  }

  async run(
    passedParams: string[],
    options?: Record<string, any> | undefined,
  ): Promise<void> {
    this.logger.debug('>>> Updating team');
    // this.logger.verbose('passedParam: ' + JSON.stringify(passedParams, null, 2));
    // this.logger.verbose('options: ' + JSON.stringify(options, null, 2));

    const teamMetadata: TeamMetadataDTO = {
      name: options?.name ?? '',
      dates: options?.dates ?? undefined,
    };
    const TeamContent: TeamContentDTO = {
      members: options?.members ?? [],
      productOwner: options?.productOwner ?? '',
      scrumMaster: options?.scrumMaster ?? '',
    };
    const team: TeamDTO = {
      ID: options?.id ?? '',
      UUID: options?.uuid ?? '00000000-0000-0000-0000-000000000000',
      metadata: teamMetadata,
      content: TeamContent,
      // ...options,
    };

    // ********************************************************************

    // if (!team.ID) {
    //   team.ID = (
    //     await this.inquirer.ask<TeamIdAnswerDTO>('team-id-questions', options)
    //   ).ID;
    // }

    while (!team.UUID) {
      team.UUID = (
        await this.inquirer.ask<UuidAnswerDTO>('uuid-questions', options)
      ).UUID;
    }

    // ********************************************************************
    // Update Metadata

    // if (!team.metadata.name) {
    //   team.metadata.name = (
    //     await this.inquirer.ask<TeamNameAnswerDTO>(
    //       'team-name-questions',
    //       options,
    //     )
    //   ).teamName;
    // }

    // ********************************************************************
    // Update Dates

    team.metadata.dates = await getCommonDateDTO(
      // this.configService,
      this.inquirer,
      options,
      UPDATE_ACTION_TYPE,
    );

    // ********************************************************************
    // Update Content

    this.logger.verbose(JSON.stringify(team, null, 2));

    if (team.content.members.length === 0) {
      team.content.members = (
        await this.inquirer.ask<MembersAnswerDTO>('members-questions', options)
      ).members;
    }

    if (!team.content.productOwner) {
      team.content.productOwner = (
        await this.inquirer.ask<ProductOwnerAnswerDTO>(
          'product-owner-questions',
          options,
        )
      ).productOwner;
    }

    if (!team.content.scrumMaster) {
      team.content.scrumMaster = (
        await this.inquirer.ask<ScrumMasterAnswerDTO>(
          'scrum-master-questions',
          options,
        )
      ).scrumMaster;
    }

    this.logger.verbose(JSON.stringify(team, null, 2));

    // ********************************************************************

    const updateTeamContentRequestDTO: UpdateTeamContentRequestDTO = {
      //ID: team.ID,
      UUID: team.UUID,
      // metadata: new TeamMetadataDTO(
      //   team.metadata.name,
      //   team.metadata.dates,
      // ),
      content: new TeamContentDTO(
        team.content.members,
        team.content.productOwner,
        team.content.scrumMaster,
      ),
    };

    try {
      this.logger.verbose(JSON.stringify(updateTeamContentRequestDTO, null, 2));
      await this.teamService.updateTeamContent(
        updateTeamContentRequestDTO.UUID,
        updateTeamContentRequestDTO,
      );
    } catch (error: any) {
      this.logger.error(error.message);
      this.logger.debug(error.stack);
    }
  }

  // @Option({
  //   flags: '-i, --id [id]',
  //   description: 'The id of the team',
  //   // defaultValue: 'PPP-0000',
  // })
  // parseId(val: string): string {
  //   const res = validateTeamId(val);
  //   if (res === true) {
  //     return val;
  //   }
  //   throw new Error(res + ': ' + val + '\n');
  // }

  @Option({
    flags: '-u, --uuid [UUID]',
    description: 'The UUID of the team',
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
  //   description: 'The name of the team',
  //   // defaultValue: 'default-team-name',
  // })
  // parseName(val: string): string {
  //   return val;
  // }

  // ********************************************************************
  // Update Dates

  // @Option({
  //   flags: '-c, --createdBy [createdBy]',
  //   description: 'The user who created the team',
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
  //   description: 'The date when the team was created',
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
    description: 'The user who last updated the team',
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
    description: 'The date when the team was last updated',
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
    description: 'The user who started the team',
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
    description: 'The date when the team was started',
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
    description: 'The start date of the team',
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
    description: 'The end date of the team',
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
    description: 'The user who completed the team',
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
    description: 'The date when the team was completed',
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
    flags: '-m, --members [members]',
    description: 'The members of the team',
    // defaultValue: 'default-members',
  })
  parseMembers(val: string): IdUuidDTO[] {
    const items: IdUuidDTO[] = convertStringToIdUuidArray(val);
    if (!isValidIdUuidArray(items)) {
      throw new Error(
        UpdateTeamContentCommand.name +
          ': Invalid user ID, UUID, Status in the list: ' +
          val,
      );
    }
    return items;
  }

  @Option({
    flags: '-o, --productOwner [productOwner]',
    description: 'The product owner of the team',
    // defaultValue: 'default-product-owner',
  })
  parseProductOwner(val: string): IdUuidDTO {
    const res = validateIdUuid(val);
    if (res === true) {
      return convertStringToIdUuidDTO(val);
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-r, --scrumMaster [scrumMaster]',
    description: 'The scrum master of the team',
    // defaultValue: 'default-scrum-master',
  })
  parseScrumMaster(val: string): IdUuidDTO {
    const res = validateIdUuid(val);
    if (res === true) {
      return convertStringToIdUuidDTO(val);
    }
    throw new Error(res + ': ' + val + '\n');
  }

  // ********************************************************************
}

// npm run build
// nestjs build
// node ./dist/cmd.main team update --help
// node ./dist/cmd.main team update
// node ./dist/cmd.main team update-content --uuid --id 'abc.team' --name 'ABC Team' --members '[{"ID":"john.doe","UUID":"00000000-0000-0000-0000-000000000001"},{"ID":"jane.doe","UUID":"00000000-0000-0000-0000-000000000002"}]' --productOwner '{"ID":"john.doe","UUID":"00000000-0000-0000-0000-000000000001"}' --scrumMaster '{"ID":"jane.doe","UUID":"00000000-0000-0000-0000-000000000002"}' --createdBy 'john.doe' --startDate '2021-01-01' --endDate '2021-12-31'
// node ./dist/cmd.main team update-content --uuid --id 'xyz.team' --name 'XYZ Team' --members 'john.doe/00000000-0000-0000-0000-000000000001,jane.doe/00000000-0000-0000-0000-000000000002' --productOwner 'john.doe/00000000-0000-0000-0000-000000000001' --scrumMaster 'jane.doe/00000000-0000-0000-0000-000000000002' --createdBy 'john.doe'
