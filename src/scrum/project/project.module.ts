import { Module } from '@nestjs/common';
// import { ProjectController } from './project.controller';
import { ConfigModule } from '../../config/config.module';
import { CommonCommandModule } from '../../common/command/common-command.module';
import { ProjectService } from './project.service';
import { ProjectLocalRepository as ProjectRepository } from './repository/project-local.repository';
// import { ProjectPrismaRepository as ProjectRepository } from './project/repositories/project-prisma.repository';
import { CsvModule } from '../../utils/csv/csv.module';
import { JsonModule } from '../../utils/json/json.module';
import { YamlModule } from '../../utils/yaml/yaml.module';
import { MarkdownModule } from '../../utils/markdown/markdown.module';
import {
  CreateProjectCommand,
  DeleteProjectCommand,
  GetProjectCommand,
  ListProjectsCommand,
  ProjectCommand,
  UpdateProjectCommand,
  UpdateProjectContentCommand,
  UpdateProjectMetadataCommand,
  ListProjectIdsAndUUIDsCommand,
} from './command';

@Module({
  imports: [ConfigModule, JsonModule, CsvModule, YamlModule, MarkdownModule],
  // controllers: [
  //   ProjectController,
  // ],
  providers: [
    CommonCommandModule,
    ProjectRepository,
    ProjectService,
    ProjectCommand,
    ListProjectsCommand,
    GetProjectCommand,
    CreateProjectCommand,
    UpdateProjectCommand,
    DeleteProjectCommand,
    UpdateProjectMetadataCommand,
    UpdateProjectContentCommand,
    ListProjectIdsAndUUIDsCommand,
  ],
  exports: [ProjectService],
})
export class ProjectModule {}
