import {
  CommandRunner,
  InquirerService,
  Option,
  SubCommand,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { TeamService } from '../team.service';
import { TeamCommandOptionsDTO } from './dto/team-command-options.dto';
import { GetTeamCommandOptionsDTO } from './dto/get-team-command-options.dto';
import { UuidAnswerDTO } from '../../common/command/dto/uuid-answer.dto';

@Injectable()
@SubCommand({
  name: 'get',
  description: 'A command to get a team',
})
export class GetTeamCommand extends CommandRunner {
  private readonly logger = new Logger(GetTeamCommand.name);
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
    this.logger.debug('>>> Getting team');
    // this.logger.debug(passedParams);
    // this.logger.debug(options);

    const teamCommandOptions: GetTeamCommandOptionsDTO = {
      UUID: options?.uuid ?? '00000000-0000-0000-0000-000000000000',
      // metadata: null,
      // content: null,
      // ...options,
    };

    while (!teamCommandOptions.UUID) {
      teamCommandOptions.UUID = (
        await this.inquirer.ask<UuidAnswerDTO>('uuid-questions', options)
      ).UUID;
    }

    this.displayResults(teamCommandOptions.UUID ?? 'N/A');

    const team: TeamCommandOptionsDTO = await this.teamService.getTeam(
      teamCommandOptions.UUID,
    );
    console.log(JSON.stringify(team, null, 2));
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
// node ./dist/cmd.main team get --help
// node ./dist/cmd.main team get --uuid 00000000-0000-0000-0000-000000000001
