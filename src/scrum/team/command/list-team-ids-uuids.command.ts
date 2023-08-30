import {
  CommandRunner,
  InquirerService,
  Option,
  SubCommand,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { TeamService } from '../team.service';
import { TeamIdUuidDTO } from '../dto/team-id-uuid.dto';
import { instanceToPlain } from 'class-transformer';

@Injectable()
@SubCommand({
  name: 'list-team-ids-uuids',
  description: 'A command to list teams',
  options: { isDefault: true },
})
export class ListTeamIdsAndUUIDsCommand extends CommandRunner {
  private readonly logger = new Logger(ListTeamIdsAndUUIDsCommand.name);
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
      const team: TeamIdUuidDTO[] =
        await this.teamService.listTeamIdsAndUUIDs();
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
