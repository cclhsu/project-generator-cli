import { Command, CommandRunner, InquirerService } from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '../../../config/config.service';
import { ProjectService } from '../project.service';
import { ListProjectsCommand } from './list-projects.command';
import { GetProjectCommand } from './get-project.command';
import { CreateProjectCommand } from './create-project.command';
import { UpdateProjectCommand } from './update-project.command';
import { DeleteProjectCommand } from './delete-project.command';
import { UpdateProjectMetadataCommand } from './update-project-metadata.command';
import { UpdateProjectContentCommand } from './update-project-content.command';
import { ListProjectIdsAndUUIDsCommand } from './list-project-ids-uuids.command';

@Injectable()
@Command({
  name: 'project',
  description: 'A set of commands for managing project',
  arguments: '<action> [options]',
  subCommands: [
    ListProjectsCommand,
    GetProjectCommand,
    CreateProjectCommand,
    UpdateProjectCommand,
    DeleteProjectCommand,
    UpdateProjectMetadataCommand,
    UpdateProjectContentCommand,
    ListProjectIdsAndUUIDsCommand,
  ],
})
export class ProjectCommand extends CommandRunner {
  private readonly logger = new Logger(ProjectCommand.name);
  constructor(
    private readonly inquirer: InquirerService,
    private readonly configService: ConfigService,
    private readonly projectService: ProjectService,
  ) {
    super();
  }

  async run(
    passedParams: string[],
    options?: Record<string, any> | undefined,
  ): Promise<void> {
    // throw new Error('Method not implemented.');
    this.logger.debug('>>> Running project command');
  }
}

// npm run build
// nestjs build
// node ./dist/cmd.main project --help
// node ./dist/cmd.main project

// node ./dist/cmd.main project -s src -g github -l project -t library -e team -u user -n project -m module
