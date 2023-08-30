import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { CreateMessageRequestDTO } from '../dto';
import { UpdateMessageRequestDTO } from '../dto';
import { MessageEntity } from '../entity/message.entity';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { MessageMetadataEntity } from '../entity/message-metadata.entity';
import { MessageContentEntity } from '../entity/message-content.entity';
import { CommonDateEntity } from '../../../common/entity/common-date.entity';
import { existsSync, mkdirSync, readFileSync } from 'fs';
import {
  DEFAULT_DATABASE_STORAGE_DEVICE_TYPE,
  DEFAULT_FILE_STORAGE_DEVICE_TYPE,
  DEFAULT_FILE_STORAGE_EXTENSION,
  DEFAULT_STORAGE_DEVICE_TYPE,
  DEFAULT_STORAGE_FILE_TYPE,
  DEFAULT_MSG_FILE_PATH,
  DEFAULT_MSG_PATH,
  STORAGE_DEVICE_TYPES,
} from '../../../common/constant';
import { glob } from 'glob';
import { createDirectory } from '../../../utils/directory/directory.utils';
import { deleteFile } from '../../../utils/file/file.utils';
import { MessageMetadataDTO, MessageContentDTO, MessageIdUuidDTO } from '../dto';

@Injectable()
export class MessageLocalRepository {
  private readonly logger = new Logger(MessageLocalRepository.name);
  private storageStrategy: StorageStrategy;

  private messages: MessageEntity[] = [];

  constructor(
    @Inject('ReadSingleFromJSON')
    private readonly readSingleFromJSON: <T>(filePath: string) => Promise<T>,
    @Inject('WriteSingleToJSON')
    private readonly writeSingleToJSON: <T>(filePath: string, data: T) => void,
    @Inject('ReadSingleFromYAML')
    private readonly readSingleFromYAML: <T>(filePath: string) => Promise<T>,
    @Inject('WriteSingleToYAML')
    private readonly writeSingleToYAML: <T>(filePath: string, data: T) => void,
    @Inject('ReadSingleFromCSV')
    private readonly readSingleFromCSV: <T>(filePath: string) => Promise<T>,
    @Inject('WriteSingleToCSV')
    private readonly writeSingleToCSV: <T>(filePath: string, data: T) => void,
    // @Inject('ReadSingleFromMarkdown')
    // private readonly readSingleFromMarkdown: <T>(filePath: string) => Promise<T>,
    // @Inject('WriteSingleToMarkdown')
    // private readonly writeSingleToMarkdown: <T>(filePath: string, data: T) => void,
    @Inject('ReadArrayFromJSON')
    private readonly readArrayFromJSON: <T>(filePath: string) => Promise<T[]>,
    @Inject('WriteArrayToJSON')
    private readonly writeArrayToJSON: <T>(filePath: string, data: T[]) => void,
    @Inject('ReadArrayFromYAML')
    private readonly readArrayFromYAML: <T>(filePath: string) => Promise<T[]>,
    @Inject('WriteArrayToYAML')
    private readonly writeArrayToYAML: <T>(filePath: string, data: T[]) => void,
    @Inject('ReadArrayFromCSV')
    private readonly readArrayFromCSV: <T>(filePath: string) => Promise<T[]>,
    @Inject('WriteArrayToCSV')
    private readonly writeArrayToCSV: <T>(filePath: string, data: T[]) => void, // @Inject('ReadArrayFromMarkdown') // private readonly readArrayFromMarkdown: <T>(filePath: string) => Promise<T[]>, // @Inject('WriteArrayToMarkdown') // private readonly writeArrayToMarkdown: <T>(filePath: string, data: T[]) => void,
  ) {
    this.storageStrategy = this.getStorageStrategy();
  }

