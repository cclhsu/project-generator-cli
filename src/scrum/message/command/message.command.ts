import { Command, CommandRunner, InquirerService } from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '../../../config/config.service';
import { MessageService } from '../message.service';
import { ListMessagesCommand } from './list-messages.command';
import { GetMessageCommand } from './get-message.command';
import { CreateMessageCommand } from './create-message.command';
import { UpdateMessageCommand } from './update-message.command';
import { DeleteMessageCommand } from './delete-message.command';
import { UpdateMessageMetadataCommand } from './update-message-metadata.command';
import { UpdateMessageContentCommand } from './update-message-content.command';
import { ListMessageIdsAndUUIDsCommand } from './list-message-ids-uuids.command';

@Injectable()
@Command({
  name: 'message',
  description: 'A set of commands for managing message',
  arguments: '<action> [options]',
  subCommands: [
    ListMessagesCommand,
    GetMessageCommand,
    CreateMessageCommand,
    UpdateMessageCommand,
    DeleteMessageCommand,
    UpdateMessageMetadataCommand,
    UpdateMessageContentCommand,
    ListMessageIdsAndUUIDsCommand,
  ],
})
export class MessageCommand extends CommandRunner {
  private readonly logger = new Logger(MessageCommand.name);
  constructor(
    private readonly inquirer: InquirerService,
    private readonly configService: ConfigService,
    private readonly messageService: MessageService,
  ) {
    super();
  }

  async run(
    passedParams: string[],
    options?: Record<string, any> | undefined,
  ): Promise<void> {
    // throw new Error('Method not implemented.');
    this.logger.debug('>>> Running message command');
  }
}

// npm run build
// nestjs build
// node ./dist/cmd.main message --help
// node ./dist/cmd.main message

// node ./dist/cmd.main message -s src -g github -l message -t library -e message -u user -n message -m module
