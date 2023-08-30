import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateMessageRequestDTO } from './dto/create-message-request.dto';
import { UpdateMessageRequestDTO } from './dto/update-message-request.dto';
import { MessageResponseDTO } from './dto/message-response.dto';
import { MessageEntity } from './entity/message.entity';
import { MessageLocalRepository as MessageRepository } from './repository/message-local.repository';
import { MessageMetadataDTO } from './dto/message-metadata.dto';
import { MessageContentDTO } from './dto/message-content.dto';
import {
  UpdateMessageContentRequestDTO,
  UpdateMessageMetadataRequestDTO,
  MessageContentResponseDTO,
  MessageMetadataResponseDTO,
  MessageIdUuidDTO,
} from './dto';
import { validate } from 'class-validator';
import { validateDtoMetadataContent } from '../../utils/validation/validation.utils';
import { CommonDateDTO } from '../../common/dto';
import { updateCommonDates } from '../../common/command/utils';

@Injectable()
export class MessageService {
  private readonly logger = new Logger(MessageService.name);

  constructor(private readonly messageRepository: MessageRepository) {}

  async listMessageIdsAndUUIDs(): Promise<MessageIdUuidDTO[]> {
    return this.messageRepository.listMessageIdsAndUUIDs();
  }

  async listMessages(): Promise<MessageResponseDTO[]> {
    const messages = await this.messageRepository.listMessages();
    this.logger.log(`Messages: ${JSON.stringify(messages, null, 2)}`);
    return this.convertToMessageResponseList(messages);
  }

  async getMessage(uuid: string): Promise<MessageResponseDTO> {
    const message = await this.messageRepository.getMessage(uuid);
    if (!message) {
      throw new NotFoundException('Message not found');
    }
    this.logger.log(`Message: ${JSON.stringify(message, null, 2)}`);
    return this.convertToMessageResponse(message);
  }

  async createMessage(
    createMessageRequestDTO: CreateMessageRequestDTO,
  ): Promise<MessageResponseDTO> {
    const {
      ID,
      UUID,
      metadata: { name },
    } = createMessageRequestDTO;

    if (await this.isMessageExist(name, ID, UUID)) {
      throw new Error('Message with the same name, ID, or UUID already exists');
    }

    const error = await validateDtoMetadataContent<CreateMessageRequestDTO>(
      createMessageRequestDTO,
    );
    if (error) {
      throw new Error(error);
    }

    // Create the message
    const message = await this.messageRepository.createMessage(
      createMessageRequestDTO,
    );
    this.logger.log(`Message: ${JSON.stringify(message, null, 2)}`);
    return this.convertToMessageResponse(message);
  }

  async updateMessage(
    uuid: string,
    updateMessageRequestDTO: UpdateMessageRequestDTO,
  ): Promise<MessageResponseDTO> {
    // Check if message exists
    const message = await this.getMessage(uuid);
    if (!message) {
      throw new NotFoundException('Message not found');
    }

    const dates: CommonDateDTO = updateCommonDates(
      message.metadata.dates,
      updateMessageRequestDTO.metadata.dates,
    );
    updateMessageRequestDTO.metadata.dates = dates;

    const error = await validateDtoMetadataContent<UpdateMessageRequestDTO>(
      updateMessageRequestDTO,
    );
    if (error) {
      throw new Error(error);
    }

    // Update the message
    const updatedMessage = await this.messageRepository.updateMessage(
      uuid,
      updateMessageRequestDTO,
    );

    if (!updatedMessage) {
      throw new Error('Failed to update message');
    }

    this.logger.log(`Message: ${JSON.stringify(updatedMessage, null, 2)}`);
    return this.convertToMessageResponse(updatedMessage);
  }

  async deleteMessage(uuid: string): Promise<MessageResponseDTO> {
    // Check if message exists
    const message = await this.getMessage(uuid);
    if (!message) {
      throw new NotFoundException('Message not found');
    }

    // Delete the message
    const deleteMessage = await this.messageRepository.deleteMessage(uuid);
    if (!deleteMessage) {
      throw new Error('Failed to delete message');
    }

    this.logger.log(`Message: ${JSON.stringify(deleteMessage, null, 2)}`);
    return this.convertToMessageResponse(deleteMessage);
  }

  async getMessageByID(ID: string): Promise<MessageResponseDTO> {
    const message = await this.messageRepository.getMessageByID(ID);
    if (!message) {
      throw new NotFoundException('Message not found');
    }
    this.logger.log(`Message: ${JSON.stringify(message, null, 2)}`);
    return this.convertToMessageResponse(message);
  }

  async getMessageByName(name: string): Promise<MessageResponseDTO> {
    const message = await this.messageRepository.getMessageByName(name);
    if (!message) {
      throw new NotFoundException('Message not found');
    }
    this.logger.log(`Message: ${JSON.stringify(message, null, 2)}`);
    return this.convertToMessageResponse(message);
  }

  async listMessagesWithMetadata(): Promise<MessageMetadataResponseDTO[]> {
    const messages = await this.messageRepository.listMessages();
    return messages.map((message) =>
      this.convertToMessageMetadataResponse(message),
    );
  }