  // Get all message IDs and UUIDs
  async listMessageIdsAndUUIDs(): Promise<MessageIdUuidDTO[]> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.listMessageIdsAndUUIDs();
  }

  // Get all messages
  async listMessages(): Promise<MessageEntity[]> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.listMessages();
  }

  // Get a message by UUID
  async getMessage(UUID: string): Promise<MessageEntity> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.getMessage(UUID);
  }

  // Create a new message
  async createMessage(
    createMessageRequestDTO: CreateMessageRequestDTO,
  ): Promise<MessageEntity> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.createMessage(createMessageRequestDTO);
  }

  // Update a message by UUID
  async updateMessage(
    UUID: string,
    updateMessageRequestDTO: UpdateMessageRequestDTO,
  ): Promise<MessageEntity> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.updateMessage(UUID, updateMessageRequestDTO);
  }

  // Delete a message by UUID
  async deleteMessage(UUID: string): Promise<MessageEntity> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.deleteMessage(UUID);
  }

  // Get a message by ID
  async getMessageByID(ID: string): Promise<MessageEntity> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.getMessageByID(ID);
  }

  // Get a message by name
  async getMessageByName(name: string): Promise<MessageEntity> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.getMessageByName(name);
  }

  // Update a message metadata by UUID
  async updateMessageMetadata(
    UUID: string,
    updatedMetadata: MessageMetadataDTO,
  ): Promise<MessageMetadataDTO> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.updateMessageMetadata(UUID, updatedMetadata);
  }

  // Update a message content by UUID
  async updateMessageContent(
    UUID: string,
    updatedContent: MessageContentDTO,
  ): Promise<MessageContentDTO> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.updateMessageContent(UUID, updatedContent);
  }

  // Get a message metadata by UUID
  async getMessageMetadata(UUID: string): Promise<MessageMetadataDTO> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.getMessageMetadata(UUID);
  }

  // Get a message content by UUID
  async getMessageContent(UUID: string): Promise<MessageContentDTO> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.getMessageContent(UUID);
  }

  private getStorageStrategy(): StorageStrategy {
    if (DEFAULT_STORAGE_DEVICE_TYPE === 'file') {
      if (DEFAULT_FILE_STORAGE_DEVICE_TYPE === 'json') {
        if (DEFAULT_STORAGE_FILE_TYPE === 'single') {
          return new SingleJsonStorage(
            DEFAULT_MSG_FILE_PATH,
            this.readArrayFromJSON,
            this.writeArrayToJSON,
          );
        } else if (DEFAULT_STORAGE_FILE_TYPE === 'multiple') {
          return new MultipleJsonStorage(
            DEFAULT_MSG_PATH,
            this.readSingleFromJSON,
            this.writeSingleToJSON,
          );
        }
      } else if (DEFAULT_FILE_STORAGE_DEVICE_TYPE === 'yaml') {
        // Implement YAML strategy...
        throw new Error('Unimplemented storage configuration');
      } else if (DEFAULT_FILE_STORAGE_DEVICE_TYPE === 'csv') {
        // Implement CSV strategy...
        throw new Error('Unimplemented storage configuration');
      } else if (DEFAULT_FILE_STORAGE_DEVICE_TYPE === 'md') {
        // Implement MD strategy...
        throw new Error('Unimplemented storage configuration');
      }
    } else {
      if (DEFAULT_DATABASE_STORAGE_DEVICE_TYPE === 'memory') {
        // Implement memory strategy...
        return new MemoryStorage();
      } else if (DEFAULT_DATABASE_STORAGE_DEVICE_TYPE === 'sqlite') {
        // Implement sqlite strategy...
        throw new Error('Unimplemented storage configuration');
      } else if (DEFAULT_DATABASE_STORAGE_DEVICE_TYPE === 'mongo') {
        // Implement mongo strategy...
        throw new Error('Unimplemented storage configuration');
      } else if (DEFAULT_DATABASE_STORAGE_DEVICE_TYPE === 'postgres') {
        // Implement postgres strategy...
        throw new Error('Unimplemented storage configuration');
      }
    }
    throw new Error('Unsupported storage configuration');
  }

  private generateUUID(): string {
    return String(this.messages.length + 1);
    // return uuidv4();
  }

  async readMessageFromJSON(filePath: string): Promise<MessageEntity> {
    return this.readSingleFromJSON<MessageEntity>(filePath);
  }

  async writeMessageToJSON(
    filePath: string,
    message: MessageEntity,
  ): Promise<void> {
    this.writeSingleToJSON<MessageEntity>(filePath, message);
  }

  async readMessageFromYAML(filePath: string): Promise<MessageEntity> {
    return this.readSingleFromYAML<MessageEntity>(filePath);
  }

  async writeMessageToYAML(
    filePath: string,
    message: MessageEntity,
  ): Promise<void> {
    this.writeSingleToYAML<MessageEntity>(filePath, message);
  }

  async readMessageFromCSV(filePath: string): Promise<MessageEntity> {
    return this.readSingleFromCSV<MessageEntity>(filePath);
  }

  async writeMessageToCSV(
    filePath: string,
    message: MessageEntity,
  ): Promise<void> {
    this.writeSingleToCSV<MessageEntity>(filePath, message);
  }

  async readMessagesFromJSON(filePath: string): Promise<MessageEntity[]> {
    return this.readArrayFromJSON<MessageEntity>(filePath);
  }

  async writeMessagesToJSON(
    filePath: string,
    messages: MessageEntity[],
  ): Promise<void> {
    this.writeArrayToJSON<MessageEntity>(filePath, messages);
  }

  async readMessagesFromYAML(filePath: string): Promise<MessageEntity[]> {
    return this.readArrayFromYAML<MessageEntity>(filePath);
  }

  async writeMessagesToYAML(
    filePath: string,
    messages: MessageEntity[],
  ): Promise<void> {
    this.writeArrayToYAML<MessageEntity>(filePath, messages);
  }

  async readMessagesFromCSV(filePath: string): Promise<MessageEntity[]> {
    return this.readArrayFromCSV<MessageEntity>(filePath);
  }

  async writeMessagesToCSV(
    filePath: string,
    messages: MessageEntity[],
  ): Promise<void> {
    this.writeArrayToCSV<MessageEntity>(filePath, messages);
  }
}

