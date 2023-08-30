import { ConsoleLogger, Module } from '@nestjs/common';
import { CsvModule } from './utils/csv/csv.module';
import { JsonModule } from './utils/json/json.module';
import { YamlModule } from './utils/yaml/yaml.module';
import { MarkdownModule } from './utils/markdown/markdown.module';
import { HelloModule } from './hello/hello.module';
// import { UserModule } from './user/user.module';
import { CommonCommandModule } from './common/command/common-command.module';
import { ConfigModule } from './config/config.module';
import { GoModule } from './project-language/go/go.module';
import { Python3Module } from './project-language/python3/python3.module';
import { RustModule } from './project-language/rust/rust.module';
import { TypescriptModule } from './project-language/typescript/typescript.module';
import { DocumentModule } from './project-document/document.module';
import { ProjectSuiteModule } from './project-suite/project-suite.module';
import { ProjectModule } from './scrum/project/project.module';
import { IterationModule } from './scrum/iteration/iteration.module';
import { TaskModule } from './scrum/task/task.module';
import { TeamModule } from './scrum/team/team.module';
import { UserModule } from './scrum/user/user.module';
import { MetricModule } from './scrum/metric/metric.module';
import { MessageModule } from './scrum/message/message.module';

@Module({
  imports: [
    JsonModule,
    YamlModule,
    CsvModule,
    MarkdownModule,
    HelloModule,
    CommonCommandModule,
    ConfigModule,
    GoModule,
    Python3Module,
    RustModule,
    TypescriptModule,
    DocumentModule,
    ProjectSuiteModule,
    UserModule,
    TeamModule,
    ProjectModule,
    IterationModule,
    TaskModule,
    MetricModule,
    MessageModule,
  ],
  controllers: [],
  providers: [ConsoleLogger],
})
export class CmdModule {}
