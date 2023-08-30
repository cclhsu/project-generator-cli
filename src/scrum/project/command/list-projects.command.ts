import {
  CommandRunner,
  InquirerService,
  Option,
  SubCommand,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { ProjectService } from '../project.service';
import { ProjectResponseDTO } from '../dto/project-response.dto';
import { instanceToPlain } from 'class-transformer';

import {
  validateCompletedAt,
  validateCreatedAt,
  validateEndDate,
  validateStartDate,
  validateStartedAt,
  validateUuid,
  validateUpdatedAt,
} from '../../../common/command/validation';

@Injectable()
@SubCommand({
  name: 'list',
  description: 'A command to list projects',
  options: { isDefault: true },
})
export class ListProjectsCommand extends CommandRunner {
  private readonly logger = new Logger(ListProjectsCommand.name);
  constructor(
    private readonly inquirer: InquirerService,
    private readonly projectService: ProjectService,
  ) {
    super();
  }

  async run(
    passedParams: string[],
    options?: Record<string, any> | undefined,
  ): Promise<void> {
    this.logger.debug('>>> Listing project');
    // this.logger.verbose('passedParam: ' + JSON.stringify(passedParams, null, 2));
    // this.logger.verbose('options: ' + JSON.stringify(options, null, 2));

    try {
      const project: ProjectResponseDTO[] =
        await this.projectService.listProjects();
      console.log(JSON.stringify(project, null, 2));
    } catch (error: any) {
      this.logger.error(error.message);
      this.logger.debug(error.stack);
    }
  }
}

// npm run build
// nestjs build
// node ./dist/cmd.main project list --help
// node ./dist/cmd.main project list