interface StorageStrategy {
  listMessageIdsAndUUIDs(): Promise<MessageIdUuidDTO[]>;
  listMessages(): Promise<MessageEntity[]>;
  getMessage(UUID: string): Promise<MessageEntity>;
  createMessage(
    createMessageRequestDTO: CreateMessageRequestDTO,
  ): Promise<MessageEntity>;
  updateMessage(
    UUID: string,
    updateMessageRequestDTO: UpdateMessageRequestDTO,
  ): Promise<MessageEntity>;
  deleteMessage(UUID: string): Promise<MessageEntity>;
  getMessageByID(ID: string): Promise<MessageEntity>;
  getMessageByName(name: string): Promise<MessageEntity>;
  updateMessageMetadata(
    uuid: string,
    updatedMetadata: MessageMetadataDTO,
  ): Promise<MessageMetadataDTO>;
  updateMessageContent(
    uuid: string,
    updatedContent: MessageContentDTO,
  ): Promise<MessageContentDTO>;
  getMessageMetadata(uuid: string): Promise<MessageMetadataDTO>;
  getMessageContent(uuid: string): Promise<MessageContentDTO>;
  // searchMessages(query: string): Promise<MessageEntity[]>;
}

class MemoryStorage implements StorageStrategy {
  private readonly logger = new Logger(MemoryStorage.name);
  private messages: MessageEntity[] = [
    new MessageEntity(
      'ABC-123',
      '00000000-0000-0000-0000-000000000001',
      new MessageMetadataEntity(
        'Message 1',
        new CommonDateEntity(
          new Date('2021-01-01T00:00:00.000Z'),
          'john.doe',
          new Date('2021-01-01T00:00:00.000Z'),
          'john.doe',
          new Date('2021-01-01T00:00:00.000Z'),
          'john.doe',
          new Date('2021-01-01T00:00:00.000Z'),
          new Date('2021-01-01T00:00:00.000Z'),
          new Date('2021-01-01T00:00:00.000Z'),
          'john.doe',
        ),
      ),
      new MessageContentEntity(),
    ),
    new MessageEntity(
      'XYZ-789',
      '00000000-0000-0000-0000-000000000002',
      new MessageMetadataEntity(
        'Message 2',
        new CommonDateEntity(
          new Date('2021-01-01T00:00:00.000Z'),
          'jane.doe',
          new Date('2021-01-01T00:00:00.000Z'),
          'jane.doe',
          new Date('2021-01-01T00:00:00.000Z'),
          'jane.doe',
          new Date('2021-01-01T00:00:00.000Z'),
          new Date('2021-01-01T00:00:00.000Z'),
          new Date('2021-01-01T00:00:00.000Z'),
          'jane.doe',
        ),
      ),
      new MessageContentEntity(),
    ),
  ];

  async listMessageIdsAndUUIDs(): Promise<MessageIdUuidDTO[]> {
    return this.messages.map((message) => ({
      ID: message.ID,
      UUID: message.UUID,
    }));
  }

  async listMessages(): Promise<MessageEntity[]> {
    return this.messages;
  }

  async getMessage(UUID: string): Promise<MessageEntity> {
    const message: MessageEntity | undefined = this.messages.find(
      (message) => message.UUID === UUID,
    );
    if (!message) {
      throw new NotFoundException(`Message ${UUID} cannot be found`);
    }
    return message;
  }