  async updateMessageMetadata(
    uuid: string,
    updateMessageMetadataRequestDTO: UpdateMessageMetadataRequestDTO,
  ): Promise<MessageMetadataResponseDTO> {
    // Check if message exists
    const message = await this.getMessage(uuid);
    if (!message) {
      throw new NotFoundException('Message not found');
    }

    const dates: CommonDateDTO = updateCommonDates(
      message.metadata.dates,
      updateMessageMetadataRequestDTO.metadata.dates,
    );
    updateMessageMetadataRequestDTO.metadata.dates = dates;

    // Update the message
    const updatedMessageMetadata: MessageMetadataDTO =
      await this.messageRepository.updateMessageMetadata(
        uuid,
        updateMessageMetadataRequestDTO.metadata,
      );

    if (!updatedMessageMetadata) {
      throw new Error('Failed to update message');
    }

    this.logger.log(
      `Message: ${JSON.stringify(updatedMessageMetadata, null, 2)}`,
    );
    return new MessageMetadataResponseDTO(
      message.ID,
      uuid,
      updatedMessageMetadata,
    );
  }

  async updateMessageContent(
    uuid: string,
    updateMessageContentRequestDTO: UpdateMessageContentRequestDTO,
  ): Promise<MessageContentResponseDTO> {
    // Check if message exists
    const message = await this.getMessage(uuid);
    if (!message) {
      throw new NotFoundException('Message not found');
    }

    // // Update the dates values UpdatedAt and UpdatedBy
    // const dates: CommonDateDTO = updateCommonDates(
    //   message.metadata.dates,
    //   updateMessageContentRequestDTO.metadata.dates,
    //   true,
    // );
    // updateMessageContentRequestDTO.metadata.dates = dates;

    // Update the message
    const updatedMessageContent: MessageContentDTO =
      await this.messageRepository.updateMessageContent(
        uuid,
        updateMessageContentRequestDTO.content,
      );

    if (!updatedMessageContent) {
      throw new Error('Failed to update message');
    }

    this.logger.log(`Message: ${JSON.stringify(updatedMessageContent, null, 2)}`);
    return new MessageContentResponseDTO(message.ID, uuid, updatedMessageContent);
  }

  async getMessageMetadata(uuid: string): Promise<MessageMetadataResponseDTO> {
    const message = await this.messageRepository.getMessage(uuid);
    if (!message) {
      throw new NotFoundException('Message not found');
    }
    this.logger.log(`Message: ${JSON.stringify(message, null, 2)}`);
    return new MessageMetadataResponseDTO(message.ID, uuid, message.metadata);
  }

  async getMessageContent(uuid: string): Promise<MessageContentResponseDTO> {
    const message = await this.messageRepository.getMessage(uuid);
    if (!message) {
      throw new NotFoundException('Message not found');
    }
    this.logger.log(`Message: ${JSON.stringify(message, null, 2)}`);
    return new MessageContentResponseDTO(message.ID, uuid, message.content);
  }

  // Other methods...

  async isMessageExist(
    name: string,
    ID: string,
    UUID: string,
  ): Promise<boolean> {
    try {
      const messageByName = await this.messageRepository.getMessageByName(name);
      if (messageByName) {
        return true;
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.verbose(`Message not found by name: ${name}`);
      } else {
        this.logger.error(error);
      }
    }

    try {
      const messageByID = await this.messageRepository.getMessageByID(ID);
      if (messageByID) {
        return true;
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.verbose(`Message not found by ID: ${ID}`);
      } else {
        this.logger.error(error);
      }
    }

    try {
      const messageByUUID = await this.messageRepository.getMessage(UUID);
      if (messageByUUID) {
        return true;
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.verbose(`Message not found by UUID: ${UUID}`);
      } else {
        this.logger.error(error);
      }
    }
    return false;
  }

  async isNoMessagesExist(): Promise<boolean> {
    const messages = await this.messageRepository.listMessages();
    return messages.length === 0;
  }

  async isExactlyOneMessageExist(): Promise<boolean> {
    const messages = await this.messageRepository.listMessages();
    return messages.length === 1;
  }

  async isAtLeastOneMessageExist(): Promise<boolean> {
    const messages = await this.messageRepository.listMessages();
    return messages.length >= 1;
  }

  convertToMessageResponse(message: MessageEntity): MessageResponseDTO {
    this.logger.verbose(
      `Converting Message: ${JSON.stringify(message, null, 2)}`,
    );
    const messageMetadata: MessageMetadataDTO = new MessageMetadataDTO(
      message.metadata.name,
      message.metadata.dates,
    );
    const messageContent: MessageContentDTO = new MessageContentDTO();
    const messageResponse: MessageResponseDTO = new MessageResponseDTO(
      message.ID,
      message.UUID,
      messageMetadata,
      messageContent,
    );
    return messageResponse;
  }

  convertToMessageResponseList(messages: MessageEntity[]): MessageResponseDTO[] {
    this.logger.verbose(
      `Converting Messages: ${JSON.stringify(messages, null, 2)}`,
    );
    const messageResponseList: MessageResponseDTO[] = messages.map((message) => {
      const messageMetadata: MessageMetadataDTO = new MessageMetadataDTO(
        message.metadata.name,
        message.metadata.dates,
      );
      const messageContent: MessageContentDTO = new MessageContentDTO();
      const messageResponse: MessageResponseDTO = new MessageResponseDTO(
        message.ID,
        message.UUID,
        messageMetadata,
        messageContent,
      );
      return messageResponse;
    });

    return messageResponseList;
  }

  private convertToMessageMetadataResponse(
    message: MessageEntity,
  ): MessageMetadataResponseDTO {
    const messageMetadata: MessageMetadataDTO = new MessageMetadataDTO(
      message.metadata.name,
      message.metadata.dates,
    );
    return new MessageMetadataResponseDTO(
      message.ID,
      message.UUID,
      messageMetadata,
    );
  }
}
