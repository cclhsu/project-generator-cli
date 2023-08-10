import { Injectable, Logger } from '@nestjs/common';
import * as path from 'path';
import { getProjectPath } from 'src/common/command/utils/common-command.utils';
import { ProjectCommandOptionsDTO } from 'src/common/command/dto/project-command-options.dto';
import {
  convertObjectValuesToString,
  copyTemplateFilesToProjectDir,
} from 'src/utils/template/template.utils';

@Injectable()
export class TypescriptService {
  private readonly logger = new Logger(TypescriptService.name);
  constructor() {}

  public async init(
    projectCommandOptionsDTO: ProjectCommandOptionsDTO,
  ): Promise<void> {
    this.logger.debug('>>> initializing typescript project');

    const currentFilePath: string = path.dirname(__dirname);
    this.logger.debug(`currentFilePath: ${currentFilePath}`);

    const projectLanguage: string =
      projectCommandOptionsDTO.projectLanguage || 'typescript';
    const projectSkeleton: string =
      projectCommandOptionsDTO.projectSkeleton || 'default';
    const templateDirPath: string = path.join(
      currentFilePath,
      'template',
      projectLanguage,
      projectSkeleton,
    );
    this.logger.debug(`templateDirPath: ${templateDirPath}`);

    const projectDirPath: string = getProjectPath(projectCommandOptionsDTO);
    this.logger.debug(`projectPath: ${projectDirPath}`);

    const variables = {
      ...convertObjectValuesToString(projectCommandOptionsDTO),
      TOPIC: `${projectCommandOptionsDTO.projectName}-${projectCommandOptionsDTO.projectType}`,
    };
    copyTemplateFilesToProjectDir(templateDirPath, projectDirPath, variables);
    console.log(`Successfully created go project at ${projectDirPath}`);
  }

  public async build(
    projectCommandOptionsDTO: ProjectCommandOptionsDTO,
  ): Promise<void> {
    this.logger.debug('>>> Building typescript project');
    throw new Error('Method not implemented.');
  }

  public async run(
    projectCommandOptionsDTO: ProjectCommandOptionsDTO,
  ): Promise<void> {
    this.logger.debug('>>> Running typescript project');
    throw new Error('Method not implemented.');
  }

  public async test(
    projectCommandOptionsDTO: ProjectCommandOptionsDTO,
  ): Promise<void> {
    this.logger.debug('>>> Testing typescript project');
    throw new Error('Method not implemented.');
  }

  public async clean(
    projectCommandOptionsDTO: ProjectCommandOptionsDTO,
  ): Promise<void> {
    this.logger.debug('>>> Cleaning typescript project');
    throw new Error('Method not implemented.');
  }
}