  async createMessage(
    createMessageRequestDTO: CreateMessageRequestDTO,
  ): Promise<MessageEntity> {
    const newUUID: string = uuidV4();
    const newMessageMetadata: MessageMetadataEntity = plainToInstance(
      MessageMetadataEntity,
      createMessageRequestDTO.metadata,
    );
    const newMessageContent: MessageContentEntity = plainToInstance(
      MessageContentEntity,
      createMessageRequestDTO.content,
    );
    const newMessage: MessageEntity = new MessageEntity(
      createMessageRequestDTO.ID,
      newUUID,
      newMessageMetadata,
      newMessageContent,
    );
    this.messages.push(newMessage);
    return newMessage;
  }

  async updateMessage(
    UUID: string,
    updateMessageRequestDTO: UpdateMessageRequestDTO,
  ): Promise<MessageEntity> {
    const messageIndex = this.messages.findIndex(
      (message) => message.UUID === UUID,
    );
    if (messageIndex === -1) {
      throw new NotFoundException(`Message ${UUID} cannot be found`);
    }
    const updatedMessageMetadata: MessageMetadataEntity = {
      ...this.messages[messageIndex].metadata,
      ...instanceToPlain(updateMessageRequestDTO.metadata),
    };
    const updatedMessageContent: MessageContentEntity = {
      ...this.messages[messageIndex].content,
      ...updateMessageRequestDTO.content,
    };
    const updatedMessage = new MessageEntity(
      this.messages[messageIndex].ID,
      UUID,
      updatedMessageMetadata,
      updatedMessageContent,
    );
    this.messages[messageIndex] = updatedMessage;
    return updatedMessage;
  }

  async deleteMessage(UUID: string): Promise<MessageEntity> {
    const messageIndex = this.messages.findIndex(
      (message) => message.UUID === UUID,
    );
    if (messageIndex === -1) {
      throw new NotFoundException(`Message ${UUID} cannot be found`);
    }
    const deletedMessage: MessageEntity = this.messages.splice(messageIndex, 1)[0];
    return deletedMessage;
  }

  async getMessageByID(ID: string): Promise<MessageEntity> {
    const message: MessageEntity | undefined = this.messages.find(
      (message) => message.ID === ID,
    );
    if (!message) {
      throw new NotFoundException(`Message ${ID} cannot be found`);
    }
    return message;
  }

  async getMessageByName(name: string): Promise<MessageEntity> {
    const message: MessageEntity | undefined = this.messages.find(
      (message) => message.metadata.name === name,
    );
    if (!message) {
      throw new NotFoundException(`Message ${name} cannot be found`);
    }
    return message;
  }

  // Update a message metadata by UUID
  async updateMessageMetadata(
    uuid: string,
    updatedMetadata: MessageMetadataDTO,
  ): Promise<MessageMetadataDTO> {
    this.logger.log(
      `Message UUID: ${uuid} | Message Metadata: ${updatedMetadata}`,
    );
    const messageIndex = this.messages.findIndex(
      (message) => message.UUID === uuid,
    );
    if (messageIndex === -1) {
      throw new NotFoundException(`Message ${uuid} cannot be found`);
    }
    const updatedMessageMetadata: MessageMetadataEntity = {
      ...this.messages[messageIndex].metadata,
      ...instanceToPlain(updatedMetadata),
    };
    const updatedMessage = new MessageEntity(
      this.messages[messageIndex].ID,
      uuid,
      updatedMessageMetadata,
      this.messages[messageIndex].content,
    );
    this.messages[messageIndex] = updatedMessage;
    return updatedMessage.metadata;
  }

  // Update a message content by UUID
  async updateMessageContent(
    uuid: string,
    updatedContent: MessageContentDTO,
  ): Promise<MessageContentDTO> {
    this.logger.log(`Message UUID: ${uuid} | Message Content: ${updatedContent}`);
    const messageIndex = this.messages.findIndex(
      (message) => message.UUID === uuid,
    );
    if (messageIndex === -1) {
      throw new NotFoundException(`Message ${uuid} cannot be found`);
    }
    const updatedMessageContent: MessageContentEntity = {
      ...this.messages[messageIndex].content,
      ...updatedContent,
    };
    this.messages[messageIndex].metadata.dates.updatedAt = new Date();
    const updatedMessage = new MessageEntity(
      this.messages[messageIndex].ID,
      uuid,
      this.messages[messageIndex].metadata,
      updatedMessageContent,
    );
    this.messages[messageIndex] = updatedMessage;
    return updatedMessage.content;
  }

