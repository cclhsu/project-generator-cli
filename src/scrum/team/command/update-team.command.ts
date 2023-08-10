import {
  CommandRunner,
  InquirerService,
  Option,
  SubCommand,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { TeamService } from '../team.service';
import { TeamCommandOptionsDTO } from './dto/team-command-options.dto';
import { TeamMetadataCommandOptionsDTO } from './dto/team-metadata-command-options.dto';
import { TeamContentCommandOptionsDTO } from './dto/team-content-command-options.dto';
import { UuidAnswerDTO } from '../../common/command/dto/uuid-answer.dto';
import { IdAnswerDTO } from '../../common/command/dto/id-answer.dto';
import { NameAnswerDTO } from '../../common/command/dto/name-answer.dto';
import { getCommonDateCommandOptionsDTO } from '../../common/command/utils/common-date-command.utils';
import { MembersAnswerDTO } from 'src/scrum/common/command/dto/members-answer.dto';
import { ProductOwnerAnswerDTO } from 'src/scrum/common/command/dto/product-owner-answer.dto';
import { ScrumMasterAnswerDTO } from 'src/scrum/common/command/dto/scrum-master-answer.dto';
import { UpdateTeamRequestDTO } from '../dto/update-team-request.dto';

@Injectable()
@SubCommand({
  name: 'update',
  description: 'A command to update a team',
})
export class UpdateTeamCommand extends CommandRunner {
  private readonly logger = new Logger(UpdateTeamCommand.name);
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
    // this.logger.debug(passedParams);
    // this.logger.debug(options);

    const teamMetadataCommandOptions: TeamMetadataCommandOptionsDTO = {
      ID: options?.id ?? '',
      name: options?.name ?? '',
      dates: options?.dates ?? undefined,
    };
    const TeamContentCommandOptions: TeamContentCommandOptionsDTO = {
      members: options?.members ?? [],
      productOwner: options?.productOwner ?? '',
      scrumMaster: options?.scrumMaster ?? '',
    };
    const teamCommandOptions: TeamCommandOptionsDTO = {
      UUID: options?.uuid ?? '00000000-0000-0000-0000-000000000000',
      metadata: teamMetadataCommandOptions,
      content: TeamContentCommandOptions,
      // ...options,
    };

    // while (!teamCommandOptions.UUID) {
    //   teamCommandOptions.UUID = (
    //     await this.inquirer.ask<UuidAnswerDTO>('uuid-questions', options)
    //   ).UUID;
    // }

    if (!teamCommandOptions.metadata.ID) {
      teamCommandOptions.metadata.ID = (
        await this.inquirer.ask<IdAnswerDTO>('id-questions', options)
      ).ID;
    }

    if (!teamCommandOptions.metadata.name) {
      teamCommandOptions.metadata.name = (
        await this.inquirer.ask<NameAnswerDTO>('name-questions', options)
      ).name;
    }

    // ********************************************************************

    teamCommandOptions.metadata.dates = await getCommonDateCommandOptionsDTO(
      // this.configService,
      this.inquirer,
      options,
    );

    // ********************************************************************

    if (teamCommandOptions.content.members.length === 0) {
      teamCommandOptions.content.members = (
        await this.inquirer.ask<MembersAnswerDTO>('members-questions', options)
      ).members;
    }

    if (!teamCommandOptions.content.productOwner) {
      teamCommandOptions.content.productOwner = (
        await this.inquirer.ask<ProductOwnerAnswerDTO>(
          'product-owner-questions',
          options,
        )
      ).productOwner;
    }

    if (!teamCommandOptions.content.scrumMaster) {
      teamCommandOptions.content.scrumMaster = (
        await this.inquirer.ask<ScrumMasterAnswerDTO>(
          'scrum-master-questions',
          options,
        )
      ).scrumMaster;
    }

    console.log(teamCommandOptions);

    // ********************************************************************

    const updateTeamRequestDTO: UpdateTeamRequestDTO = {
      UUID: teamCommandOptions.UUID,
      metadata: new TeamMetadataCommandOptionsDTO(
        teamCommandOptions.metadata.ID,
        teamCommandOptions.metadata.name,
        teamCommandOptions.metadata.dates,
      ),
      content: new TeamContentCommandOptionsDTO(
        teamCommandOptions.content.members,
        teamCommandOptions.content.productOwner,
        teamCommandOptions.content.scrumMaster,
      ),
    };

    console.log(updateTeamRequestDTO);
    this.teamService.updateTeam(
      updateTeamRequestDTO.UUID,
      updateTeamRequestDTO,
    );
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
    flags: '-i, --id [id]',
    description: 'The id of the team',
    // defaultValue: 'PPP-0000',
  })
  parseId(val: string): string {
    return val;
  }

  @Option({
    flags: '-n, --name [name]',
    description: 'The name of the team',
    // defaultValue: 'default-team-name',
  })
  parseName(val: string): string {
    return val;
  }

  // ********************************************************************

  @Option({
    flags: '-c, --createdBy [createdBy]',
    description: 'The user who created the team',
    // defaultValue: 'default-created-by',
  })
  parseCreatedBy(val: string): string {
    return val;
  }

  @Option({
    flags: '-d, --createdDate [createdDate]',
    description: 'The date when the team was created',
    // defaultValue: 'default-created-date',
  })
  parseCreatedDate(val: string): string {
    return val;
  }

  @Option({
    flags: '-b, --updatedBy [updatedBy]',
    description: 'The user who last updated the team',
    // defaultValue: 'default-updated-by',
  })
  parseUpdatedBy(val: string): string {
    return val;
  }

  @Option({
    flags: '-e, --updatedDate [updatedDate]',
    description: 'The date when the team was last updated',
    // defaultValue: 'default-updated-date',
  })
  parseUpdatedDate(val: string): string {
    return val;
  }

  @Option({
    flags: '-s, --startedBy [startedBy]',
    description: 'The user who started the team',
    // defaultValue: 'default-started-by',
  })
  parseStartedBy(val: string): string {
    return val;
  }

  @Option({
    flags: '-t, --startedDate [startedDate]',
    description: 'The date when the team was started',
    // defaultValue: 'default-started-date',
  })
  parseStartedDate(val: string): string {
    return val;
  }

  @Option({
    flags: '-a, --startDate [startDate]',
    description: 'The start date of the team',
    // defaultValue: 'default-start-date',
  })
  parseStartDate(val: string): string {
    return val;
  }

  @Option({
    flags: '-z, --endDate [endDate]',
    description: 'The end date of the team',
    // defaultValue: 'default-end-date',
  })
  parseEndDate(val: string): string {
    return val;
  }

  @Option({
    flags: '-m, --completedBy [completedBy]',
    description: 'The user who completed the team',
    // defaultValue: 'default-completed-by',
  })
  parseCompletedBy(val: string): string {
    return val;
  }

  @Option({
    flags: '-p, --completedDate [completedDate]',
    description: 'The date when the team was completed',
    // defaultValue: 'default-completed-date',
  })
  parseCompletedDate(val: string): string {
    return val;
  }

  // ********************************************************************

  @Option({
    flags: '-m, --members [members]',
    description: 'The members of the team',
    // defaultValue: 'default-members',
  })
  parseMembers(val: string): string {
    return val;
  }

  @Option({
    flags: '-o, --productOwner [productOwner]',
    description: 'The product owner of the team',
    // defaultValue: 'default-product-owner',
  })
  parseProductOwner(val: string): string {
    return val;
  }

  @Option({
    flags: '-r, --scrumMaster [scrumMaster]',
    description: 'The scrum master of the team',
    // defaultValue: 'default-scrum-master',
  })
  parseScrumMaster(val: string): string {
    return val;
  }
}

// npm run build
// nestjs build
// node ./dist/cmd.main team update --help
// node ./dist/cmd.main team update --uuid 3 --id ABC-123 --name "Team 1" --createdBy john.doe --createdDate "2021-01-01T00:00:00.000Z" --updatedBy john.doe --updatedDate "2021-01-01T00:00:00.000Z" --startedBy john.doe --startedDate "2021-01-01T00:00:00.000Z" --startDate "2021-01-01T00:00:00.000Z" --endDate "2021-01-01T00:00:00.000Z" --completedBy john.doe --completedDate "2021-01-01T00:00:00.000Z" --members john.doe,jane.doe --productOwner john.doe --scrumMaster jane.doe
