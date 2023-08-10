import {
  CommandRunner,
  InquirerService,
  Option,
  SubCommand,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { ProjectService } from '../project.service';
import { GetProjectCommandOptionsDTO } from './dto/get-project-command-options.dto';
import { ProjectCommandOptionsDTO } from './dto/project-command-options.dto';
import { UuidAnswerDTO } from '../../common/command/dto/uuid-answer.dto';

@Injectable()
@SubCommand({
  name: 'get',
  description: 'A command to get a project',
})
export class GetProjectCommand extends CommandRunner {
  private readonly logger = new Logger(GetProjectCommand.name);
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
    this.logger.debug('>>> Getting project');
    // this.logger.debug(passedParams);
    // this.logger.debug(options);

    const projectCommandOptions: GetProjectCommandOptionsDTO = {
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
      await this.projectService.getProject(projectCommandOptions.UUID);
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
// node ./dist/cmd.main project get --help
// node ./dist/cmd.main project get --uuid 00000000-0000-0000-0000-000000000001
