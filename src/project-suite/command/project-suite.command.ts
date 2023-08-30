import { Command, CommandRunner, InquirerService } from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';
import { ProjectSuiteService } from '../project-suite.service';
import { GetProjectSuiteVariablesTemplateCommand } from './get-project-suite-variables-template.command';
import { GenerateProjectSuiteCommand } from './generate-project-suite.command';

@Injectable()
@Command({
  name: 'project-suite',
  description: 'A set of commands for managing project-suite project',
  arguments: '<action> [options]',
  subCommands: [
    GetProjectSuiteVariablesTemplateCommand,
    GenerateProjectSuiteCommand,
  ],
})
export class ProjectSuiteCommand extends CommandRunner {
  private readonly logger = new Logger(ProjectSuiteCommand.name);
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
    // throw new Error('Method not implemented.');
    this.logger.debug('>>> Running project-suite command');
  }
}

// npm run build
// nestjs build
// node ./dist/cmd.main project-suite --help
// node ./dist/cmd.main project-suite

// node ./dist/cmd.main project-suite -s src -g github -l project-suite -t library -e team -u user -n project -m module
