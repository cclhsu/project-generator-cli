import { Module } from '@nestjs/common';
// import { TaskController } from './task.controller';
import { ConfigModule } from '../../config/config.module';
import { CommonCommandModule } from '../../common/command/common-command.module';
import { TaskService } from './task.service';
import { TaskLocalRepository as TaskRepository } from './repository/task-local.repository';
// import { TaskPrismaRepository as TaskRepository } from './task/repositories/task-prisma.repository';

import { CsvModule } from '../../utils/csv/csv.module';
import { JsonModule } from '../../utils/json/json.module';
import { YamlModule } from '../../utils/yaml/yaml.module';
import { MarkdownModule } from '../../utils/markdown/markdown.module';
import {
  TaskCommand,
  ListTasksCommand,
  GetTaskCommand,
  CreateTaskCommand,
  UpdateTaskCommand,
  DeleteTaskCommand,
  UpdateTaskContentCommand,
  UpdateTaskMetadataCommand,
  ListTaskIdsAndUUIDsCommand,
  ListTaskIdsUUIDsStatusesCommand,
} from './command';

@Module({
  imports: [ConfigModule, JsonModule, CsvModule, YamlModule, MarkdownModule],
  // controllers: [
  //   TaskController,
  // ],
  providers: [
    CommonCommandModule,
    TaskRepository,
    TaskService,
    TaskCommand,
    ListTasksCommand,
    GetTaskCommand,
    CreateTaskCommand,
    UpdateTaskCommand,
    DeleteTaskCommand,
    UpdateTaskContentCommand,
    UpdateTaskMetadataCommand,
    ListTaskIdsAndUUIDsCommand,
    ListTaskIdsUUIDsStatusesCommand,
  ],
  exports: [TaskService],
})
export class TaskModule {}
