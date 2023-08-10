import {
  CommandRunner,
  InquirerService,
  Option,
  SubCommand,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { ProjectService } from '../project.service';
import { DeleteProjectCommandOptionsDTO } from './dto/delete-project-command-options.dto';
import { ProjectCommandOptionsDTO } from './dto/project-command-options.dto';
import { UuidAnswerDTO } from '../../common/command/dto/uuid-answer.dto';

@Injectable()
@SubCommand({
  name: 'delete',
  description: 'A command to delete a project',
})
export class DeleteProjectCommand extends CommandRunner {
  private readonly logger = new Logger(DeleteProjectCommand.name);
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
    this.logger.debug('>>> Deleting project');
    // this.logger.debug(passedParams);
    // this.logger.debug(options);

    const projectCommandOptions: DeleteProjectCommandOptionsDTO = {
      UUID: options?.uuid ?? '00000000-0000-0000-0000-000000000000',
      // metadata: null,
      // content: null,
      // ...options,
    };

    while (!projectCommandOptions.UUID) {
      projectCommandOptions.UUID = (
        await this.inquirer.ask<UuidAnswerDTO>('uuid-questions', options)
      ).UUID;
    }

    this.displayResults(projectCommandOptions.UUID ?? 'N/A');

    const project: ProjectCommandOptionsDTO =
      await this.projectService.deleteProject(projectCommandOptions.UUID);
    console.log(JSON.stringify(project, null, 2));
  }

  displayResults(UUID: string): void {
    console.log(`UUID: ${UUID}`);
  }

  @Option({
    flags: '-u, --uuid [UUID]',
    description: 'The UUID of the project',
    // defaultValue: '00000000-0000-0000-0000-000000000000',
  })
  parseUUID(val: string): string {
    return val;
  }
}

// npm run build
// nestjs build
// node ./dist/cmd.main project delete --help
// node ./dist/cmd.main project delete --uuid 00000000-0000-0000-0000-000000000001
