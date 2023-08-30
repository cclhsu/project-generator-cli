import {
  CommandRunner,
  InquirerService,
  SubCommand,
  Option,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '../../../config/config.service';
import { Python3Service } from '../../../project-language/python3/python3.service';
import { ProjectCommandOptionsDTO } from '../../../common/command/dto/project-command-options.dto';
import {
  getProjectPath,
  getProjectCommandOptionsDTO,
} from '../../../common/command/utils/common-command.utils';
import {
  DEFAULT_GIT_PROVIDER,
  GIT_PROVIDER_TYPE_ARRAY,
  PROJECT_LANGUAGE_TYPE_ARRAY,
  PROJECT_TEMPLATE_TYPE_ARRAY,
} from '../../../common/constant';

@Injectable()
@SubCommand({
  name: 'test',
  description: 'A command to test a python3 project',
})
export class TestPython3Command extends CommandRunner {
  private readonly logger = new Logger(TestPython3Command.name);
  constructor(
    private readonly inquirer: InquirerService,
    private readonly configService: ConfigService,
    private readonly python3Service: Python3Service,
  ) {
    super();
  }

  async run(
    passedParams: string[],
    options?: Record<string, any> | undefined,
  ): Promise<void> {
    this.logger.debug('>>> Testing python3');
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

    try {
      await this.python3Service.test(projectCommandOptionsDTO);
    } catch (error: any) {
      this.logger.error(error.message);
      this.logger.debug(error.stack);
    }
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
    choices: GIT_PROVIDER_TYPE_ARRAY,
  })
  parseGitProvider(val: string): string {
    return val;
  }

  @Option({
    flags: '-l, --project-language [projectLanguage]',
    defaultValue: 'python3',
    description: 'Your project language',
    choices: PROJECT_LANGUAGE_TYPE_ARRAY,
  })
  parseProjectLanguage(val: string): string {
    return val;
  }

  @Option({
    flags: '-t, --project-type [projectType]',
    description: 'Your project type',
    choices: PROJECT_TEMPLATE_TYPE_ARRAY,
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
// node ./dist/cmd.main python3 test --help
// node ./dist/cmd.main python3 test -s src -g github -l python3 -t library -e team -u user -n project -m module
