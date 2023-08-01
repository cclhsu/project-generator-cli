import { InquirerService } from 'nest-commander';
import { ConfigService } from 'src/config/config.service';
// import { ModuleNameAnswerDto } from './dto/module-name-answer.dto';
// import { ProjectTeamAnswerDto } from './dto/project-team-answer.dto';
import { GitProviderAnswerDto } from './dto/git-provider-answer.dto';
import { ProjectCommandOptionsDto } from './dto/project-command-options.dto';
import { ProjectCommonCommandOptionsDto } from './dto/project-common-command-options.dto';
import { ProjectLanguageAnswerDto } from './dto/project-language-answer.dto';
import { ProjectNameAnswerDto } from './dto/project-name-answer.dto';
import { ProjectSkeletonAnswerDto } from './dto/project-skeleton-answer.dto';
import { ProjectTypeAnswerDto } from './dto/project-type-answer.dto';
import { ProjectUserAnswerDto } from './dto/project-user-answer.dto';
import { SrcRootAnswerDto } from './dto/src-root-answer.dto';
import { TicketNumberAnswerDto } from './dto/ticket-number-answer.dto';
import { resolveHomePath } from 'src/utils/path/path.utils';
import { getProjectName } from 'src/utils/project-name/project-name.utils';

export async function getProjectCommandOptionsDto(
  configService: ConfigService,
  inquirer: InquirerService,
  options: Record<string, any> | undefined,
): Promise<ProjectCommandOptionsDto> {
  let projectCommonCommandOptionsDto: ProjectCommonCommandOptionsDto = {};
  const packageProjectName: string = getProjectName();
  if (configService.isConfigFileExists(packageProjectName)) {
    projectCommonCommandOptionsDto = await configService.getConfig(
      packageProjectName,
    );
  }

  const projectCommandOptionsDto: ProjectCommandOptionsDto = {
    ...projectCommonCommandOptionsDto,
    ...options,
  };

  while (!projectCommandOptionsDto.srcRoot) {
    projectCommandOptionsDto.srcRoot = (
      await inquirer.ask<SrcRootAnswerDto>('src-root-questions', options)
    ).srcRoot;
  }

  while (!projectCommandOptionsDto.gitProvider) {
    projectCommandOptionsDto.gitProvider = (
      await inquirer.ask<GitProviderAnswerDto>(
        'git-provider-questions',
        options,
      )
    ).gitProvider;
  }

  while (!projectCommandOptionsDto.projectLanguage) {
    projectCommandOptionsDto.projectLanguage = (
      await inquirer.ask<ProjectLanguageAnswerDto>(
        'project-language-questions',
        options,
      )
    ).projectLanguage;
  }

  while (!projectCommandOptionsDto.projectType) {
    projectCommandOptionsDto.projectType = (
      await inquirer.ask<ProjectTypeAnswerDto>(
        'project-type-questions',
        options,
      )
    ).projectType;
  }

  while (!projectCommandOptionsDto.projectSkeleton) {
    projectCommandOptionsDto.projectSkeleton = (
      await inquirer.ask<ProjectSkeletonAnswerDto>(
        'project-skeleton-questions',
        options,
      )
    ).projectSkeleton;
  }

  // if (!projectCommandOptionsDto.projectTeam) {
  //   projectCommandOptionsDto.projectTeam = (
  //     await inquirer.ask<ProjectTeamAnswerDto>(
  //       'project-team-questions',
  //       options,
  //     )
  //   ).projectTeam;
  // }

  while (!projectCommandOptionsDto.projectUser) {
    projectCommandOptionsDto.projectUser = (
      await inquirer.ask<ProjectUserAnswerDto>(
        'project-user-questions',
        options,
      )
    ).projectUser;
  }

  if (!projectCommandOptionsDto.ticketNumber) {
    projectCommandOptionsDto.ticketNumber = (
      await inquirer.ask<TicketNumberAnswerDto>(
        'ticket-number-questions',
        options,
      )
    ).ticketNumber;
  }

  while (!projectCommandOptionsDto.projectName) {
    projectCommandOptionsDto.projectName = (
      await inquirer.ask<ProjectNameAnswerDto>(
        'project-name-questions',
        options,
      )
    ).projectName;
  }

  // if (!projectCommandOptionsDto.moduleName) {
  //   projectCommandOptionsDto.moduleName = (
  //     await inquirer.ask<ModuleNameAnswerDto>('module-name-questions', options)
  //   ).moduleName;
  // }

  const { srcRoot } = projectCommandOptionsDto;
  const { gitProvider } = projectCommandOptionsDto;
  const { projectLanguage } = projectCommandOptionsDto;
  const { projectType } = projectCommandOptionsDto;
  const { projectSkeleton } = projectCommandOptionsDto;
  // const { projectTeam } = projectCommandOptionsDto;
  const { projectUser } = projectCommandOptionsDto;
  const { ticketNumber } = projectCommandOptionsDto;
  const { projectName } = projectCommandOptionsDto;
  // const { moduleName } = projectCommandOptionsDto;

  displayResults(
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

  return projectCommandOptionsDto;
}

function displayResults(
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
  projectCommandOptionsDto: ProjectCommandOptionsDto,
): string {
  // const projectName = `${projectCommandOptionsDto.projectName}-${projectCommandOptionsDto.projectType}`;
  const projectName = projectCommandOptionsDto.ticketNumber
    ? `${projectCommandOptionsDto.projectLanguage}-${projectCommandOptionsDto.ticketNumber}-${projectCommandOptionsDto.projectName}-${projectCommandOptionsDto.projectType}`
    : `${projectCommandOptionsDto.projectLanguage}-${projectCommandOptionsDto.projectName}-${projectCommandOptionsDto.projectType}`;
  const projectPath: string = [
    projectCommandOptionsDto.srcRoot,
    projectCommandOptionsDto.gitProvider,
    projectCommandOptionsDto.projectUser,
    projectName,
  ].join('/');
  return resolveHomePath(projectPath);
}
