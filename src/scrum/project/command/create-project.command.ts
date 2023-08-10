import {
  CommandRunner,
  InquirerService,
  Option,
  SubCommand,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { ProjectService } from '../project.service';
import { CreateProjectRequestDTO } from '../dto/create-project-request.dto';
import { ProjectCommandOptionsDTO } from './dto/project-command-options.dto';
import { ProjectMetadataCommandOptionsDTO } from './dto/project-metadata-command-options.dto';
import { ProjectContentCommandOptionsDTO } from './dto/project-content-command-options.dto';
import { UuidAnswerDTO } from '../../common/command/dto/uuid-answer.dto';
import { IdAnswerDTO } from '../../common/command/dto/id-answer.dto';
import { NameAnswerDTO } from '../../common/command/dto/name-answer.dto';
import { getCommonDateCommandOptionsDTO } from '../../common/command/utils/common-date-command.utils';

@Injectable()
@SubCommand({
  name: 'create',
  description: 'A command to create a project',
})
export class CreateProjectCommand extends CommandRunner {
  private readonly logger = new Logger(CreateProjectCommand.name);
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
    this.logger.debug('>>> Creating project');
    // this.logger.debug(passedParams);
    // this.logger.debug(options);

    const projectMetadataCommandOptions: ProjectMetadataCommandOptionsDTO = {
      ID: options?.id ?? '',
      name: options?.name ?? '',
      status: 'PLANNED',
      dates: options?.dates ?? undefined,
    };
    const projectContentCommandOptions: ProjectContentCommandOptionsDTO = {
      description: options?.description ?? '',
      sprints: options?.sprints ?? [],
      backlog: options?.backlog ?? [],
      iterations: options?.iterations ?? [],
      team: options?.team ?? '',
    };
    const projectCommandOptions: ProjectCommandOptionsDTO = {
      UUID: options?.uuid ?? '00000000-0000-0000-0000-000000000000',
      metadata: projectMetadataCommandOptions,
      content: projectContentCommandOptions,
      // ...options,
    };

    // while (!projectCommandOptions.UUID) {
    //   projectCommandOptions.UUID = (
    //     await this.inquirer.ask<UuidAnswerDTO>('uuid-questions', options)
    //   ).UUID;
    // }

    while (!projectCommandOptions.metadata.ID) {
      projectCommandOptions.metadata.ID = (
        await this.inquirer.ask<IdAnswerDTO>('id-questions', options)
      ).ID;
    }

    while (!projectCommandOptions.metadata.name) {
      projectCommandOptions.metadata.name = (
        await this.inquirer.ask<NameAnswerDTO>('name-questions', options)
      ).name;
    }

    // ********************************************************************

    projectCommandOptions.metadata.dates = await getCommonDateCommandOptionsDTO(
      // this.configService,
      this.inquirer,
      options,
    );

    // ********************************************************************

    console.log(projectCommandOptions);

    // ********************************************************************

    const createProjectRequestDTO: CreateProjectRequestDTO = {
      UUID: projectCommandOptions.UUID,
      metadata: new ProjectMetadataCommandOptionsDTO(
        projectCommandOptions.metadata.ID,
        projectCommandOptions.metadata.name,
        projectCommandOptions.metadata.status,
        projectCommandOptions.metadata.dates,
      ),
      content: new ProjectContentCommandOptionsDTO(
        projectCommandOptions.content.description,
        projectCommandOptions.content.sprints,
        projectCommandOptions.content.backlog,
        projectCommandOptions.content.iterations,
        projectCommandOptions.content.team,
      ),
    };

    console.log(createProjectRequestDTO);
    this.projectService.createProject(createProjectRequestDTO);
  }

  // @Option({
  //   flags: '-u, --uuid [UUID]',
  //   description: 'The UUID of the project',
  //   // defaultValue: '00000000-0000-0000-0000-000000000000',
  // })
  // parseUUID(val: string): string {
  //   return val;
  // }

  @Option({
    flags: '-i, --id [id]',
    description: 'The id of the project',
    // defaultValue: 'PPP-0000',
  })
  parseId(val: string): string {
    return val;
  }

  @Option({
    flags: '-n, --name [name]',
    description: 'The name of the project',
    // defaultValue: 'default-project-name',
  })
  parseName(val: string): string {
    return val;
  }

  // ********************************************************************

  @Option({
    flags: '-c, --createdBy [createdBy]',
    description: 'The user who created the project',
    // defaultValue: 'default-created-by',
  })
  parseCreatedBy(val: string): string {
    return val;
  }

  @Option({
    flags: '-d, --createdDate [createdDate]',
    description: 'The date when the project was created',
    // defaultValue: 'default-created-date',
  })
  parseCreatedDate(val: string): string {
    return val;
  }

  @Option({
    flags: '-b, --updatedBy [updatedBy]',
    description: 'The user who last updated the project',
    // defaultValue: 'default-updated-by',
  })
  parseUpdatedBy(val: string): string {
    return val;
  }

  @Option({
    flags: '-e, --updatedDate [updatedDate]',
    description: 'The date when the project was last updated',
    // defaultValue: 'default-updated-date',
  })
  parseUpdatedDate(val: string): string {
    return val;
  }

  @Option({
    flags: '-s, --startedBy [startedBy]',
    description: 'The user who started the project',
    // defaultValue: 'default-started-by',
  })
  parseStartedBy(val: string): string {
    return val;
  }

  @Option({
    flags: '-t, --startedDate [startedDate]',
    description: 'The date when the project was started',
    // defaultValue: 'default-started-date',
  })
  parseStartedDate(val: string): string {
    return val;
  }

  @Option({
    flags: '-a, --startDate [startDate]',
    description: 'The start date of the project',
    // defaultValue: 'default-start-date',
  })
  parseStartDate(val: string): string {
    return val;
  }

  @Option({
    flags: '-z, --endDate [endDate]',
    description: 'The end date of the project',
    // defaultValue: 'default-end-date',
  })
  parseEndDate(val: string): string {
    return val;
  }

  @Option({
    flags: '-m, --completedBy [completedBy]',
    description: 'The user who completed the project',
    // defaultValue: 'default-completed-by',
  })
  parseCompletedBy(val: string): string {
    return val;
  }

  @Option({
    flags: '-p, --completedDate [completedDate]',
    description: 'The date when the project was completed',
    // defaultValue: 'default-completed-date',
  })
  parseCompletedDate(val: string): string {
    return val;
  }

  // ********************************************************************
}

// npm run build
// nestjs build
// node ./dist/cmd.main project create --help
// node ./dist/cmd.main project create
