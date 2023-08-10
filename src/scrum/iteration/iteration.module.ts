import { Module } from '@nestjs/common';
// import { IterationController } from './iteration.controller';
import { ConfigModule } from 'src/config/config.module';
import { CommonCommandModule } from '../common/command/common-command.module';
import { IterationService } from './iteration.service';
import { IterationLocalRepository as IterationRepository } from './repository/iteration-local.repository';
// import { UserPrismaRepository as UserRepository } from './user/repositories/user-prisma.repository';
import { IterationCommand } from './command/iteration.command';
import { ListIterationsCommand } from './command/list-iterations.command';
import { GetIterationCommand } from './command/get-iteration.command';
import { CreateIterationCommand } from './command/create-iteration.command';
import { UpdateIterationCommand } from './command/update-iteration.command';
import { DeleteIterationCommand } from './command/delete-iteration.command';
import { CsvModule } from 'src/utils/csv/csv.module';
import { JsonModule } from 'src/utils/json/json.module';
import { YamlModule } from 'src/utils/yaml/yaml.module';
import { MarkdownModule } from 'src/utils/markdown/markdown.module';

@Module({
  imports: [ConfigModule, JsonModule, CsvModule, YamlModule, MarkdownModule],
  // controllers: [
  //   IterationController,
  // ],
  providers: [
    CommonCommandModule,
    IterationRepository,
    IterationService,
    IterationCommand,
    ListIterationsCommand,
    GetIterationCommand,
    CreateIterationCommand,
    UpdateIterationCommand,
    DeleteIterationCommand,
  ],
  exports: [IterationService],
})
export class IterationModule {}
