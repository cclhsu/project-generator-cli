import { Get, Module } from '@nestjs/common';
// import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserLocalRepository as UserRepository } from './repository/user-local.repository';
// import { UserPrismaRepository as UserRepository } from './user/repositories/user-prisma.repository';
import { CreateUserCommand } from './command/create-user.command';
import { DeleteUserCommand } from './command/delete-user.command';
import { EmailQuestions } from './command/question/email.question';
import { GetUserCommand } from './command/get-user.command';
import { ListUsersCommand } from './command/list-users.command';
import { UserNameQuestions } from './command/question/username.question';
import { PhoneQuestions } from './command/question/phone.question';
import { UpdateUserCommand } from './command/update-user.command';
import { UserCommand } from './command/user.command';
import { UuidQuestions } from './command/question/uuid.question';
import { CsvModule } from 'src/utils/csv/csv.module';
import { JsonModule } from 'src/utils/json/json.module';
import { YamlModule } from 'src/utils/yaml/yaml.module';

@Module({
  imports: [JsonModule, CsvModule, YamlModule],
  controllers: [
    // UserController,
  ],
  providers: [
    UserRepository,
    UserService,
    CreateUserCommand,
    DeleteUserCommand,
    EmailQuestions,
    GetUserCommand,
    ListUsersCommand,
    UserNameQuestions,
    PhoneQuestions,
    UpdateUserCommand,
    UserCommand,
    UuidQuestions,
  ],
  exports: [UserService],
})
export class UserModule {}
