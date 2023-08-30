import { Module } from '@nestjs/common';
// import { ProjectSuiteController } from './projectSuite.controller';
import { ProjectSuiteService } from './project-suite.service';
import { ConfigModule } from '../config/config.module';
import { GenerateProjectSuiteCommand } from './command/generate-project-suite.command';
import { GetProjectSuiteVariablesTemplateCommand } from './command/get-project-suite-variables-template.command';
import { ProjectSuiteCommand } from './command/project-suite.command';
import { ProjectSuiteNameQuestions } from './command/question/project-suite-name.question';
import { ProjectSuiteRootPathQuestions } from './command/question/project-suite-root-path.question';
import { ProjectSuiteTypeQuestions } from './command/question/project-suite-type.question';
import { ProjectSuiteVariablesFileNameQuestions } from './command/question/project-suite-variables-file-name.question';
import { ProjectSuiteVariablesFilePathQuestions } from './command/question/project-suite-variables-file-path.question';

@Module({
  imports: [ConfigModule],
  // controllers: [
  //   ProjectSuiteController,
  // ],
  providers: [
    ProjectSuiteService,
    GenerateProjectSuiteCommand,
    GetProjectSuiteVariablesTemplateCommand,
    ProjectSuiteCommand,
    ProjectSuiteNameQuestions,
    ProjectSuiteRootPathQuestions,
    ProjectSuiteTypeQuestions,
    ProjectSuiteVariablesFileNameQuestions,
    ProjectSuiteVariablesFilePathQuestions,
  ],
  exports: [ProjectSuiteService],
})
export class ProjectSuiteModule {}
