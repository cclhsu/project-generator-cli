import { Injectable, Logger } from '@nestjs/common';
import * as path from 'path';
import { getProjectPath } from '../../common/command/utils/common-command.utils';
import { ProjectCommandOptionsDTO } from '../../common/command/dto/project-command-options.dto';
import {
  convertObjectValuesToString,
  copyTemplateFilesToProjectDir,
} from '../../utils/template/template.utils';

@Injectable()
export class RustService {
  private readonly logger = new Logger(RustService.name);
  constructor() {}

  public async init(
    projectCommandOptionsDTO: ProjectCommandOptionsDTO,
  ): Promise<void> {
    this.logger.debug('>>> initializing rust project');

    const currentFilePath: string = path.dirname(__dirname);
    this.logger.debug(`currentFilePath: ${currentFilePath}`);

    const projectLanguage: string =
      projectCommandOptionsDTO.projectLanguage || 'rust';
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
    this.logger.debug('>>> Building rust project');
    throw new Error('Method not implemented.');
  }

  public async run(
    projectCommandOptionsDTO: ProjectCommandOptionsDTO,
  ): Promise<void> {
    this.logger.debug('>>> Running rust project');
    throw new Error('Method not implemented.');
  }

  public async test(
    projectCommandOptionsDTO: ProjectCommandOptionsDTO,
  ): Promise<void> {
    this.logger.debug('>>> Testing rust project');
    throw new Error('Method not implemented.');
  }

  public async clean(
    projectCommandOptionsDTO: ProjectCommandOptionsDTO,
  ): Promise<void> {
    this.logger.debug('>>> Cleaning rust project');
    throw new Error('Method not implemented.');
  }
}
