import {
  CommandRunner,
  InquirerService,
  Option,
  SubCommand,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '../config.service';
import { GitProviderAnswerDTO } from 'src/common/command/dto/git-provider-answer.dto';
import { ProjectCommonCommandOptionsDTO } from 'src/common/command/dto/project-common-command-options.dto';
import { ProjectTeamAnswerDTO } from 'src/common/command/dto/project-team-answer.dto';
import { ProjectUserAnswerDTO } from 'src/common/command/dto/project-user-answer.dto';
import { SrcRootAnswerDTO } from 'src/common/command/dto/src-root-answer.dto';
import { TemplateRootAnswerDTO } from 'src/common/command/dto/template-root-answer.dto';
import { ConfigPathAnswerDTO } from 'src/common/command/dto/config-path-answer.dto';
import { getProjectName } from 'src/utils/project-name/project-name.utils';
import {
  DEFAULT_GIT_PROVIDER,
  GIT_PROVIDER_TYPES,
} from 'src/common/constant/git.constant';

@Injectable()
@SubCommand({
  name: 'create',
  description: 'A command to create a config',
})
export class CreateConfigCommand extends CommandRunner {
  private readonly logger = new Logger(CreateConfigCommand.name);
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
    this.logger.debug('>>> Creating config');
    // this.logger.debug(passedParams);
    // this.logger.debug(options);

    // check if config file exists
    const packageProjectName: string = getProjectName();
    if (this.configService.isConfigFileExists(packageProjectName)) {
      console.log('Config file already exists');
      return;
    }

    const projectCommonCommandOptionsDTO: ProjectCommonCommandOptionsDTO = {
      ...options,
    };

    if (!projectCommonCommandOptionsDTO.configPath) {
      projectCommonCommandOptionsDTO.configPath = (
        await this.inquirer.ask<ConfigPathAnswerDTO>(
          'config-path-questions',
          options,
        )
      ).configPath;
    }

    if (!projectCommonCommandOptionsDTO.templateRoot) {
      projectCommonCommandOptionsDTO.templateRoot = (
        await this.inquirer.ask<TemplateRootAnswerDTO>(
          'template-root-questions',
          options,
        )
      ).templateRoot;
    }

    if (!projectCommonCommandOptionsDTO.srcRoot) {
      projectCommonCommandOptionsDTO.srcRoot = (
        await this.inquirer.ask<SrcRootAnswerDTO>('src-root-questions', options)
      ).srcRoot;
    }

    if (!projectCommonCommandOptionsDTO.gitProvider) {
      projectCommonCommandOptionsDTO.gitProvider = (
        await this.inquirer.ask<GitProviderAnswerDTO>(
          'git-provider-questions',
          options,
        )
      ).gitProvider;
    }

    if (!projectCommonCommandOptionsDTO.projectTeam) {
      projectCommonCommandOptionsDTO.projectTeam = (
        await this.inquirer.ask<ProjectTeamAnswerDTO>(
          'project-team-questions',
          options,
        )
      ).projectTeam;
    }

    if (!projectCommonCommandOptionsDTO.projectUser) {
      projectCommonCommandOptionsDTO.projectUser = (
        await this.inquirer.ask<ProjectUserAnswerDTO>(
          'project-user-questions',
          options,
        )
      ).projectUser;
    }

    this.displayResults(
      projectCommonCommandOptionsDTO.configPath ?? 'N/A',
      projectCommonCommandOptionsDTO.templateRoot ?? 'N/A',
      projectCommonCommandOptionsDTO.srcRoot ?? 'N/A',
      projectCommonCommandOptionsDTO.gitProvider ?? 'N/A',
      projectCommonCommandOptionsDTO.projectTeam ?? 'N/A',
      projectCommonCommandOptionsDTO.projectUser ?? 'N/A',
    );

    this.configService.createConfig(
      packageProjectName,
      projectCommonCommandOptionsDTO,
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

  @Option({
    flags: '-c, --config-path [configPath]',
    defaultValue: '${HOME}/.config/project-suite-cli',
    description: 'Your config path',
  })
  parseConfigPath(val: string): string {
    return val;
  }

  @Option({
    flags: '-t, --template-root [templateRoot]',
    defaultValue: './template',
    description: 'Your template root',
  })
  parseTemplateRoot(val: string): string {
    return val;
  }

  @Option({
    flags: '-s, --src-root [srcRoot]',
    defaultValue: '${HOME}/src',
    description: 'Your src root',
  })
  parseSrcRoot(val: string): string {
    return val;
  }

  @Option({
    flags: '-g, --git-provider [gitProvider]',
    defaultValue: DEFAULT_GIT_PROVIDER,
    description: 'Your git provider',
    choices: GIT_PROVIDER_TYPES,
  })
  parseGitProvider(val: string): string {
    return val;
  }

  @Option({
    flags: '-e, --project-team [projectTeam]',
    description: 'Your project team',
    required: false,
  })
  parseProjectTeam(val: string): string {
    return val;
  }

  @Option({
    flags: '-u, --project-user [projectUser]',
    description: 'Your project user',
  })
  parseProjectUser(val: string): string {
    return val;
  }
}

// npm run build
// nestjs build
// node ./dist/cmd.main config create --help
// node ./dist/cmd.main config create --username john.doe --email john.doe@mail.com --phone 0912345678
