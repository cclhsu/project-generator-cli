import { Injectable, Logger } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs-extra';
import {
  createDocumentationDirectory,
  getOrCreateProjectDirectory,
  getProjectDirectoryPath,
  getDocumentDirectoryPath,
} from '../utils/directory/directory.utils';
import { createGitRepository, gitCommit } from '../utils/git/git.utils';
import { createTypescriptGitignoreFile } from '../utils/git/gitignore.utils';
import { ProjectSuiteCommandOptionsDTO } from '../project-suite/command/dto/project-suite-command-options.dto';
import {
  createCmdShFileFromTemplate,
  createFilesFromTemplate,
  createLicenseFileFromTemplate,
  createMakefileFromTemplate,
  createReadmeFileFromTemplate,
  getTemplateRootPath,
} from '../utils/template/template.utils';
import {
  DEFAULT_VARIABLE_FILE_PATH,
  DEFAULT_DOCUMENT_FILE_PATH,
  PROJECT_NOTE_FILES,
  DEFAULT_GIT_PROVIDER,
  PROJECT_LANGUAGE_TYPE_ARRAY,
  DEFAULT_PROJECT_SUITE_NAME,
  PROJECT_TEMPLATE_TYPE_ARRAY,
  DEFAULT_NOTE_TEMPLATE_FILE_PATH,
  DEFAULT_PROJECT_SUITE_VARIABLE_TEMPLATE_FILE_PATH,
} from '../common/constant';
import { resolveHomePath } from '../utils/path/path.utils';
import { getProjectRootPath } from '../utils/project-name/project-name.utils';
import { addLeadingZeros } from '../utils/string/string.utils';

@Injectable()
export class ProjectSuiteService {
  private readonly logger = new Logger(ProjectSuiteService.name);
  constructor() {}

  public async getVariablesTemplate(
    projectSuiteCommandOptionsDTO: ProjectSuiteCommandOptionsDTO,
  ): Promise<void> {
    this.logger.debug('>>> Copying variables template');

    const sourceTemplateFilePath: string = path.join(
      getTemplateRootPath(),
      DEFAULT_PROJECT_SUITE_VARIABLE_TEMPLATE_FILE_PATH,
    );
    this.logger.debug(`sourceTemplateFilePath: ${sourceTemplateFilePath}`);

    const destinationTemplateFilePath: string = path.join(
      projectSuiteCommandOptionsDTO.projectSuiteVariablesFilePath ??
        DEFAULT_VARIABLE_FILE_PATH,
      projectSuiteCommandOptionsDTO.projectSuiteVariablesFileName ??
        'project-suite-variables.json',
    );
    if (fs.existsSync(destinationTemplateFilePath)) {
      throw new Error(
        `Variables file already exists at ${destinationTemplateFilePath}`,
      );
    }
    this.logger.debug(
      `destinationTemplateFilePath: ${destinationTemplateFilePath}`,
    );

    fs.copyFile(
      sourceTemplateFilePath,
      destinationTemplateFilePath,
      (error) => {
        if (error) {
          console.error(error);
          throw error;
        }
        console.log(
          `Successfully copied variables template to ${destinationTemplateFilePath}`,
        );
      },
    );
  }

  async generateSingleProject(
    projectType: string,
    projectSuiteCommandOptionsDTO: ProjectSuiteCommandOptionsDTO,
  ) {
    const projectDirPath = await getOrCreateProjectDirectory(
      projectSuiteCommandOptionsDTO.ProjectSuiteRootPath ??
        DEFAULT_DOCUMENT_FILE_PATH,
      projectSuiteCommandOptionsDTO.projectSuiteGitProvider ??
        DEFAULT_GIT_PROVIDER,
      projectSuiteCommandOptionsDTO.projectSuiteName ??
        DEFAULT_PROJECT_SUITE_NAME,
      projectType,
    );

    // read from project variables file
    const projectVariables: Record<string, string> =
      this.readContentFromProjectVariableFile(projectSuiteCommandOptionsDTO);

    const variables: Record<string, string> = {
      ...projectSuiteCommandOptionsDTO,
      ...projectVariables,
    };

    await Promise.all([
      createCmdShFileFromTemplate(
        undefined,
        path.join(projectDirPath, 'cmd.sh'),
        variables,
      ),
      createLicenseFileFromTemplate(
        undefined,
        path.join(projectDirPath, 'LICENSE'),
        variables,
      ),
      createMakefileFromTemplate(
        undefined,
        path.join(projectDirPath, 'Makefile'),
        variables,
      ),
      createReadmeFileFromTemplate(
        undefined,
        path.join(projectDirPath, 'README.md'),
        variables,
      ),
      createTypescriptGitignoreFile(projectDirPath),
    ]);
  }

