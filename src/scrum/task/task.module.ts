import { Module } from '@nestjs/common';
// import { TaskController } from './task.controller';
import { ConfigModule } from 'src/config/config.module';
import { CommonCommandModule } from '../common/command/common-command.module';
import { TaskService } from './task.service';
import { TaskLocalRepository as TaskRepository } from './repository/task-local.repository';
// import { UserPrismaRepository as UserRepository } from './user/repositories/user-prisma.repository';
import { TaskCommand } from './command/task.command';
import { ListTasksCommand } from './command/list-tasks.command';
import { GetTaskCommand } from './command/get-task.command';
import { CreateTaskCommand } from './command/create-task.command';
import { UpdateTaskCommand } from './command/update-task.command';
import { DeleteTaskCommand } from './command/delete-task.command';
import { CsvModule } from 'src/utils/csv/csv.module';
import { JsonModule } from 'src/utils/json/json.module';
import { YamlModule } from 'src/utils/yaml/yaml.module';
import { MarkdownModule } from 'src/utils/markdown/markdown.module';

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
  ],
  exports: [TaskService],
})
export class TaskModule {}
