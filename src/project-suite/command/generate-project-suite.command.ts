import {
  CommandRunner,
  InquirerService,
  SubCommand,
  Option,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { ProjectSuiteService } from '../project-suite.service';
import { ProjectSuiteCommandOptionsDTO } from './dto/project-suite-command-options.dto';
import { getProjectSuiteCommandOptionsDTO } from './project-suite-command.utils';
import {
  DEFAULT_PROJECT_SUITE_ROOT_PATH,
  PROJECT_SUITE_TYPES,
} from 'src/common/constant/project.constant';
import {
  DEFAULT_GIT_PROVIDER,
  GIT_PROVIDER_TYPES,
} from 'src/common/constant/git.constant';
import { DEFAULT_VARIABLE_FILE_PATH } from 'src/common/constant/common.constant';

@Injectable()
@SubCommand({
  name: 'generate',
  description: 'A command to generate a project-suite project',
  options: { isDefault: true },
})
export class GenerateProjectSuiteCommand extends CommandRunner {
  private readonly logger = new Logger(GenerateProjectSuiteCommand.name);
  constructor(
    private readonly inquirer: InquirerService,
    private readonly configService: ConfigService,
    private readonly projectSuiteService: ProjectSuiteService,
  ) {
    super();
  }

  async run(
    passedParams: string[],
    options?: Record<string, any> | undefined,
  ): Promise<void> {
    this.logger.debug('>>> generating project-suite');
    // this.logger.debug(passedParams);
    // this.logger.debug(options);

    // check if config file not exists
    const projectSuiteCommandOptionsDTO: ProjectSuiteCommandOptionsDTO =
      await getProjectSuiteCommandOptionsDTO(
        this.configService,
        this.inquirer,
        options,
      );

    this.projectSuiteService.generateProjectSuite(
      projectSuiteCommandOptionsDTO,
    );
  }

  // @Option({
  //   flags: '-c, --config-path [configPath]',
  //   defaultValue: '${HOME}/.config/project-suite-cli',
  //   description: 'Your config path',
  // })
  // parseConfigPath(val: string): string {
  //   return val;
  // }

  @Option({
    flags: '-t, --template-root [templateRoot]',
    defaultValue: 'template',
    description: 'Your template root',
  })
  parseTemplateRoot(val: string): string {
    return val;
  }

  @Option({
    flags: '-v, --variables-file-path [projectSuiteVariablesFilePath]',
    defaultValue: DEFAULT_VARIABLE_FILE_PATH,
    description: 'Your variables file path',
  })
  parseProjectSuiteVariablesFilePath(val: string): string {
    return val;
  }

  @Option({
    flags: '-n, --variables-file-name [projectSuiteVariablesFileName]',
    defaultValue: 'project-suite-variables.json',
    description: 'Your variables file name',
  })
  parseProjectSuiteVariablesFileName(val: string): string {
    return val;
  }

  @Option({
    flags: '-d, --project-suite-type [projectSuiteType]',
    // defaultValue: PROJECT_SUITE_TYPES[0],
    description: 'Your project-suite type',
    choices: PROJECT_SUITE_TYPES,
  })
  parseProjectSuiteType(val: string): string {
    if (PROJECT_SUITE_TYPES.includes(val)) {
      return val;
    } else {
      throw new Error('Project-suite type is not valid');
    }
  }

  @Option({
    flags: '-f, --project-suite-path [ProjectSuiteRootPath]',
    defaultValue: DEFAULT_PROJECT_SUITE_ROOT_PATH,
    description: 'Your project-suite path',
  })
  parseProjectSuiteRootPath(val: string): string {
    return val;
  }

  @Option({
    flags: '-g, --project-suite-git-provider [projectSuiteGitProvider]',
    defaultValue: DEFAULT_GIT_PROVIDER,
    description: 'Your project-suite git provider',
    choices: GIT_PROVIDER_TYPES,
  })
  parseProjectSuiteGitProvider(val: string): string {
    return val;
  }

  @Option({
    flags: '-m, --project-suite-name [projectSuiteName]',
    // defaultValue: 'project-suite.md',
    description: 'Your project-suite name',
  })
  parseprojectSuiteName(val: string): string {
    return val;
  }
}

// npm run build
// nestjs build
// node ./dist/cmd.main project-suite generate --help
// node ./dist/cmd.main project-suite generate -s src -g github -l project-suite -t library -e team -u user -n project -m module
