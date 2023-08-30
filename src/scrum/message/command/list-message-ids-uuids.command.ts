import {
  CommandRunner,
  InquirerService,
  Option,
  SubCommand,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { MessageService } from '../message.service';
import { MessageIdUuidDTO } from '../dto/message-id-uuid.dto';
import { instanceToPlain } from 'class-transformer';

@Injectable()
@SubCommand({
  name: 'list-message-ids-uuids',
  description: 'A command to list messages',
  options: { isDefault: true },
})
export class ListMessageIdsAndUUIDsCommand extends CommandRunner {
  private readonly logger = new Logger(ListMessageIdsAndUUIDsCommand.name);
  constructor(
    private readonly inquirer: InquirerService,
    private readonly messageService: MessageService,
  ) {
    super();
  }

  async run(
    passedParams: string[],
    options?: Record<string, any> | undefined,
  ): Promise<void> {
    this.logger.debug('>>> Listing message');
    // this.logger.verbose('passedParam: ' + JSON.stringify(passedParams, null, 2));
    // this.logger.verbose('options: ' + JSON.stringify(options, null, 2));

    try {
      const messages: MessageIdUuidDTO[] =
        await this.messageService.listMessageIdsAndUUIDs();
      console.log(JSON.stringify(messages, null, 2));
    } catch (error: any) {
      this.logger.error(error.message);
      this.logger.debug(error.stack);
    }
  }
}

// npm run build
// nestjs build
// node ./dist/cmd.main message list --help
// node ./dist/cmd.main message list