  // Get a message metadata by UUID
  async getMessageMetadata(uuid: string): Promise<MessageMetadataDTO> {
    this.logger.log(`Message UUID: ${uuid}`);
    const messageIndex = this.messages.findIndex(
      (message) => message.UUID === uuid,
    );
    if (messageIndex === -1) {
      throw new NotFoundException(`Message ${uuid} cannot be found`);
    }
    return this.messages[messageIndex].metadata;
  }

  // Get a message content by UUID
  async getMessageContent(uuid: string): Promise<MessageContentDTO> {
    this.logger.log(`Message UUID: ${uuid}`);
    const messageIndex = this.messages.findIndex(
      (message) => message.UUID === uuid,
    );
    if (messageIndex === -1) {
      throw new NotFoundException(`Message ${uuid} cannot be found`);
    }
    return this.messages[messageIndex].content;
  }
}

class SingleJsonStorage implements StorageStrategy {
  private readonly logger = new Logger(SingleJsonStorage.name);
  constructor(
    private readonly filePath: string,
    private readonly readFromJSON: <T>(filePath: string) => Promise<T[]>,
    private readonly writeToJSON: <T>(filePath: string, data: T[]) => void,
  ) {}

  async listMessageIdsAndUUIDs(): Promise<MessageIdUuidDTO[]> {
    const messages: MessageEntity[] = await this.readFromJSON<MessageEntity>(
      this.filePath,
    );
    return messages.map((message) => ({
      ID: message.ID,
      UUID: message.UUID,
    }));
  }

  async listMessages(): Promise<MessageEntity[]> {
    return this.readFromJSON<MessageEntity>(this.filePath);
  }

  async getMessage(UUID: string): Promise<MessageEntity> {
    const messages: MessageEntity[] = await this.readFromJSON<MessageEntity>(
      this.filePath,
    );
    const message: MessageEntity | undefined = messages.find(
      (message) => message.UUID === UUID,
    );
    if (!message) {
      throw new NotFoundException(`Message ${UUID} cannot be found`);
    }
    return message;
  }

  async createMessage(
    createMessageRequestDTO: CreateMessageRequestDTO,
  ): Promise<MessageEntity> {
    const messages: MessageEntity[] = await this.readFromJSON<MessageEntity>(
      this.filePath,
    );
    const newUUID: string = uuidV4();
    const newMessageMetadata: MessageMetadataEntity = plainToInstance(
      MessageMetadataEntity,
      createMessageRequestDTO.metadata,
    );
    const newMessageContent: MessageContentEntity = plainToInstance(
      MessageContentEntity,
      createMessageRequestDTO.content,
    );
    const newMessage: MessageEntity = new MessageEntity(
      createMessageRequestDTO.ID,
      newUUID,
      newMessageMetadata,
      newMessageContent,
    );
    messages.push(newMessage);
    this.writeToJSON(this.filePath, messages);
    return newMessage;
  }

  async updateMessage(
    UUID: string,
    updateMessageRequestDTO: UpdateMessageRequestDTO,
  ): Promise<MessageEntity> {
    const messages: MessageEntity[] = await this.readFromJSON<MessageEntity>(
      this.filePath,
    );
    const messageIndex = messages.findIndex((message) => message.UUID === UUID);
    if (messageIndex === -1) {
      throw new NotFoundException(`Message ${UUID} cannot be found`);
    }
    const updatedMessageMetadata: MessageMetadataEntity = {
      ...messages[messageIndex].metadata,
      ...instanceToPlain(updateMessageRequestDTO.metadata),
    };
    const updatedMessageContent: MessageContentEntity = {
      ...messages[messageIndex].content,
      ...updateMessageRequestDTO.content,
    };
    const updatedMessage = new MessageEntity(
      messages[messageIndex].ID,
      UUID,
      updatedMessageMetadata,
      updatedMessageContent,
    );
    messages[messageIndex] = updatedMessage;
    this.writeToJSON(this.filePath, messages);
    return updatedMessage;
  }

  async deleteMessage(UUID: string): Promise<MessageEntity> {
    const messages: MessageEntity[] = await this.readFromJSON<MessageEntity>(
      this.filePath,
    );
    const messageIndex = messages.findIndex((message) => message.UUID === UUID);
    if (messageIndex === -1) {
      throw new NotFoundException(`Message ${UUID} cannot be found`);
    }
    const deletedMessage: MessageEntity = messages.splice(messageIndex, 1)[0];
    this.writeToJSON(this.filePath, messages);
    return deletedMessage;
  }

