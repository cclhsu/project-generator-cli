import {
  CommandRunner,
  InquirerService,
  Option,
  SubCommand,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { TeamService } from '../team.service';
import { TeamResponseDTO } from '../dto/team-response.dto';
import { instanceToPlain } from 'class-transformer';

@Injectable()
@SubCommand({
  name: 'list',
  description: 'A command to list teams',
  options: { isDefault: true },
})
export class ListTeamsCommand extends CommandRunner {
  private readonly logger = new Logger(ListTeamsCommand.name);
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
    this.logger.debug('>>> Listing team');
    // this.logger.debug(passedParams);
    // this.logger.debug(options);

    const team: TeamResponseDTO[] = await this.teamService.listTeams();
    console.log(JSON.stringify(team, null, 2));
  }
}

// npm run build
// nestjs build
// node ./dist/cmd.main team list --help
// node ./dist/cmd.main team list
