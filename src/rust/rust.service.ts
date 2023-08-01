import { Injectable, Logger } from '@nestjs/common';
import * as path from 'path';
import { getProjectPath } from 'src/common/command/common-command.utils';
import { ProjectCommandOptionsDto } from 'src/common/command/dto/project-command-options.dto';
import {
  convertObjectValuesToString,
  copyTemplateFiles,
} from 'src/utils/template/template.utils';

@Injectable()
export class RustService {
  private readonly logger = new Logger(RustService.name);
  constructor() {}

  public async init(
    projectCommandOptionsDto: ProjectCommandOptionsDto,
  ): Promise<void> {
    this.logger.log('>>> initializing rust project');

    const currentFilePath: string = path.dirname(__dirname);
    this.logger.debug(`currentFilePath: ${currentFilePath}`);

    const projectLanguage: string =
      projectCommandOptionsDto.projectLanguage || 'rust';
    const projectSkeleton: string =
      projectCommandOptionsDto.projectSkeleton || 'default';
    const templateDirPath: string = path.join(
      currentFilePath,
      'template',
      projectLanguage,
      projectSkeleton,
    );
    this.logger.debug(`templateDirPath: ${templateDirPath}`);

    const projectDirPath: string = getProjectPath(projectCommandOptionsDto);
    this.logger.debug(`projectPath: ${projectDirPath}`);

    const variables = {
      ...convertObjectValuesToString(projectCommandOptionsDto),
      TOPIC: `${projectCommandOptionsDto.projectName}-${projectCommandOptionsDto.projectType}`,
    };
    copyTemplateFiles(templateDirPath, projectDirPath, variables);
    console.log(`Successfully created go project at ${projectDirPath}`);
  }

  public async build(
    projectCommandOptionsDto: ProjectCommandOptionsDto,
  ): Promise<void> {
    this.logger.log('>>> Building rust project');
    throw new Error('Method not implemented.');
  }

  public async run(
    projectCommandOptionsDto: ProjectCommandOptionsDto,
  ): Promise<void> {
    this.logger.log('>>> Running rust project');
    throw new Error('Method not implemented.');
  }

  public async test(
    projectCommandOptionsDto: ProjectCommandOptionsDto,
  ): Promise<void> {
    this.logger.log('>>> Testing rust project');
    throw new Error('Method not implemented.');
  }

  public async clean(
    projectCommandOptionsDto: ProjectCommandOptionsDto,
  ): Promise<void> {
    this.logger.log('>>> Cleaning rust project');
    throw new Error('Method not implemented.');
  }
}
