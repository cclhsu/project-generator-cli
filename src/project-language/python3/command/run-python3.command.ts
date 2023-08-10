import {
  CommandRunner,
  InquirerService,
  SubCommand,
  Option,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { Python3Service } from 'src/project-language/python3/python3.service';
import { ProjectCommandOptionsDTO } from 'src/common/command/dto/project-command-options.dto';
import {
  getProjectPath,
  getProjectCommandOptionsDTO,
} from 'src/common/command/utils/common-command.utils';
import {
  DEFAULT_GIT_PROVIDER,
  GIT_PROVIDER_TYPES,
} from 'src/common/constant/git.constant';

@Injectable()
@SubCommand({
  name: 'run',
  description: 'A command to run a python3 project',
  options: { isDefault: true },
})
export class RunPython3Command extends CommandRunner {
  private readonly logger = new Logger(RunPython3Command.name);
  constructor(
    private readonly inquirer: InquirerService,
    private readonly configService: ConfigService,
    private readonly python3Service: Python3Service,) {
    super();
  }

  async run(
    passedParams: string[],
    options?: Record<string, any> | undefined,
  ): Promise<void> {
    this.logger.debug('>>> Running python3');
    // this.logger.debug(passedParams);
    // this.logger.debug(options);

    // check if config file not exists
    const projectCommandOptionsDTO: ProjectCommandOptionsDTO =
      await getProjectCommandOptionsDTO(
        this.configService,
        this.inquirer,
        options,
      );

    const projectPath: string = getProjectPath(projectCommandOptionsDTO);
    console.log(`projectPath: ${projectPath}`);

    this.python3Service.run(projectCommandOptionsDTO);
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
    flags: '-l, --project-language [projectLanguage]',
    defaultValue: 'python3',
    description: 'Your project language',
    choices: ['go', 'python3', 'rust', 'typescript'],
  })
  parseProjectLanguage(val: string): string {
    return val;
  }

  @Option({
    flags: '-t, --project-type [projectType]',
    description: 'Your project type',
    choices: [
      'service',
      'cli',
      'vscode-extension',
      'web-app',
      'browser-extension',
      'mobile-app',
      'desktop-app',
      'algorithm',
    ],
  })
  parseProjectType(val: string): string {
    return val;
  }

  @Option({
    flags: '-s, --project-skeleton [projectSkeleton]',
    defaultValue: 'default',
    description: 'Your project skeleton',
  })
  parseProjectSkeleton(val: string): string {
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

  @Option({
    flags: '-n, --project-name [projectName]',
    description: 'Your project name',
    // description: 'Your project name (required)',
    // required: true,
  })
  parseProjectName(val: string): string {
    return val;
  }

  @Option({
    flags: '-m, --module-name [moduleName]',
    description: 'Your module name',
  })
  parseModuleName(val: string): string {
    return val;
  }
}

// npm run build
// nestjs build
// node ./dist/cmd.main python3 run --help
// node ./dist/cmd.main python3 run -s src -g github -l python3 -t library -e team -u user -n project -m module
