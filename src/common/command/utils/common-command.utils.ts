import { InquirerService } from 'nest-commander';
import { ConfigService } from 'src/config/config.service';
import { getProjectName } from 'src/utils/project-name/project-name.utils';
import { GitProviderAnswerDTO } from '../dto/git-provider-answer.dto';
import { ProjectCommandOptionsDTO } from '../dto/project-command-options.dto';
import { ProjectCommonCommandOptionsDTO } from '../dto/project-common-command-options.dto';
import { ProjectLanguageAnswerDTO } from '../dto/project-language-answer.dto';
import { ProjectNameAnswerDTO } from '../dto/project-name-answer.dto';
import { ProjectSkeletonAnswerDTO } from '../dto/project-skeleton-answer.dto';
import { ProjectTypeAnswerDTO } from '../dto/project-type-answer.dto';
import { ProjectUserAnswerDTO } from '../dto/project-user-answer.dto';
import { resolveHomePath } from 'src/utils/path/path.utils';
import { SrcRootAnswerDTO } from '../dto/src-root-answer.dto';
import { TicketNumberAnswerDTO } from '../dto/ticket-number-answer.dto';

export async function getProjectCommandOptionsDTO(
  configService: ConfigService,
  inquirer: InquirerService,
  options: Record<string, any> | undefined,
): Promise<ProjectCommandOptionsDTO> {
  let projectCommonCommandOptionsDTO: ProjectCommonCommandOptionsDTO = {};
  const packageProjectName: string = getProjectName();
  if (configService.isConfigFileExists(packageProjectName)) {
    projectCommonCommandOptionsDTO = await configService.getConfig(
      packageProjectName,
    );
  }

  const projectCommandOptionsDTO: ProjectCommandOptionsDTO = {
    ...projectCommonCommandOptionsDTO,
    ...options,
  };

  while (!projectCommandOptionsDTO.srcRoot) {
    projectCommandOptionsDTO.srcRoot = (
      await inquirer.ask<SrcRootAnswerDTO>('src-root-questions', options)
    ).srcRoot;
  }

  while (!projectCommandOptionsDTO.gitProvider) {
    projectCommandOptionsDTO.gitProvider = (
      await inquirer.ask<GitProviderAnswerDTO>(
        'git-provider-questions',
        options,
      )
    ).gitProvider;
  }

  while (!projectCommandOptionsDTO.projectLanguage) {
    projectCommandOptionsDTO.projectLanguage = (
      await inquirer.ask<ProjectLanguageAnswerDTO>(
        'project-language-questions',
        options,
      )
    ).projectLanguage;
  }

  while (!projectCommandOptionsDTO.projectType) {
    projectCommandOptionsDTO.projectType = (
      await inquirer.ask<ProjectTypeAnswerDTO>(
        'project-type-questions',
        options,
      )
    ).projectType;
  }

  while (!projectCommandOptionsDTO.projectSkeleton) {
    projectCommandOptionsDTO.projectSkeleton = (
      await inquirer.ask<ProjectSkeletonAnswerDTO>(
        'project-skeleton-questions',
        options,
      )
    ).projectSkeleton;
  }

  // if (!projectCommandOptionsDTO.projectTeam) {
  //   projectCommandOptionsDTO.projectTeam = (
  //     await inquirer.ask<ProjectTeamAnswerDTO>(
  //       'project-team-questions',
  //       options,
  //     )
  //   ).projectTeam;
  // }

  while (!projectCommandOptionsDTO.projectUser) {
    projectCommandOptionsDTO.projectUser = (
      await inquirer.ask<ProjectUserAnswerDTO>(
        'project-user-questions',
        options,
      )
    ).projectUser;
  }

  if (!projectCommandOptionsDTO.ticketNumber) {
    projectCommandOptionsDTO.ticketNumber = (
      await inquirer.ask<TicketNumberAnswerDTO>(
        'ticket-number-questions',
        options,
      )
    ).ticketNumber;
  }

  while (!projectCommandOptionsDTO.projectName) {
    projectCommandOptionsDTO.projectName = (
      await inquirer.ask<ProjectNameAnswerDTO>(
        'project-name-questions',
        options,
      )
    ).projectName;
  }

  // if (!projectCommandOptionsDTO.moduleName) {
  //   projectCommandOptionsDTO.moduleName = (
  //     await inquirer.ask<ModuleNameAnswerDTO>('module-name-questions', options)
  //   ).moduleName;
  // }

  const { srcRoot } = projectCommandOptionsDTO;
  const { gitProvider } = projectCommandOptionsDTO;
  const { projectLanguage } = projectCommandOptionsDTO;
  const { projectType } = projectCommandOptionsDTO;
  const { projectSkeleton } = projectCommandOptionsDTO;
  // const { projectTeam } = projectCommandOptionsDTO;
  const { projectUser } = projectCommandOptionsDTO;
  const { ticketNumber } = projectCommandOptionsDTO;
  const { projectName } = projectCommandOptionsDTO;
  // const { moduleName } = projectCommandOptionsDTO;

  displayProjectOptionsResults(
    srcRoot ?? 'N/A',
    gitProvider ?? 'N/A',
    projectLanguage ?? 'N/A',
    projectType ?? 'N/A',
    projectSkeleton ?? 'N/A',
    // projectTeam ?? 'N/A',
    projectUser ?? 'N/A',
    ticketNumber ?? 'N/A',
    projectName ?? 'N/A',
    // moduleName ?? 'N/A',
  );

  return projectCommandOptionsDTO;
}

function displayProjectOptionsResults(
  srcRoot: string,
  gitProvider: string,
  projectLanguage: string,
  projectType: string,
  projectSkeleton: string,
  // projectTeam: string,
  projectUser: string,
  ticketNumber: string,
  projectName: string,
  // moduleName: string,
): void {
  console.log(`srcRoot: ${srcRoot}`);
  console.log(`gitProvider: ${gitProvider}`);
  console.log(`projectLanguage: ${projectLanguage}`);
  console.log(`projectType: ${projectType}`);
  console.log(`projectSkeleton: ${projectSkeleton}`);
  // console.log(`projectTeam: ${projectTeam}`);
  console.log(`projectUser: ${projectUser}`);
  console.log(`ticketNumber: ${ticketNumber}`);
  console.log(`projectName: ${projectName}`);
  // console.log(`moduleName: ${moduleName}`);
}

export function getProjectPath(
  projectCommandOptionsDTO: ProjectCommandOptionsDTO,
): string {
  // const projectName = `${projectCommandOptionsDTO.projectName}-${projectCommandOptionsDTO.projectType}`;
  const projectName = projectCommandOptionsDTO.ticketNumber
    ? `${projectCommandOptionsDTO.projectLanguage}-${projectCommandOptionsDTO.ticketNumber}-${projectCommandOptionsDTO.projectName}-${projectCommandOptionsDTO.projectType}`
    : `${projectCommandOptionsDTO.projectLanguage}-${projectCommandOptionsDTO.projectName}-${projectCommandOptionsDTO.projectType}`;
  const projectPath: string = [
    projectCommandOptionsDTO.srcRoot,
    projectCommandOptionsDTO.gitProvider,
    projectCommandOptionsDTO.projectUser,
    projectName,
  ].join('/');
  return resolveHomePath(projectPath);
}
