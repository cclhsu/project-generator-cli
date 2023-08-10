import { Module } from '@nestjs/common';
// import { ProjectController } from './project.controller';
import { ConfigModule } from 'src/config/config.module';
import { CommonCommandModule } from '../common/command/common-command.module';
import { ProjectService } from './project.service';
import { ProjectLocalRepository as ProjectRepository } from './repository/project-local.repository';
// import { UserPrismaRepository as UserRepository } from './user/repositories/user-prisma.repository';
import { ProjectCommand } from './command/project.command';
import { CreateProjectCommand } from './command/create-project.command';
import { DeleteProjectCommand } from './command/delete-project.command';
import { GetProjectCommand } from './command/get-project.command';
import { ListProjectsCommand } from './command/list-projects.command';
import { UpdateProjectCommand } from './command/update-project.command';
import { CsvModule } from 'src/utils/csv/csv.module';
import { JsonModule } from 'src/utils/json/json.module';
import { YamlModule } from 'src/utils/yaml/yaml.module';
import { MarkdownModule } from 'src/utils/markdown/markdown.module';

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
  ],
  exports: [ProjectService],
})
export class ProjectModule {}
