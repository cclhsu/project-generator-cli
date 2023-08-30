import { Module } from '@nestjs/common';
// import { IterationController } from './iteration.controller';
import { ConfigModule } from '../../config/config.module';
import { CommonCommandModule } from '../../common/command/common-command.module';
import { IterationService } from './iteration.service';
import { IterationLocalRepository as IterationRepository } from './repository/iteration-local.repository';
// import { IterationPrismaRepository as IterationRepository } from './iteration/repositories/iteration-prisma.repository';
import { CsvModule } from '../../utils/csv/csv.module';
import { JsonModule } from '../../utils/json/json.module';
import { YamlModule } from '../../utils/yaml/yaml.module';
import { MarkdownModule } from '../../utils/markdown/markdown.module';
import {
  IterationCommand,
  ListIterationsCommand,
  GetIterationCommand,
  CreateIterationCommand,
  UpdateIterationCommand,
  DeleteIterationCommand,
  UpdateIterationMetadataCommand,
  UpdateIterationContentCommand,
  ListIterationIdsAndUUIDsCommand,
  ListIterationIdsUUIDsStatusesCommand,
} from './command';

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
    UpdateIterationMetadataCommand,
    UpdateIterationContentCommand,
    ListIterationIdsAndUUIDsCommand,
    ListIterationIdsUUIDsStatusesCommand,
  ],
  exports: [IterationService],
})
export class IterationModule {}
