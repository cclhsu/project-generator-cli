import { Command, CommandRunner, InquirerService } from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '../../../config/config.service';
import { TeamService } from '../team.service';
import { ListTeamsCommand } from './list-teams.command';
import { GetTeamCommand } from './get-team.command';
import { CreateTeamCommand } from './create-team.command';
import { UpdateTeamCommand } from './update-team.command';
import { DeleteTeamCommand } from './delete-team.command';
import { UpdateTeamMetadataCommand } from './update-team-metadata.command';
import { UpdateTeamContentCommand } from './update-team-content.command';
import { ListTeamIdsAndUUIDsCommand } from './list-team-ids-uuids.command';

@Injectable()
@Command({
  name: 'team',
  description: 'A set of commands for managing team',
  arguments: '<action> [options]',
  subCommands: [
    ListTeamsCommand,
    GetTeamCommand,
    CreateTeamCommand,
    UpdateTeamCommand,
    DeleteTeamCommand,
    UpdateTeamMetadataCommand,
    UpdateTeamContentCommand,
    ListTeamIdsAndUUIDsCommand,
  ],
})
export class TeamCommand extends CommandRunner {
  private readonly logger = new Logger(TeamCommand.name);
  constructor(
    private readonly inquirer: InquirerService,
    private readonly configService: ConfigService,
    private readonly teamService: TeamService,
  ) {
    super();
  }

  async run(
    passedParams: string[],
    options?: Record<string, any> | undefined,
  ): Promise<void> {
    // throw new Error('Method not implemented.');
    this.logger.debug('>>> Running team command');
  }
}

// npm run build
// nestjs build
// node ./dist/cmd.main team --help
// node ./dist/cmd.main team

// node ./dist/cmd.main team -s src -g github -l team -t library -e team -u user -n team -m module
