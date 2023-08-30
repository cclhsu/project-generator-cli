import {
  CommandRunner,
  InquirerService,
  Option,
  SubCommand,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '../config.service';
import { ProjectCommonCommandOptionsDTO } from '../../common/command/dto/project-common-command-options.dto';
import { getProjectName } from '../../utils/project-name/project-name.utils';

@Injectable()
@SubCommand({
  name: 'get',
  description: 'A command to get a config',
  options: { isDefault: true },
})
export class GetConfigCommand extends CommandRunner {
  private readonly logger = new Logger(GetConfigCommand.name);
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
    this.logger.debug('>>> Getting config');
    // this.logger.debug(passedParams);
    // this.logger.debug(options);

    // check if config file not exists
    const packageProjectName: string = getProjectName();
    if (!this.configService.isConfigFileExists(packageProjectName)) {
      console.log('Config file not exists');
      return;
    }

    // const projectCommonCommandOptionsDTO: ProjectCommonCommandOptionsDTO = {
    //   ...options,
    // };

    try {
      const config: ProjectCommonCommandOptionsDTO =
        await this.configService.getConfig(packageProjectName);
      this.logger.verbose(`config: ${JSON.stringify(config, null, 2)}`);
    } catch (error: any) {
      console.log(error.message);
    }
  }
}

// npm run build
// nestjs build
// node ./dist/cmd.main config get --help
// node ./dist/cmd.main config get --uuid 00000000-0000-0000-0000-000000000001
