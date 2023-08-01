import {
  CommandRunner,
  InquirerService,
  Option,
  SubCommand,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '../config.service';
import { ProjectCommonCommandOptionsDto } from 'src/common/command/dto/project-common-command-options.dto';
import { getProjectName } from 'src/utils/project-name/project-name.utils';

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
    this.logger.log('>>> Getting config');
    // this.logger.debug(passedParams);
    // this.logger.debug(options);

    // check if config file not exists
    const packageProjectName: string = getProjectName();
    if (!this.configService.isConfigFileExists(packageProjectName)) {
      console.log('Config file not exists');
      return;
    }

    // const projectCommonCommandOptionsDto: ProjectCommonCommandOptionsDto = {
    //   ...options,
    // };

    const config: ProjectCommonCommandOptionsDto =
      await this.configService.getConfig(packageProjectName);

    this.displayResults(
      config.configPath ?? 'N/A',
      config.templateRoot ?? 'N/A',
      config.srcRoot ?? 'N/A',
      config.gitProvider ?? 'N/A',
      config.projectTeam ?? 'N/A',
      config.projectUser ?? 'N/A',
    );
  }

  displayResults(
    configPath: string,
    templateRoot: string,
    srcRoot: string,
    gitProvider: string,
    projectTeam: string,
    projectUser: string,
  ): void {
    console.log(`configPath: ${configPath}`);
    console.log(`templateRoot: ${templateRoot}`);
    console.log(`srcRoot: ${srcRoot}`);
    console.log(`gitProvider: ${gitProvider}`);
    console.log(`projectTeam: ${projectTeam}`);
    console.log(`projectUser: ${projectUser}`);
  }
}

// npm run build
// nestjs build
// node ./dist/cmd.main config get --help
// node ./dist/cmd.main config get --uuid 123