  async getMessageByID(ID: string): Promise<MessageEntity> {
    const messages: MessageEntity[] = await this.readFromJSON<MessageEntity>(
      this.filePath,
    );
    const message: MessageEntity | undefined = messages.find(
      (message) => message.ID === ID,
    );
    if (!message) {
      throw new NotFoundException(`Message ${ID} cannot be found`);
    }
    return message;
  }

  async getMessageByName(name: string): Promise<MessageEntity> {
    const messages: MessageEntity[] = await this.readFromJSON<MessageEntity>(
      this.filePath,
    );
    const message: MessageEntity | undefined = messages.find(
      (message) => message.metadata.name === name,
    );
    if (!message) {
      throw new NotFoundException(`Message ${name} cannot be found`);
    }
    return message;
  }

  // Update a message metadata by UUID
  async updateMessageMetadata(
    uuid: string,
    updatedMetadata: MessageMetadataDTO,
  ): Promise<MessageMetadataDTO> {
    this.logger.log(
      `Message UUID: ${uuid} | Message Metadata: ${updatedMetadata}`,
    );
    const messages: MessageEntity[] = await this.readFromJSON<MessageEntity>(
      this.filePath,
    );
    const messageIndex = messages.findIndex((message) => message.UUID === uuid);
    if (messageIndex === -1) {
      throw new NotFoundException(`Message ${uuid} cannot be found`);
    }
    const updatedMessageMetadata: MessageMetadataEntity = {
      ...messages[messageIndex].metadata,
      ...instanceToPlain(updatedMetadata),
    };
    const updatedMessage = new MessageEntity(
      messages[messageIndex].ID,
      uuid,
      updatedMessageMetadata,
      messages[messageIndex].content,
    );
    messages[messageIndex] = updatedMessage;
    this.writeToJSON(this.filePath, messages);
    return updatedMessage.metadata;
  }

  // Update a message content by UUID
  async updateMessageContent(
    uuid: string,
    updatedContent: MessageContentDTO,
  ): Promise<MessageContentDTO> {
    this.logger.log(`Message UUID: ${uuid} | Message Content: ${updatedContent}`);
    const messages: MessageEntity[] = await this.readFromJSON<MessageEntity>(
      this.filePath,
    );
    const messageIndex = messages.findIndex((message) => message.UUID === uuid);
    if (messageIndex === -1) {
      throw new NotFoundException(`Message ${uuid} cannot be found`);
    }
    const updatedMessageContent: MessageContentEntity = {
      ...messages[messageIndex].content,
      ...updatedContent,
    };
    messages[messageIndex].metadata.dates.updatedAt = new Date();
    const updatedMessage = new MessageEntity(
      messages[messageIndex].ID,
      uuid,
      messages[messageIndex].metadata,
      updatedMessageContent,
    );
    messages[messageIndex] = updatedMessage;
    this.writeToJSON(this.filePath, messages);
    return updatedMessage.content;
  }

  // Get a message metadata by UUID
  async getMessageMetadata(uuid: string): Promise<MessageMetadataDTO> {
    this.logger.log(`Message UUID: ${uuid}`);
    const messages: MessageEntity[] = await this.readFromJSON<MessageEntity>(
      this.filePath,
    );
    const messageIndex = messages.findIndex((message) => message.UUID === uuid);
    if (messageIndex === -1) {
      throw new NotFoundException(`Message ${uuid} cannot be found`);
    }
    return messages[messageIndex].metadata;
  }

  // Get a message content by UUID
  async getMessageContent(uuid: string): Promise<MessageContentDTO> {
    this.logger.log(`Message UUID: ${uuid}`);
    const messages: MessageEntity[] = await this.readFromJSON<MessageEntity>(
      this.filePath,
    );
    const messageIndex = messages.findIndex((message) => message.UUID === uuid);
    if (messageIndex === -1) {
      throw new NotFoundException(`Message ${uuid} cannot be found`);
    }
    return messages[messageIndex].content;
  }
}

class MultipleJsonStorage implements StorageStrategy {
  private readonly logger = new Logger(MultipleJsonStorage.name);
  constructor(
    private readonly dirPath: string,
    private readonly readFromJSON: <T>(filePath: string) => Promise<T>,
    private readonly writeToJSON: <T>(filePath: string, data: T) => void,
  ) {}

