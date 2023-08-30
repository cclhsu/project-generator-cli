import { Module } from '@nestjs/common';
// import { TeamController } from './team.controller';
import { ConfigModule } from '../../config/config.module';
import { CommonCommandModule } from '../../common/command/common-command.module';
import { TeamService } from './team.service';
import { TeamLocalRepository as TeamRepository } from './repository/team-local.repository';
// import { TeamPrismaRepository as TeamRepository } from './team/repositories/team-prisma.repository';

import { CsvModule } from '../../utils/csv/csv.module';
import { JsonModule } from '../../utils/json/json.module';
import { YamlModule } from '../../utils/yaml/yaml.module';
import { MarkdownModule } from '../../utils/markdown/markdown.module';
import {
  TeamCommand,
  ListTeamsCommand,
  GetTeamCommand,
  CreateTeamCommand,
  UpdateTeamCommand,
  DeleteTeamCommand,
  UpdateTeamMetadataCommand,
  UpdateTeamContentCommand,
  ListTeamIdsAndUUIDsCommand,
} from './command';


@Module({
  imports: [ConfigModule, JsonModule, CsvModule, YamlModule, MarkdownModule],
  // controllers: [
  //   TeamController,
  // ],
  providers: [
    CommonCommandModule,
    TeamRepository,
    TeamService,
    TeamCommand,
    ListTeamsCommand,
    GetTeamCommand,
    CreateTeamCommand,
    UpdateTeamCommand,
    DeleteTeamCommand,
    UpdateTeamMetadataCommand,
    UpdateTeamContentCommand,
    ListTeamIdsAndUUIDsCommand,
  ],
  exports: [TeamService],
})
export class TeamModule {}
