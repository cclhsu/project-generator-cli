import {
  CommandRunner,
  InquirerService,
  SubCommand,
  Option,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { RustService } from 'src/project-language/rust/rust.service';
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
  name: 'clean',
  description: 'A command to clean a rust project',
})
export class CleanRustCommand extends CommandRunner {
  private readonly logger = new Logger(CleanRustCommand.name);
  constructor(
    private readonly inquirer: InquirerService,
    private readonly configService: ConfigService,
    private readonly rustService: RustService,
  ) {
    super();
  }

  async run(
    passedParams: string[],
    options?: Record<string, any> | undefined,
  ): Promise<void> {
    this.logger.debug('>>> Cleaning rust');
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

    this.rustService.clean(projectCommandOptionsDTO);
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
    defaultValue: 'rust',
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
// node ./dist/cmd.main rust clean --help
// node ./dist/cmd.main rust clean -s src -g github -l rust -t library -e team -u user -n project -m module
