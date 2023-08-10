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
import { ProjectSuiteVariablesFilePathAnswerDTO } from './dto/project-suite-variables-file-path-answer.dto';
import { ProjectSuiteVariablesFileNameAnswerDTO } from './dto/project-suite-variables-file-name-answer.dto';
import { DEFAULT_VARIABLE_FILE_PATH } from 'src/common/constant/common.constant';

@Injectable()
@SubCommand({
  name: 'get-document-variables-template',
  description: 'A command to get a project-suite project variables template',
  options: { isDefault: true },
})
export class GetProjectSuiteVariablesTemplateCommand extends CommandRunner {
  private readonly logger = new Logger(GetProjectSuiteVariablesTemplateCommand.name);
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
    this.logger.debug('>>> getting variables template');
    // this.logger.debug(passedParams);
    // this.logger.debug(options);

    const projectSuiteCommandOptionsDTO: ProjectSuiteCommandOptionsDTO = {
      ...options,
    };

    // while (!projectSuiteCommandOptionsDTO.templateRoot) {
    //   projectSuiteCommandOptionsDTO.templateRoot = (
    //     await this.inquirer.ask<TemplateRootAnswerDTO>(
    //       'template-root-questions',
    //       options,
    //     )
    //   ).templateRoot;
    // }

    while (!projectSuiteCommandOptionsDTO.projectSuiteVariablesFilePath) {
      projectSuiteCommandOptionsDTO.projectSuiteVariablesFilePath = (
        await this.inquirer.ask<ProjectSuiteVariablesFilePathAnswerDTO>(
          'project-suite-variables-path-name-questions',
          options,
        )
      ).projectSuiteVariablesFilePath;
    }

    while (!projectSuiteCommandOptionsDTO.projectSuiteVariablesFileName) {
      projectSuiteCommandOptionsDTO.projectSuiteVariablesFileName = (
        await this.inquirer.ask<ProjectSuiteVariablesFileNameAnswerDTO>(
          'project-suite-variables-file-name-questions',
          options,
        )
      ).projectSuiteVariablesFileName;
    }

    this.projectSuiteService.getVariablesTemplate(
      projectSuiteCommandOptionsDTO,
    );
  }

  // @Option({
  //   flags: '-t, --template-root [templateRoot]',
  //   defaultValue: 'template',
  //   description: 'Your template root',
  // })
  // parseTemplateRoot(val: string): string {
  //   return val;
  // }

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
}

// npm run build
// nestjs build
// node ./dist/cmd.main project-suite generate --help
// node ./dist/cmd.main project-suite generate -s src -g github -l project-suite -t library -e team -u user -n project -m module