  async listMessageIdsAndUUIDs(): Promise<MessageIdUuidDTO[]> {
    const filesPath: string[] = glob.sync(
      `${this.dirPath}/*.${DEFAULT_FILE_STORAGE_EXTENSION}`,
    );
    const messages: MessageEntity[] = [];
    for (const filePath of filesPath) {
      if (existsSync(filePath)) {
        const message: MessageEntity = await this.readFromJSON<MessageEntity>(
          filePath,
        );
        if (message) {
          messages.push(message);
        }
      }
    }
    return messages.map((message) => ({
      ID: message.ID,
      UUID: message.UUID,
    }));
  }

  async listMessages(): Promise<MessageEntity[]> {
    const filesPath: string[] = glob.sync(
      `${this.dirPath}/*.${DEFAULT_FILE_STORAGE_EXTENSION}`,
    );
    const messages: MessageEntity[] = [];
    for (const filePath of filesPath) {
      if (existsSync(filePath)) {
        const message: MessageEntity = await this.readFromJSON<MessageEntity>(
          filePath,
        );
        if (message) {
          messages.push(message);
        }
      }
    }
    return messages;
  }

  async getMessage(UUID: string): Promise<MessageEntity> {
    const filePath = `${this.dirPath}/${UUID}.${DEFAULT_FILE_STORAGE_EXTENSION}`;
    if (existsSync(filePath)) {
      return this.readFromJSON<MessageEntity>(filePath);
    } else {
      throw new NotFoundException(`Message ${UUID} cannot be found`);
    }
  }

  async createMessage(
    createMessageRequestDTO: CreateMessageRequestDTO,
  ): Promise<MessageEntity> {
    const newUUID: string = uuidV4();
    const newMessageMetadata: MessageMetadataEntity = plainToInstance(
      MessageMetadataEntity,
      createMessageRequestDTO.metadata,
    );
    const newMessageContent: MessageContentEntity = plainToInstance(
      MessageContentEntity,
      createMessageRequestDTO.content,
    );
    const newMessage: MessageEntity = new MessageEntity(
      createMessageRequestDTO.ID,
      newUUID,
      newMessageMetadata,
      newMessageContent,
    );
    const filePath = `${this.dirPath}/${newUUID}.${DEFAULT_FILE_STORAGE_EXTENSION}`;
    this.writeToJSON(filePath, newMessage);
    return newMessage;
  }

  async updateMessage(
    UUID: string,
    updateMessageRequestDTO: UpdateMessageRequestDTO,
  ): Promise<MessageEntity> {
    const filePath = `${this.dirPath}/${UUID}.${DEFAULT_FILE_STORAGE_EXTENSION}`;
    if (existsSync(filePath)) {
      const message: MessageEntity = await this.readFromJSON<MessageEntity>(
        filePath,
      );
      if (!message) {
        throw new NotFoundException(`Message ${UUID} cannot be found`);
      }
      const updatedMessageMetadata: MessageMetadataEntity = {
        ...message.metadata,
        ...instanceToPlain(updateMessageRequestDTO.metadata),
      };
      const updatedMessageContent: MessageContentEntity = {
        ...message.content,
        ...updateMessageRequestDTO.content,
      };
      const updatedMessage = new MessageEntity(
        message.ID,
        UUID,
        updatedMessageMetadata,
        updatedMessageContent,
      );
      this.writeToJSON(filePath, updatedMessage);
      return updatedMessage;
    } else {
      throw new NotFoundException(`Message ${UUID} cannot be found`);
    }
  }

  async deleteMessage(UUID: string): Promise<MessageEntity> {
    const filePath = `${this.dirPath}/${UUID}.${DEFAULT_FILE_STORAGE_EXTENSION}`;
    this.logger.debug(filePath);
    if (existsSync(filePath)) {
      const deletedMessage: MessageEntity = await this.readFromJSON<MessageEntity>(
        filePath,
      );
      if (!deletedMessage) {
        throw new NotFoundException(`Message ${UUID} cannot be found`);
      }
      await deleteFile(filePath);
      return deletedMessage;
    } else {
      throw new NotFoundException(`Message ${UUID} cannot be found`);
    }
  }

