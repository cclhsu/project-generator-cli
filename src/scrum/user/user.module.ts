import { Module } from '@nestjs/common';
// import { UserController } from './user.controller';
import { ConfigModule } from 'src/config/config.module';
import { CommonCommandModule } from '../common/command/common-command.module';
import { UserService } from './user.service';
import { UserLocalRepository as UserRepository } from './repository/user-local.repository';
// import { UserPrismaRepository as UserRepository } from './user/repositories/user-prisma.repository';
import { UserCommand } from './command/user.command';
import { CreateUserCommand } from './command/create-user.command';
import { DeleteUserCommand } from './command/delete-user.command';
import { GetUserCommand } from './command/get-user.command';
import { ListUsersCommand } from './command/list-users.command';
import { UpdateUserCommand } from './command/update-user.command';
import { CsvModule } from 'src/utils/csv/csv.module';
import { JsonModule } from 'src/utils/json/json.module';
import { YamlModule } from 'src/utils/yaml/yaml.module';
import { MarkdownModule } from 'src/utils/markdown/markdown.module';

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
  ],
  exports: [UserService],
})
export class UserModule {}
