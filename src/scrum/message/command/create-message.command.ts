import {
  CommandRunner,
  InquirerService,
  Option,
  SubCommand,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { MessageService } from '../message.service';
import { validate } from 'class-validator';
import {
  MessageMetadataDTO,
  MessageContentDTO,
  MessageDTO,
  CreateMessageRequestDTO,
} from '../dto';
import { getCommonDateDTO } from '../../../common/command/utils/common-date-command.utils';
import { IdAnswerDTO, MessageNameAnswerDTO } from '../../../common/command/dto';
import {
  validateCompletedAt,
  validateCreatedAt,
  validateEndDate,
  validateStartDate,
  validateStartedAt,
  validateUuid,
  validateUpdatedAt,
  validateUserId,
  validateMessageName,
} from '../../../common/command/validation';

@Injectable()
@SubCommand({
  name: 'create',
  description: 'A command to create a message',
})
export class CreateMessageCommand extends CommandRunner {
  private readonly logger = new Logger(CreateMessageCommand.name);
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
    this.logger.debug('>>> Creating message');
    // this.logger.verbose('passedParam: ' + JSON.stringify(passedParams, null, 2));
    // this.logger.verbose('options: ' + JSON.stringify(options, null, 2));

    const messageMetadata: MessageMetadataDTO = {
      name: options?.name ?? '',
      dates: options?.dates ?? undefined,
    };
    const MessageContent: MessageContentDTO = {};
    const message: MessageDTO = {
      ID: options?.id ?? 'MESSAGE-0000',
      UUID: options?.uuid ?? '00000000-0000-0000-0000-000000000000',
      metadata: messageMetadata,
      content: MessageContent,
      // ...options,
    };

    // ********************************************************************

    while (!message.ID) {
      message.ID = (
        await this.inquirer.ask<IdAnswerDTO>('id-questions', options)
      ).ID;
    }

    // while (!message.UUID) {
    //   message.UUID = (
    //     await this.inquirer.ask<UuidAnswerDTO>('uuid-questions', options)
    //   ).UUID;
    // }

    // ********************************************************************
    // Update Metadata

    while (!message.metadata.name) {
      message.metadata.name = (
        await this.inquirer.ask<MessageNameAnswerDTO>(
          'message-name-questions',
          options,
        )
      ).messageName;
    }

    // ********************************************************************
    // Update Dates

    message.metadata.dates = await getCommonDateDTO(
      // this.configService,
      this.inquirer,
      options,
    );

    // ********************************************************************
    // Update Content

    this.logger.verbose(JSON.stringify(message, null, 2));

    // ********************************************************************

    const createMessageRequestDTO: CreateMessageRequestDTO = {
      ID: message.ID,
      UUID: message.UUID,
      metadata: new MessageMetadataDTO(
        message.metadata.name,
        message.metadata.dates,
      ),
      content: new MessageContentDTO(),
    };

    try {
      this.logger.verbose(JSON.stringify(createMessageRequestDTO, null, 2));
      await this.messageService.createMessage(createMessageRequestDTO);
    } catch (error: any) {
      this.logger.error(error.message);
      this.logger.debug(error.stack);
    }
  }

  @Option({
    flags: '-i, --id [id]',
    description: 'The id of the message',
    // defaultValue: 'PPP-0000',
  })
  parseId(val: string): string {
    // const res = validateMessageId(val);
    // if (res === true) {
    //   return val;
    // }
    // throw new Error(res + ': ' + val + '\n');
    return val;
  }

  // @Option({
  //   flags: '-u, --uuid [UUID]',
  //   description: 'The UUID of the message',
  //   // defaultValue: '00000000-0000-0000-0000-000000000000',
  // })
  // parseUUID(val: string): string {
  //   const res = validateUuid(val);
  //   if (res === true) {
  //     return val;
  //   }
  //   throw new Error(res + ': ' + val + '\n');
  // }

  // ********************************************************************
  // Update Metadata

  @Option({
    flags: '-n, --name [name]',
    description: 'The name of the message',
    // defaultValue: 'default-message-name',
  })
  parseName(val: string): string {
    const res = validateMessageName(val);
    if (res === true) {
      return val;
    }
    throw new Error(res + ': ' + val + '\n');
  }

  // ********************************************************************
  // Update Dates

  @Option({
    flags: '-c, --createdBy [createdBy]',
    description: 'The user who created the message',
    // defaultValue: 'default-created-by',
  })
  parseCreatedBy(val: string): string {
    const res = validateUserId(val);
    if (res === true) {
      return val;
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-d, --createdAt [createdAt]',
    description: 'The date when the message was created',
    // defaultValue: 'default-created-date',
  })
  parseCreatedAt(val: string): string {
    const res = validateCreatedAt(val);
    if (res === true) {
      return new Date(val).toISOString();
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-b, --updatedBy [updatedBy]',
    description: 'The user who last updated the message',
    // defaultValue: 'default-updated-by',
  })
  parseUpdatedBy(val: string): string {
    const res = validateUserId(val);
    if (res === true) {
      return val;
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-e, --updatedAt [updatedAt]',
    description: 'The date when the message was last updated',
    // defaultValue: 'default-updated-date',
  })
  parseUpdatedAt(val: string): string {
    const res = validateUpdatedAt(val);
    if (res === true) {
      return new Date(val).toISOString();
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-s, --startedBy [startedBy]',
    description: 'The user who started the message',
    // defaultValue: 'default-started-by',
  })
  parseStartedBy(val: string): string {
    const res = validateUserId(val);
    if (res === true) {
      return val;
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-t, --startedAt [startedAt]',
    description: 'The date when the message was started',
    // defaultValue: 'default-started-date',
  })
  parseStartedAt(val: string): string {
    const res = validateStartedAt(val);
    if (res === true) {
      return new Date(val).toISOString();
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-a, --startDate [startDate]',
    description: 'The start date of the message',
    // defaultValue: 'default-start-date',
  })
  parseStartDate(val: string): string {
    const res = validateStartDate(val);
    if (res === true) {
      return new Date(val).toISOString();
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-z, --endDate [endDate]',
    description: 'The end date of the message',
    // defaultValue: 'default-end-date',
  })
  parseEndDate(val: string): string {
    const res = validateEndDate(val);
    if (res === true) {
      return new Date(val).toISOString();
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-m, --completedBy [completedBy]',
    description: 'The user who completed the message',
    // defaultValue: 'default-completed-by',
  })
  parseCompletedBy(val: string): string {
    const res = validateUserId(val);
    if (res === true) {
      return val;
    }
    throw new Error(res + ': ' + val + '\n');
  }

  @Option({
    flags: '-p, --completedAt [completedAt]',
    description: 'The date when the message was completed',
    // defaultValue: 'default-completed-date',
  })
  parseCompletedAt(val: string): string {
    const res = validateCompletedAt(val);
    if (res === true) {
      return new Date(val).toISOString();
    }
    throw new Error(res + ': ' + val + '\n');
  }

  // ********************************************************************
  // Update Content

  // ********************************************************************
}

// npm run build
// nestjs build
// node ./dist/cmd.main message create --help
// node ./dist/cmd.main message create --id ABC --name 'Message ABC' --startDate '2021-01-01' --endDate '2021-12-31'
// node ./dist/cmd.main message create --id XYZ --name 'Message XYZ' --createdBy 'Jane Doe' --startDate '2022-01-01' --endDate '2022-12-31'
