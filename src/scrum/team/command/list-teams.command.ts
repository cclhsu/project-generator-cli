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

import {
  validateCompletedAt,
  validateCreatedAt,
  validateEndDate,
  validateStartDate,
  validateStartedAt,
  validateUuid,
  validateUpdatedAt,
} from '../../../common/command/validation';

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
    // this.logger.verbose('passedParam: ' + JSON.stringify(passedParams, null, 2));
    // this.logger.verbose('options: ' + JSON.stringify(options, null, 2));

    try {
      const team: TeamResponseDTO[] = await this.teamService.listTeams();
      console.log(JSON.stringify(team, null, 2));
    } catch (error: any) {
      this.logger.error(error.message);
      this.logger.debug(error.stack);
    }
  }
}

// npm run build
// nestjs build
// node ./dist/cmd.main team list --help
// node ./dist/cmd.main team list
