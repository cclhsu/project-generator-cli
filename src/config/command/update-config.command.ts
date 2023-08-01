import {
  CommandRunner,
  InquirerService,
  Option,
  SubCommand,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '../config.service';
import { GitProviderAnswerDto } from 'src/common/command/dto/git-provider-answer.dto';
import { ProjectCommonCommandOptionsDto } from 'src/common/command/dto/project-common-command-options.dto';
import { ProjectTeamAnswerDto } from 'src/common/command/dto/project-team-answer.dto';
import { ProjectUserAnswerDto } from 'src/common/command/dto/project-user-answer.dto';
import { SrcRootAnswerDto } from 'src/common/command/dto/src-root-answer.dto';
import { TemplateRootAnswerDto } from 'src/common/command/dto/template-root-answer.dto';
import { ConfigPathAnswerDto } from 'src/common/command/dto/config-path-answer.dto';
import { ConfirmUpdateAnswerDto } from 'src/common/command/dto/confirm-update-answer.dto';
import { getProjectName } from 'src/utils/project-name/project-name.utils';

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
    this.logger.log('>>> Updating config');
    // this.logger.debug(passedParams);
    // this.logger.debug(options);

    // check if config file not exists
    const packageProjectName: string = getProjectName();
    if (!this.configService.isConfigFileExists(packageProjectName)) {
      console.log('Config file not exists');
      return;
    }

    // load config
    const projectCommonCommandOptionsDto: ProjectCommonCommandOptionsDto =
      await this.configService.getConfig(packageProjectName);

    // update config with passed options
    if (options?.configPath) {
      projectCommonCommandOptionsDto.configPath = options.configPath;
    }
    if (options?.templateRoot) {
      projectCommonCommandOptionsDto.templateRoot = options.templateRoot;
    }
    if (options?.srcRoot) {
      projectCommonCommandOptionsDto.srcRoot = options.srcRoot;
    }
    if (options?.gitProvider) {
      projectCommonCommandOptionsDto.gitProvider = options.gitProvider;
    }
    if (options?.projectTeam) {
      projectCommonCommandOptionsDto.projectTeam = options.projectTeam;
    }
    if (options?.projectUser) {
      projectCommonCommandOptionsDto.projectUser = options.projectUser;
    }

    if (!projectCommonCommandOptionsDto.configPath) {
      projectCommonCommandOptionsDto.configPath = (
        await this.inquirer.ask<ConfigPathAnswerDto>(
          'config-path-questions',
          options,
        )
      ).configPath;
    }

    if (!projectCommonCommandOptionsDto.templateRoot) {
      projectCommonCommandOptionsDto.templateRoot = (
        await this.inquirer.ask<TemplateRootAnswerDto>(
          'template-root-questions',
          options,
        )
      ).templateRoot;
    }

    if (!projectCommonCommandOptionsDto.srcRoot) {
      projectCommonCommandOptionsDto.srcRoot = (
        await this.inquirer.ask<SrcRootAnswerDto>('src-root-questions', options)
      ).srcRoot;
    }

    if (!projectCommonCommandOptionsDto.gitProvider) {
      projectCommonCommandOptionsDto.gitProvider = (
        await this.inquirer.ask<GitProviderAnswerDto>(
          'git-provider-questions',
          options,
        )
      ).gitProvider;
    }

    if (!projectCommonCommandOptionsDto.projectTeam) {
      projectCommonCommandOptionsDto.projectTeam = (
        await this.inquirer.ask<ProjectTeamAnswerDto>(
          'project-team-questions',
          options,
        )
      ).projectTeam;
    }

    if (!projectCommonCommandOptionsDto.projectUser) {
      projectCommonCommandOptionsDto.projectUser = (
        await this.inquirer.ask<ProjectUserAnswerDto>(
          'project-user-questions',
          options,
        )
      ).projectUser;
    }

    this.displayResults(
      projectCommonCommandOptionsDto.configPath ?? 'N/A',
      projectCommonCommandOptionsDto.templateRoot ?? 'N/A',
      projectCommonCommandOptionsDto.srcRoot ?? 'N/A',
      projectCommonCommandOptionsDto.gitProvider ?? 'N/A',
      projectCommonCommandOptionsDto.projectTeam ?? 'N/A',
      projectCommonCommandOptionsDto.projectUser ?? 'N/A',
    );

    const confirmUpdateAnswerDto: ConfirmUpdateAnswerDto =
      await this.inquirer.ask<ConfirmUpdateAnswerDto>(
        'confirm-update-questions',
        options,
      );

    if (!confirmUpdateAnswerDto.confirmUpdate) {
      console.log('Config update cancelled');
      return;
    }

    this.configService.updateConfig(
      packageProjectName,
      projectCommonCommandOptionsDto,
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
    // defaultValue: 'github.com',
    description: 'Your git provider',
    choices: ['github.com', 'gitlab.com', 'bitbucket.org', 'mypProject'],
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
// node ./dist/cmd.main config update --uuid 123 --username john.doe --email john.doe@mail.com --phone 0912345678
