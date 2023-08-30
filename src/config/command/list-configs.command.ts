import { CommandRunner, InquirerService, SubCommand } from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '../config.service';
import { ProjectCommonCommandOptionsDTO } from '../../common/command/dto/project-common-command-options.dto';

@Injectable()
@SubCommand({
  name: 'list',
  description: 'A command to list configs',
})
export class ListConfigsCommand extends CommandRunner {
  private readonly logger = new Logger(ListConfigsCommand.name);
  constructor(
    private readonly inquirer: InquirerService,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  async run(
    passedParams: string[],
    options?: Record<string, any> | undefined,
  ): Promise<void> {
    this.logger.debug('>>> Listing config');
    // this.logger.debug(passedParams);
    // this.logger.debug(options);

    const projectCommonCommandOptionsDTO: ProjectCommonCommandOptionsDTO = {
      ...options,
    };

    try {
      await this.configService.listConfigs();
    } catch (error: any) {
      console.log(error.message);
    }
  }
}

// npm run build
// nestjs build
// node ./dist/cmd.main config list --help
// node ./dist/cmd.main config list