  private readContentFromProjectVariableFile(
    projectSuiteCommandOptionsDTO: ProjectSuiteCommandOptionsDTO,
  ): Record<string, string> {
    const projectVariablesFilePath: string = path.join(
      projectSuiteCommandOptionsDTO.projectSuiteVariablesFilePath ??
        DEFAULT_VARIABLE_FILE_PATH,
      projectSuiteCommandOptionsDTO.projectSuiteVariablesFileName ??
        'project-suite-variables.json',
    );
    const resolvedProjectVariablesFilePath: string = resolveHomePath(
      projectVariablesFilePath,
    );
    if (!fs.existsSync(resolvedProjectVariablesFilePath)) {
      throw new Error(
        `Variables file not found at ${resolvedProjectVariablesFilePath}`,
      );
    }
    const projectVariables: Record<string, string> = fs.readJSONSync(
      resolvedProjectVariablesFilePath,
    );
    return projectVariables;
  }

  async commitProjectSuite(
    projectType: string,
    projectSuiteCommandOptionsDTO: ProjectSuiteCommandOptionsDTO,
  ) {
    const projectDirPath = await getProjectDirectoryPath(
      projectSuiteCommandOptionsDTO.ProjectSuiteRootPath ??
        DEFAULT_DOCUMENT_FILE_PATH,
      projectSuiteCommandOptionsDTO.projectSuiteGitProvider ??
        DEFAULT_GIT_PROVIDER,
      projectSuiteCommandOptionsDTO.projectSuiteName ??
        DEFAULT_PROJECT_SUITE_NAME,
      projectType,
    );

    await createGitRepository(projectDirPath);
  }

  async generateProjectSuiteDocumentation(
    projectType: string,
    projectSuiteCommandOptionsDTO: ProjectSuiteCommandOptionsDTO,
    incrementedProjectTypeKey: number,
  ): Promise<void> {
    const projectDocPath = await createDocumentationDirectory(
      projectSuiteCommandOptionsDTO.ProjectSuiteRootPath ??
        DEFAULT_DOCUMENT_FILE_PATH,
      projectSuiteCommandOptionsDTO.projectSuiteGitProvider ??
        DEFAULT_GIT_PROVIDER,
      projectSuiteCommandOptionsDTO.projectSuiteName ??
        DEFAULT_PROJECT_SUITE_NAME,
      projectType,
      incrementedProjectTypeKey,
    );
    console.log(`Documentation directories created for ${projectDocPath}.`);
  }

  async commitProjectSuiteDocumentation(
    projectType: string,
    projectSuiteCommandOptionsDTO: ProjectSuiteCommandOptionsDTO,
  ) {
    const projectDocumentDirPath = await getProjectDirectoryPath(
      projectSuiteCommandOptionsDTO.ProjectSuiteRootPath ??
        DEFAULT_DOCUMENT_FILE_PATH,
      projectSuiteCommandOptionsDTO.projectSuiteGitProvider ??
        DEFAULT_GIT_PROVIDER,
      projectSuiteCommandOptionsDTO.projectSuiteName ??
        DEFAULT_PROJECT_SUITE_NAME,
      'document',
    );

    const projectName =
      projectSuiteCommandOptionsDTO.projectSuiteName ??
      DEFAULT_PROJECT_SUITE_NAME + '-' + projectType;

    gitCommit(
      projectDocumentDirPath,
      '[PPP-XXXX] chore: Add documentation directories for ' +
        projectName +
        '/' +
        projectType,
    );
  }

