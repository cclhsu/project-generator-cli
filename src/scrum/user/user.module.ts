import { Module } from '@nestjs/common';
// import { UserController } from './user.controller';
import { ConfigModule } from '../../config/config.module';
import { CommonCommandModule } from '../../common/command/common-command.module';
import { UserService } from './user.service';
import { UserLocalRepository as UserRepository } from './repository/user-local.repository';
// import { UserPrismaRepository as UserRepository } from './user/repositories/user-prisma.repository';
import { CsvModule } from '../../utils/csv/csv.module';
import { JsonModule } from '../../utils/json/json.module';
import { YamlModule } from '../../utils/yaml/yaml.module';
import { MarkdownModule } from '../../utils/markdown/markdown.module';
import {
  UserCommand,
  ListUsersCommand,
  GetUserCommand,
  CreateUserCommand,
  UpdateUserCommand,
  DeleteUserCommand,
  UpdateUserMetadataCommand,
  UpdateUserContentCommand,
  ListUserIdsAndUUIDsCommand,
} from './command';

@Module({
  imports: [ConfigModule, JsonModule, CsvModule, YamlModule, MarkdownModule],
  // controllers: [
  //   UserController,
  // ],
  providers: [
    CommonCommandModule,
    UserRepository,
    UserService,
    UserCommand,
    ListUsersCommand,
    GetUserCommand,
    CreateUserCommand,
    UpdateUserCommand,
    DeleteUserCommand,
    UpdateUserMetadataCommand,
    UpdateUserContentCommand,
    ListUserIdsAndUUIDsCommand,
  ],
  exports: [UserService],
})
export class UserModule {}
