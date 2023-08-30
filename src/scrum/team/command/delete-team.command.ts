import {
  CommandRunner,
  InquirerService,
  Option,
  SubCommand,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { TeamService } from '../team.service';
import { TeamDTO } from '../dto/team.dto';
import { UuidAnswerDTO } from '../../../common/command/dto';
import {
  validateCompletedAt,
  validateCreatedAt,
  validateEndDate,
  validateStartDate,
  validateStartedAt,
  validateUuid,
  validateUpdatedAt,
} from '../../../common/command/validation';
import { GetTeamByUuidRequestDTO } from '../dto';

@Injectable()
@SubCommand({
  name: 'delete',
  description: 'A command to delete a team',
})
export class DeleteTeamCommand extends CommandRunner {
  private readonly logger = new Logger(DeleteTeamCommand.name);
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
    this.logger.debug('>>> Deleting team');
    // this.logger.verbose('passedParam: ' + JSON.stringify(passedParams, null, 2));
    // this.logger.verbose('options: ' + JSON.stringify(options, null, 2));

    const team: GetTeamByUuidRequestDTO = {
      UUID: options?.uuid ?? '00000000-0000-0000-0000-000000000000',
      // metadata: null,
      // content: null,
      // ...options,
    };

    // ********************************************************************

    while (!team.UUID) {
      team.UUID = (
        await this.inquirer.ask<UuidAnswerDTO>('uuid-questions', options)
      ).UUID;
    }
    this.logger.verbose(`config: ${JSON.stringify(team.UUID, null, 2)}`);

    try {
      const teamDTO: TeamDTO = await this.teamService.deleteTeam(team.UUID);
      console.log(JSON.stringify(teamDTO, null, 2));
    } catch (error: any) {
      this.logger.error(error.message);
      this.logger.debug(error.stack);
    }
  }

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
}

// npm run build
// nestjs build
// node ./dist/cmd.main team delete --help
// node ./dist/cmd.main team delete --uuid 00000000-0000-0000-0000-000000000001
