import {
  CommandRunner,
  InquirerService,
  Option,
  SubCommand,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { ProjectService } from '../project.service';
import { GetProjectByUuidRequestDTO, ProjectDTO } from '../dto';
import { UuidAnswerDTO } from '../../../common/command/dto';
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
    // this.logger.verbose('passedParam: ' + JSON.stringify(passedParams, null, 2));
    // this.logger.verbose('options: ' + JSON.stringify(options, null, 2));

    const project: GetProjectByUuidRequestDTO = {
      UUID: options?.uuid ?? '00000000-0000-0000-0000-000000000000',
      // metadata: null,
      // content: null,
      // ...options,
    };

    // ********************************************************************

    while (!project.UUID) {
      project.UUID = (
        await this.inquirer.ask<UuidAnswerDTO>('uuid-questions', options)
      ).UUID;
    }
    this.logger.verbose(`config: ${JSON.stringify(project.UUID, null, 2)}`);

    try {
      const projectDTO: ProjectDTO = await this.projectService.deleteProject(
        project.UUID,
      );
      console.log(JSON.stringify(projectDTO, null, 2));
    } catch (error: any) {
      this.logger.error(error.message);
      this.logger.debug(error.stack);
    }
  }

  @Option({
    flags: '-u, --uuid [UUID]',
    description: 'The UUID of the project',
    // defaultValue: '00000000-0000-0000-0000-000000000000',
  })
  parseUUID(val: string): string {
    const res = validateUuid(val);
    if (res === true) {
      return val;
    }
    throw new Error(res + ': ' + val + '\n');
  }
}

// npm run build
// nestjs build
// node ./dist/cmd.main project delete --help
// node ./dist/cmd.main project delete --uuid 00000000-0000-0000-0000-000000000001