  async generateProjectSuiteNotes(
    projectType: string,
    projectSuiteCommandOptionsDTO: ProjectSuiteCommandOptionsDTO,
    incrementedProjectTypeKey: number,
  ): Promise<void> {
    const projectDocumentDirPath = await getProjectDirectoryPath(
      projectSuiteCommandOptionsDTO.ProjectSuiteRootPath ??
        DEFAULT_DOCUMENT_FILE_PATH,
      projectSuiteCommandOptionsDTO.projectSuiteGitProvider ??
        DEFAULT_GIT_PROVIDER,
      projectSuiteCommandOptionsDTO.projectSuiteName ??
        DEFAULT_PROJECT_SUITE_NAME,
      'document',
    );

    const paddedIncrementedProjectTypeKey: string = addLeadingZeros(
      2,
      incrementedProjectTypeKey,
    );

    const docPath: string = path.join(
      projectDocumentDirPath,
      paddedIncrementedProjectTypeKey + '_' + projectType,
      'note',
    );

    const sourceTemplateFilePath: string = path.join(
      getTemplateRootPath(),
      DEFAULT_NOTE_TEMPLATE_FILE_PATH,
    );
    this.logger.debug(`sourceTemplateFilePath: ${sourceTemplateFilePath}`);

    // read from project variables file
    const projectVariables: Record<string, string> =
      this.readContentFromProjectVariableFile(projectSuiteCommandOptionsDTO);

    const variables: Record<string, string> = {
      ...projectSuiteCommandOptionsDTO,
      ...projectVariables,
    };

    await createFilesFromTemplate(
      sourceTemplateFilePath,
      docPath,
      variables,
      PROJECT_NOTE_FILES,
    );
  }

  async commitProjectSuiteNote(
    projectType: string,
    projectSuiteCommandOptionsDTO: ProjectSuiteCommandOptionsDTO,
  ) {
    const projectDocumentDirPath = await getProjectDirectoryPath(
      projectSuiteCommandOptionsDTO.ProjectSuiteRootPath ??
        DEFAULT_DOCUMENT_FILE_PATH,
      projectSuiteCommandOptionsDTO.projectSuiteGitProvider ??
        DEFAULT_GIT_PROVIDER,
      projectSuiteCommandOptionsDTO.projectSuiteName ??
        DEFAULT_PROJECT_SUITE_NAME,
      'document',
    );

    const projectName =
      projectSuiteCommandOptionsDTO.projectSuiteName ??
      DEFAULT_PROJECT_SUITE_NAME + '-' + projectType;

    gitCommit(
      projectDocumentDirPath,
      '[PPP-XXXX] chore: Add Notes for project directories for' +
        projectName +
        '/' +
        projectType,
    );
  }

  async generateProjectSuite(
    projectSuiteCommandOptionsDTO: ProjectSuiteCommandOptionsDTO,
  ): Promise<void> {
    this.logger.debug('>>> generating project-suite');

    try {
      for (let i = 0; i < PROJECT_TEMPLATE_TYPE_ARRAY.length; i++) {
        const projectType = PROJECT_TEMPLATE_TYPE_ARRAY[i];
        const incrementedProjectTypeKey = i + 1;
        this.logger.debug(`projectType: ${projectType}`);
        this.logger.debug(
          `incrementedProjectTypeKey: ${incrementedProjectTypeKey}`,
        );

        await this.generateSingleProject(
          projectType,
          projectSuiteCommandOptionsDTO,
        );

        await this.commitProjectSuite(
          projectType,
          projectSuiteCommandOptionsDTO,
        );
      }

      for (let i = 0; i < PROJECT_TEMPLATE_TYPE_ARRAY.length; i++) {
        const projectType = PROJECT_TEMPLATE_TYPE_ARRAY[i];
        const incrementedProjectTypeKey = i + 1;
        this.logger.debug(`projectType: ${projectType}`);
        this.logger.debug(
          `incrementedProjectTypeKey: ${incrementedProjectTypeKey}`,
        );

        await this.generateProjectSuiteDocumentation(
          projectType,
          projectSuiteCommandOptionsDTO,
          incrementedProjectTypeKey,
        );

        await this.commitProjectSuiteDocumentation(
          projectType,
          projectSuiteCommandOptionsDTO,
        );
      }

      for (let i = 0; i < PROJECT_TEMPLATE_TYPE_ARRAY.length; i++) {
        const projectType = PROJECT_TEMPLATE_TYPE_ARRAY[i];
        const incrementedProjectTypeKey = i + 1;
        this.logger.debug(`projectType: ${projectType}`);
        this.logger.debug(
          `incrementedProjectTypeKey: ${incrementedProjectTypeKey}`,
        );

        await this.generateProjectSuiteNotes(
          projectType,
          projectSuiteCommandOptionsDTO,
          incrementedProjectTypeKey,
        );

        await this.commitProjectSuiteNote(
          projectType,
          projectSuiteCommandOptionsDTO,
        );
      }
    } catch (error: any) {
      console.error('Error creating projects:', error.message);
    }
  }
}
