import { Module } from '@nestjs/common';
// import { TeamController } from './team.controller';
import { ConfigModule } from 'src/config/config.module';
import { CommonCommandModule } from '../common/command/common-command.module';
import { TeamService } from './team.service';
import { TeamLocalRepository as TeamRepository } from './repository/team-local.repository';
// import { UserPrismaRepository as UserRepository } from './user/repositories/user-prisma.repository';
import { TeamCommand } from './command/team.command';
import { CreateTeamCommand } from './command/create-team.command';
import { DeleteTeamCommand } from './command/delete-team.command';
import { GetTeamCommand } from './command/get-team.command';
import { ListTeamsCommand } from './command/list-teams.command';
import { UpdateTeamCommand } from './command/update-team.command';
import { CsvModule } from 'src/utils/csv/csv.module';
import { JsonModule } from 'src/utils/json/json.module';
import { YamlModule } from 'src/utils/yaml/yaml.module';
import { MarkdownModule } from 'src/utils/markdown/markdown.module';

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
  ],
  exports: [TeamService],
})
export class TeamModule {}
