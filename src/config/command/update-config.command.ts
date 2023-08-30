import {
  CommandRunner,
  InquirerService,
  Option,
  SubCommand,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '../config.service';
import { GitProviderAnswerDTO } from '../../common/command/dto/git-provider-answer.dto';
import { ProjectCommonCommandOptionsDTO } from '../../common/command/dto/project-common-command-options.dto';
import { ProjectTeamAnswerDTO } from '../../common/command/dto/project-team-answer.dto';
import { ProjectUserAnswerDTO } from '../../common/command/dto/project-user-answer.dto';
import { SrcRootAnswerDTO } from '../../common/command/dto/src-root-answer.dto';
import { TemplateRootAnswerDTO } from '../../common/command/dto/template-root-answer.dto';
import { ConfigPathAnswerDTO } from '../../common/command/dto/config-path-answer.dto';
import { ConfirmUpdateAnswerDTO } from '../../common/command/dto/confirm-update-answer.dto';
import { getProjectName } from '../../utils/project-name/project-name.utils';
import {
  DEFAULT_GIT_PROVIDER,
  GIT_PROVIDER_TYPE_ARRAY,
  PROJECT_LANGUAGE_TYPE_ARRAY,
  PROJECT_TEMPLATE_TYPE_ARRAY,
} from '../../common/constant';

@Injectable()
@SubCommand({
  name: 'update',
  description: 'A command to update a config',
})
export class UpdateConfigCommand extends CommandRunner {
  private readonly logger = new Logger(UpdateConfigCommand.name);
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
    this.logger.debug('>>> Updating config');
    // this.logger.debug(passedParams);
    // this.logger.debug(options);

    // check if config file not exists
    const packageProjectName: string = getProjectName();
    if (!this.configService.isConfigFileExists(packageProjectName)) {
      console.log('Config file not exists');
      return;
    }

    // load config
    const projectCommonCommandOptionsDTO: ProjectCommonCommandOptionsDTO =
      await this.configService.getConfig(packageProjectName);

    // update config with passed options
    if (options?.configPath) {
      projectCommonCommandOptionsDTO.configPath = options.configPath;
    }
    if (options?.templateRoot) {
      projectCommonCommandOptionsDTO.templateRoot = options.templateRoot;
    }
    if (options?.srcRoot) {
      projectCommonCommandOptionsDTO.srcRoot = options.srcRoot;
    }
    if (options?.gitProvider) {
      projectCommonCommandOptionsDTO.gitProvider = options.gitProvider;
    }
    if (options?.projectTeam) {
      projectCommonCommandOptionsDTO.projectTeam = options.projectTeam;
    }
    if (options?.projectUser) {
      projectCommonCommandOptionsDTO.projectUser = options.projectUser;
    }

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

    this.logger.verbose(
      `config: ${JSON.stringify(projectCommonCommandOptionsDTO, null, 2)}`,
    );

    const confirmUpdateAnswerDTO: ConfirmUpdateAnswerDTO =
      await this.inquirer.ask<ConfirmUpdateAnswerDTO>(
        'confirm-update-questions',
        options,
      );

    if (!confirmUpdateAnswerDTO.confirmUpdate) {
      console.log('Config update cancelled');
      return;
    }

    try {
      await this.configService.updateConfig(
        packageProjectName,
        projectCommonCommandOptionsDTO,
      );
    } catch (error: any) {
      console.log(error.message);
    }
  }

  @Option({
    flags: '-c, --config-path [configPath]',
    // defaultValue: '${HOME}/.config/project-suite-cli',
    description: 'Your config path',
  })
  parseConfigPath(val: string): string {
    return val;
  }

  @Option({
    flags: '-t, --template-root [templateRoot]',
    // defaultValue: './template',
    description: 'Your template root',
  })
  parseTemplateRoot(val: string): string {
    return val;
  }

  @Option({
    flags: '-s, --src-root [srcRoot]',
    // defaultValue: '${HOME}/src',
    description: 'Your src root',
  })
  parseSrcRoot(val: string): string {
    return val;
  }

  @Option({
    flags: '-g, --git-provider [gitProvider]',
    // defaultValue: DEFAULT_GIT_PROVIDER,
    description: 'Your git provider',
    choices: GIT_PROVIDER_TYPE_ARRAY,
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
// node ./dist/cmd.main config update --help
// node ./dist/cmd.main config update --uuid 00000000-0000-0000-0000-000000000001 --username john.doe --email john.doe@mail.com --phone 0912-345-678