  async getMessageByID(ID: string): Promise<MessageEntity> {
    const filesPath: string[] = glob.sync(
      `${this.dirPath}/*.${DEFAULT_FILE_STORAGE_EXTENSION}`,
    );
    for (const filePath of filesPath) {
      if (existsSync(filePath)) {
        const message: MessageEntity = await this.readFromJSON<MessageEntity>(
          filePath,
        );
        if (message.ID === ID) {
          return message;
        }
      }
    }
    throw new NotFoundException(`Message ${name} cannot be found`);
  }

  async getMessageByName(name: string): Promise<MessageEntity> {
    const filesPath: string[] = glob.sync(
      `${this.dirPath}/*.${DEFAULT_FILE_STORAGE_EXTENSION}`,
    );
    for (const filePath of filesPath) {
      if (existsSync(filePath)) {
        const message = await this.readFromJSON<MessageEntity>(filePath);
        if (message.metadata.name === name) {
          return message;
        }
      }
    }
    throw new NotFoundException(`Message ${name} cannot be found`);
  }

  // Update a message metadata by UUID
  async updateMessageMetadata(
    uuid: string,
    updatedMetadata: MessageMetadataDTO,
  ): Promise<MessageMetadataDTO> {
    this.logger.log(
      `Message UUID: ${uuid} | Message Metadata: ${updatedMetadata}`,
    );
    const filePath = `${this.dirPath}/${uuid}.${DEFAULT_FILE_STORAGE_EXTENSION}`;
    if (existsSync(filePath)) {
      const message: MessageEntity = await this.readFromJSON<MessageEntity>(
        filePath,
      );
      if (!message) {
        throw new NotFoundException(`Message ${uuid} cannot be found`);
      }
      const updatedMessageMetadata: MessageMetadataEntity = {
        ...message.metadata,
        ...instanceToPlain(updatedMetadata),
      };
      const updatedMessage = new MessageEntity(
        message.ID,
        uuid,
        updatedMessageMetadata,
        message.content,
      );
      this.writeToJSON(filePath, updatedMessage);
      return updatedMessage.metadata;
    } else {
      throw new NotFoundException(`Message ${uuid} cannot be found`);
    }
  }

  // Update a message content by UUID
  async updateMessageContent(
    uuid: string,
    updatedContent: MessageContentDTO,
  ): Promise<MessageContentDTO> {
    this.logger.log(`Message UUID: ${uuid} | Message Content: ${updatedContent}`);
    const filePath = `${this.dirPath}/${uuid}.${DEFAULT_FILE_STORAGE_EXTENSION}`;
    if (existsSync(filePath)) {
      const message: MessageEntity = await this.readFromJSON<MessageEntity>(
        filePath,
      );
      if (!message) {
        throw new NotFoundException(`Message ${uuid} cannot be found`);
      }
      const updatedMessageContent: MessageContentEntity = {
        ...message.content,
        ...updatedContent,
      };
      message.metadata.dates.updatedAt = new Date();
      const updatedMessage = new MessageEntity(
        message.ID,
        uuid,
        message.metadata,
        updatedMessageContent,
      );
      this.writeToJSON(filePath, updatedMessage);
      return updatedMessage.content;
    } else {
      throw new NotFoundException(`Message ${uuid} cannot be found`);
    }
  }

  // Get a message metadata by UUID
  async getMessageMetadata(uuid: string): Promise<MessageMetadataDTO> {
    this.logger.log(`Message UUID: ${uuid}`);
    const filePath = `${this.dirPath}/${uuid}.${DEFAULT_FILE_STORAGE_EXTENSION}`;
    if (existsSync(filePath)) {
      const message: MessageEntity = await this.readFromJSON<MessageEntity>(
        filePath,
      );
      if (!message) {
        throw new NotFoundException(`Message ${uuid} cannot be found`);
      }
      return message.metadata;
    } else {
      throw new NotFoundException(`Message ${uuid} cannot be found`);
    }
  }

  // Get a message content by UUID
  async getMessageContent(uuid: string): Promise<MessageContentDTO> {
    this.logger.log(`Message UUID: ${uuid}`);
    const filePath = `${this.dirPath}/${uuid}.${DEFAULT_FILE_STORAGE_EXTENSION}`;
    if (existsSync(filePath)) {
      const message: MessageEntity = await this.readFromJSON<MessageEntity>(
        filePath,
      );
      if (!message) {
        throw new NotFoundException(`Message ${uuid} cannot be found`);
      }
      return message.content;
    } else {
      throw new NotFoundException(`Message ${uuid} cannot be found`);
    }
  }
}
