import {
  CommandRunner,
  InquirerService,
  SubCommand,
  Option,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { TypescriptService } from 'src/typescript/typescript.service';
import { ProjectCommandOptionsDto } from 'src/common/command/dto/project-command-options.dto';
import {
  getProjectPath,
  getProjectCommandOptionsDto,
} from 'src/common/command/common-command.utils';

@Injectable()
@SubCommand({
  name: 'test',
  description: 'A command to test a typescript project',
})
export class TestTypescriptCommand extends CommandRunner {
  private readonly logger = new Logger(TestTypescriptCommand.name);
  constructor(
    private readonly inquirer: InquirerService,
    private readonly configService: ConfigService,
    private readonly typescriptService: TypescriptService,
  ) {
    super();
  }

  async run(
    passedParams: string[],
    options?: Record<string, any> | undefined,
  ): Promise<void> {
    this.logger.log('>>> Testing typescript');
    // this.logger.debug(passedParams);
    // this.logger.debug(options);

    // check if config file not exists
    const projectCommandOptionsDto: ProjectCommandOptionsDto =
      await getProjectCommandOptionsDto(
        this.configService,
        this.inquirer,
        options,
      );

    const projectPath: string = getProjectPath(projectCommandOptionsDto);
    console.log(`projectPath: ${projectPath}`);

    this.typescriptService.test(projectCommandOptionsDto);
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
    defaultValue: 'github.com',
    description: 'Your git provider',
    choices: ['github.com', 'gitlab.com', 'bitbucket.org', 'mypProject'],
  })
  parseGitProvider(val: string): string {
    return val;
  }

  @Option({
    flags: '-l, --project-language [projectLanguage]',
    defaultValue: 'typescript',
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
// node ./dist/cmd.main typescript test --help
// node ./dist/cmd.main typescript test -s src -g github -l typescript -t library -e team -u user -n project -m module
