import {
  CommandRunner,
  InquirerService,
  Option,
  SubCommand,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { ProjectService } from '../project.service';
import { UpdateProjectMetadataRequestDTO } from '../dto';
import { getCommonDateDTO } from '../../../common/command/utils/common-date-command.utils';
import { validate } from 'class-validator';
import { ProjectDTO, ProjectContentDTO, ProjectMetadataDTO } from '../dto';
import {
  DescriptionAnswerDTO,
  IdAnswerDTO,
  IterationsAnswerDTO,
  ProjectNameAnswerDTO,
  ProjectIdAnswerDTO,
  ProjectStatusAnswerDTO,
  ProjectTeamIdUuidAnswerDTO,
  TasksAnswerDTO,
  IterationsIdUuidStatusAnswerDTO,
  TasksIdUuidStatusAnswerDTO,
  UuidAnswerDTO,
} from '../../../common/command/dto';
import {
  validateCompletedAt,
  validateCreatedAt,
  validateEndDate,
  validateProjectId,
  validateProjectStatus,
  validateStartDate,
  validateStartedAt,
  validateUuid,
  validateUpdatedAt,
  validateUserId,
  isValidUuid,
  validateProjectName,
  validateIdUuid,
  convertStringToIdUuidDTO,
} from '../../../common/command/validation';
import { UPDATE_ACTION_TYPE } from '../../../common/constant';
import {
  convertStringToArray,
  convertStringToIdUuidStatusArray,
  isValidIdUuidStatusArray,
} from '../../../utils/array';
import { isValidUuids } from '../../../common/command/validation';
import { IdUuidDTO, IdUuidStatusDTO } from '../../../common/dto';

@Injectable()
@SubCommand({
  name: 'update-metadata',
  description: 'A command to update a project metatdata',
})
export class UpdateProjectMetadataCommand extends CommandRunner {
  private readonly logger = new Logger(UpdateProjectMetadataCommand.name);
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
    this.logger.debug('>>> Updating project');
    // this.logger.verbose('passedParam: ' + JSON.stringify(passedParams, null, 2));
    // this.logger.verbose('options: ' + JSON.stringify(options, null, 2));

    const projectMetadata: ProjectMetadataDTO = {
      name: options?.name ?? '',
      status: 'PLANNED',
      dates: options?.dates ?? undefined,
    };
    const projectContent: ProjectContentDTO = {
      description: options?.description ?? '',
      iterations: options?.iterations ?? [],
      backlog: options?.backlog ?? [],
      team: options?.team ? options?.team : undefined,
    };
    const project: ProjectDTO = {
      ID: options?.id ?? '',
      UUID: options?.uuid ?? '00000000-0000-0000-0000-000000000000',
      metadata: projectMetadata,
      content: projectContent,
      // ...options,
    };

    // ********************************************************************

    // if (!project.ID) {
    //   project.ID = (
    //     await this.inquirer.ask<ProjectIdAnswerDTO>(
    //       'project-id-questions',
    //       options,
    //     )
    //   ).ID;
    // }

    while (!project.UUID) {
      project.UUID = (
        await this.inquirer.ask<UuidAnswerDTO>('uuid-questions', options)
      ).UUID;
    }

    // ********************************************************************
    // Update Metadata

    if (!project.metadata.name) {
      project.metadata.name = (
        await this.inquirer.ask<ProjectNameAnswerDTO>(
          'project-name-questions',
          options,
        )
      ).projectName;
    }

    while (!project.metadata.status) {
      project.metadata.status = (
        await this.inquirer.ask<ProjectStatusAnswerDTO>(
          'project-status-questions',
          options,
        )
      ).projectStatus;
    }

    // ********************************************************************
    // Update Dates

    project.metadata.dates = await getCommonDateDTO(
      // this.configService,
      this.inquirer,
      options,
      UPDATE_ACTION_TYPE,
    );

    // ********************************************************************
    // Update Content

    // while (!project.content.description) {
    //   project.content.description = (
    //     await this.inquirer.ask<DescriptionAnswerDTO>(
    //       'description-questions',
    //       options,
    //     )
    //   ).description;
    // }

    // if (!project.content.iterations) {
    //   project.content.iterations = (
    //     await this.inquirer.ask<IterationsAnswerDTO>(
    //       'iterations-questions',
    //       options,
    //     )
    //   ).iterations;
    // }

    // if (!project.content.backlog) {
    //   project.content.backlog = (
    //     await this.inquirer.ask<TasksAnswerDTO>('tasks-questions', options)
    //   ).tasks;
    // }

    // if (!project.content.team) {
    //   project.content.team = (
    //     await this.inquirer.ask<ProjectTeamIdUuidAnswerDTO>(
    //       'project-team-id-uuid-questions',
    //       options,
    //     )
    //   ).projectTeam;
    // }

    this.logger.verbose(JSON.stringify(project, null, 2));

    // ********************************************************************

    const updateProjectMetadataRequestDTO: UpdateProjectMetadataRequestDTO = {
      // ID: project.ID,
      UUID: project.UUID,
      metadata: new ProjectMetadataDTO(
        project.metadata.name,
        project.metadata.status,
        project.metadata.dates,
      ),
      // content: new ProjectContentDTO(
      //   project.content.description,
      //   project.content.iterations,
      //   project.content.backlog,
      //   project.content.team,
      // ),
    };

    try {
      this.logger.verbose(
        JSON.stringify(updateProjectMetadataRequestDTO, null, 2),
      );
      await this.projectService.updateProjectMetadata(
        updateProjectMetadataRequestDTO.UUID,
        updateProjectMetadataRequestDTO,
      );
    } catch (error: any) {
      this.logger.error(error.message);
      this.logger.debug(error.stack);
    }
  }

  // @Option({
  //   flags: '-i, --id [id]',
  //   description: 'The id of the project',
  //   // defaultValue: 'PPP-0000',
  // })
  // parseId(val: string): string {
  //   const res = validateProjectId(val);
  //   if (res === true) {
  //     return val;
  //   }
  //   throw new Error(res + ': ' + val + '\n');
  // }

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

  // ********************************************************************
  // Update Metadata

  @Option({
    flags: '-n, --name [name]',
    description: 'The name of the project',
    // defaultValue: 'default-project-name',
  })
  parseName(val: string): string {
    const res = validateProjectName(val);
    if (res === true) {
      return val;
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-s, --status [status]',
    description: 'The status of the project',
    // defaultValue: 'PLANNED',
  })
  parseStatus(val: string): string {
    const res = validateProjectStatus(val);
    if (res === true) {
      return val;
    }
    throw new Error(res + ': ' + val + '\n');
  }

  // ********************************************************************
  // Update Dates

  // @Option({
  //   flags: '-c, --createdBy [createdBy]',
  //   description: 'The user who created the project',
  //   // defaultValue: 'default-created-by',
  // })
  // parseCreatedBy(val: string): string {
  //   const res = validateUserId(val);
  //   if (res === true) {
  //     return val;
  //   }
  //   throw new Error(res + ': ' + val + '\n');
  // }

  // @Option({
  //   flags: '-d, --createdAt [createdAt]',
  //   description: 'The date when the project was created',
  //   // defaultValue: 'default-created-date',
  // })
  // parseCreatedAt(val: string): string {
  //   const res = validateCreatedAt(val);
  //   if (res === true) {
  //     return new Date(val).toISOString();
  //   }
  //   throw new Error(res + ': ' + val + '\n');
  // }

  @Option({
    flags: '-b, --updatedBy [updatedBy]',
    description: 'The user who last updated the project',
    // defaultValue: 'default-updated-by',
  })
  parseUpdatedBy(val: string): string {
    const res = validateUserId(val);
    if (res === true) {
      return val;
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-e, --updatedAt [updatedAt]',
    description: 'The date when the project was last updated',
    // defaultValue: 'default-updated-date',
  })
  parseUpdatedAt(val: string): string {
    const res = validateUpdatedAt(val);
    if (res === true) {
      return new Date(val).toISOString();
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-s, --startedBy [startedBy]',
    description: 'The user who started the project',
    // defaultValue: 'default-started-by',
  })
  parseStartedBy(val: string): string {
    const res = validateUserId(val);
    if (res === true) {
      return val;
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-t, --startedAt [startedAt]',
    description: 'The date when the project was started',
    // defaultValue: 'default-started-date',
  })
  parseStartedAt(val: string): string {
    const res = validateStartedAt(val);
    if (res === true) {
      return new Date(val).toISOString();
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-a, --startDate [startDate]',
    description: 'The start date of the project',
    // defaultValue: 'default-start-date',
  })
  parseStartDate(val: string): string {
    const res = validateStartDate(val);
    if (res === true) {
      return new Date(val).toISOString();
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-z, --endDate [endDate]',
    description: 'The end date of the project',
    // defaultValue: 'default-end-date',
  })
  parseEndDate(val: string): string {
    const res = validateEndDate(val);
    if (res === true) {
      return new Date(val).toISOString();
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-m, --completedBy [completedBy]',
    description: 'The user who completed the project',
    // defaultValue: 'default-completed-by',
  })
  parseCompletedBy(val: string): string {
    const res = validateUserId(val);
    if (res === true) {
      return val;
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-p, --completedAt [completedAt]',
    description: 'The date when the project was completed',
    // defaultValue: 'default-completed-date',
  })
  parseCompletedAt(val: string): string {
    const res = validateCompletedAt(val);
    if (res === true) {
      return new Date(val).toISOString();
    }
    throw new Error(res + ': ' + val + '\n');
  }

  // ********************************************************************
  // Update Content

  @Option({
    flags: '-d, --description [description]',
    description: 'The description of the project',
    // defaultValue: 'default-project-description',
  })
  parseDescription(val: string): string {
    return val;
  }

  @Option({
    flags: '-t, --iterations [iterations]',
    description: 'The iterations of the project',
    // defaultValue: 'default-project-iterations',
  })
  parseIterations(val: string): IdUuidStatusDTO[] {
    const items: IdUuidStatusDTO[] = convertStringToIdUuidStatusArray(val);
    if (!isValidIdUuidStatusArray(items)) {
      throw new Error(
        UpdateProjectMetadataCommand.name +
          ': Invalid user ID, UUID, Status in the list: ' +
          val,
      );
    }
    return items;
  }

  @Option({
    flags: '-l, --backlog [backlog]',
    description: 'The backlog of the project',
    // defaultValue: 'default-project-backlog',
  })
  parseBacklog(val: string): IdUuidStatusDTO[] {
    const items: IdUuidStatusDTO[] = convertStringToIdUuidStatusArray(val);
    if (!isValidIdUuidStatusArray(items)) {
      throw new Error(
        UpdateProjectMetadataCommand.name +
          ': Invalid user ID, UUID, Status in the list: ' +
          val,
      );
    }
    return items;
  }

  @Option({
    flags: '-m, --team [team]',
    description: 'The team of the project',
    // defaultValue: 'default-project-team',
  })
  parseTeam(val: string): IdUuidDTO | string {
    if (val.trim() === '' || val.trim().toLowerCase() === 'n/a') {
      return '';
    }
    const res = validateIdUuid(val);
    if (res === true) {
      return convertStringToIdUuidDTO(val);
    }
    throw new Error(res + ': ' + val + '\n');
  }
}

// npm run build
// nestjs build
// node ./dist/cmd.main project update-metadata --help
// node ./dist/cmd.main project update-metadata --uuid 4128dc31-762f-4417-b9c3-a81a92c7d4f9
// node ./dist/cmd.main project update-metadata --uuid 4128dc31-762f-4417-b9c3-a81a92c7d4f9 --name 'ABC Project' --status PLANNED --createdBy 'john.doe' --createdAt '2021-08-15T12:00:00Z' --updatedBy 'john.doe' --updatedAt '2021-08-15T12:00:00Z' --startedBy 'john.doe' --startedAt '2021-08-15T12:00:00Z' --startDate '2021-08-15T12:00:00Z' --endDate '2021-08-15T12:00:00Z' --description 'Project Description ABC' --iterations 'n/a' --backlog 'n/a' --team 'n/a'
// node ./dist/cmd.main project update-metadata --uuid 4128dc31-762f-4417-b9c3-a81a92c7d4f9 --name 'ABC Project' --description 'Project Description ABC'
