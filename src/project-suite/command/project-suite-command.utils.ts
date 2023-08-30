import { InquirerService } from 'nest-commander';
import { ConfigService } from '../../config/config.service';
import { ProjectSuiteCommandOptionsDTO } from '../../project-suite/command/dto/project-suite-command-options.dto';
import { TemplateRootAnswerDTO } from '../../common/command/dto/template-root-answer.dto';
import { ProjectSuiteVariablesFilePathAnswerDTO } from './dto/project-suite-variables-file-path-answer.dto';
import { ProjectSuiteVariablesFileNameAnswerDTO } from './dto/project-suite-variables-file-name-answer.dto';
import { ProjectSuiteTypeAnswerDTO } from './dto/project-suite-type-answer.dto';
import { ProjectSuiteRootPathAnswerDTO } from './dto/project-suite-root-path-answer.dto';
import { ProjectSuiteNameAnswerDTO } from './dto/project-suite-name-answer.dto';
import { ProjectSuiteGitProviderAnswerDTO } from './dto/project-suit-git-provider-answer.dto';

export async function getProjectSuiteCommandOptionsDTO(
  configService: ConfigService,
  inquirer: InquirerService,
  options: Record<string, any> | undefined,
): Promise<ProjectSuiteCommandOptionsDTO> {
  const projectSuiteCommandOptionsDTO: ProjectSuiteCommandOptionsDTO = {
    ...options,
  };

  // while (!projectSuiteCommandOptionsDTO.configPath) {
  //   projectSuiteCommandOptionsDTO.configPath = (
  //     await inquirer.ask<ConfigPathAnswerDTO>('config-path-questions', options)
  //   ).configPath;
  // }

  while (!projectSuiteCommandOptionsDTO.templateRoot) {
    projectSuiteCommandOptionsDTO.templateRoot = (
      await inquirer.ask<TemplateRootAnswerDTO>(
        'template-root-questions',
        options,
      )
    ).templateRoot;
  }

  while (!projectSuiteCommandOptionsDTO.projectSuiteVariablesFilePath) {
    projectSuiteCommandOptionsDTO.projectSuiteVariablesFilePath = (
      await inquirer.ask<ProjectSuiteVariablesFilePathAnswerDTO>(
        'project-suite-variables-path-name-questions',
        options,
      )
    ).projectSuiteVariablesFilePath;
  }

  while (!projectSuiteCommandOptionsDTO.projectSuiteVariablesFileName) {
    projectSuiteCommandOptionsDTO.projectSuiteVariablesFileName = (
      await inquirer.ask<ProjectSuiteVariablesFileNameAnswerDTO>(
        'project-suite-variables-file-name-questions',
        options,
      )
    ).projectSuiteVariablesFileName;
  }

  while (!projectSuiteCommandOptionsDTO.projectSuiteType) {
    projectSuiteCommandOptionsDTO.projectSuiteType = (
      await inquirer.ask<ProjectSuiteTypeAnswerDTO>(
        'project-suite-type-questions',
        options,
      )
    ).projectSuiteType;
  }

  while (!projectSuiteCommandOptionsDTO.ProjectSuiteRootPath) {
    projectSuiteCommandOptionsDTO.ProjectSuiteRootPath = (
      await inquirer.ask<ProjectSuiteRootPathAnswerDTO>(
        'project-suite-root-path-questions',
        options,
      )
    ).ProjectSuiteRootPath;
  }

  while (!projectSuiteCommandOptionsDTO.projectSuiteGitProvider) {
    projectSuiteCommandOptionsDTO.projectSuiteGitProvider = (
      await inquirer.ask<ProjectSuiteGitProviderAnswerDTO>(
        'project-suite-git-provider-questions',
        options,
      )
    ).projectSuiteGitProvider;
  }

  while (!projectSuiteCommandOptionsDTO.projectSuiteName) {
    projectSuiteCommandOptionsDTO.projectSuiteName = (
      await inquirer.ask<ProjectSuiteNameAnswerDTO>(
        'project-suite-name-questions',
        options,
      )
    ).projectSuiteName;
  }

  // const { configPath } = projectSuiteCommandOptionsDTO;
  const { templateRoot } = projectSuiteCommandOptionsDTO;
  const { projectSuiteVariablesFilePath } = projectSuiteCommandOptionsDTO;
  const { projectSuiteVariablesFileName } = projectSuiteCommandOptionsDTO;
  const { projectSuiteType } = projectSuiteCommandOptionsDTO;
  const { ProjectSuiteRootPath } = projectSuiteCommandOptionsDTO;
  const { projectSuiteName } = projectSuiteCommandOptionsDTO;

  displayProjectSuiteOptionsResults(
    // configPath ?? 'N/A',
    templateRoot ?? 'N/A',
    projectSuiteVariablesFilePath ?? 'N/A',
    projectSuiteVariablesFileName ?? 'N/A',
    projectSuiteType ?? 'N/A',
    ProjectSuiteRootPath ?? 'N/A',
    projectSuiteName ?? 'N/A',
  );

  return projectSuiteCommandOptionsDTO;
}

function displayProjectSuiteOptionsResults(
  // configPath: string,
  templateRoot: string,
  projectSuiteVariablesFilePath: string,
  projectSuiteVariablesFileName: string,
  projectSuiteType: string,
  ProjectSuiteRootPath: string,
  projectSuiteName: string,
): void {
  // console.log(`configPath: ${configPath}`);
  console.log(`templateRoot: ${templateRoot}`);
  console.log(
    `projectSuiteVariablesFilePath: ${projectSuiteVariablesFilePath}`,
  );
  console.log(
    `projectSuiteVariablesFileName: ${projectSuiteVariablesFileName}`,
  );
  console.log(`projectSuiteType: ${projectSuiteType}`);
  console.log(`ProjectSuiteRootPath: ${ProjectSuiteRootPath}`);
  console.log(`projectSuiteName: ${projectSuiteName}`);
}
