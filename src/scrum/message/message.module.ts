import { Module } from '@nestjs/common';
// import { MessageController } from './message.controller';
import { ConfigModule } from '../../config/config.module';
import { CommonCommandModule } from '../../common/command/common-command.module';
import { MessageService } from './message.service';
import { MessageLocalRepository as MessageRepository } from './repository/message-local.repository';
// import { MessagePrismaRepository as MessageRepository } from './message/repositories/message-prisma.repository';
import { CsvModule } from '../../utils/csv/csv.module';
import { JsonModule } from '../../utils/json/json.module';
import { YamlModule } from '../../utils/yaml/yaml.module';
import { MarkdownModule } from '../../utils/markdown/markdown.module';
import {
  MessageCommand,
  ListMessagesCommand,
  GetMessageCommand,
  CreateMessageCommand,
  UpdateMessageCommand,
  DeleteMessageCommand,
  UpdateMessageMetadataCommand,
  UpdateMessageContentCommand,
  ListMessageIdsAndUUIDsCommand,
} from './command';

@Module({
  imports: [ConfigModule, JsonModule, CsvModule, YamlModule, MarkdownModule],
  // controllers: [
  //   MessageController,
  // ],
  providers: [
    CommonCommandModule,
    MessageRepository,
    MessageService,
    MessageCommand,
    ListMessagesCommand,
    GetMessageCommand,
    CreateMessageCommand,
    UpdateMessageCommand,
    DeleteMessageCommand,
    UpdateMessageMetadataCommand,
    UpdateMessageContentCommand,
    ListMessageIdsAndUUIDsCommand,
  ],
  exports: [MessageService],
})
export class MessageModule {}
