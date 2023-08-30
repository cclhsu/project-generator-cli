import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { CreateUserRequestDTO } from '../dto';
import { UpdateUserRequestDTO } from '../dto';
import { UserEntity } from '../entity/user.entity';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { UserMetadataEntity } from '../entity/user-metadata.entity';
import { UserContentEntity } from '../entity/user-content.entity';
import { CommonDateEntity } from '../../../common/entity/common-date.entity';
import { existsSync, mkdirSync, readFileSync } from 'fs';
import {
  DEFAULT_DATABASE_STORAGE_DEVICE_TYPE,
  DEFAULT_FILE_STORAGE_DEVICE_TYPE,
  DEFAULT_FILE_STORAGE_EXTENSION,
  DEFAULT_STORAGE_DEVICE_TYPE,
  DEFAULT_STORAGE_FILE_TYPE,
  DEFAULT_USER_FILE_PATH,
  DEFAULT_USER_PATH,
  PROJECT_ROLE_TYPES,
  SCRUM_ROLE_TYPES,
  STORAGE_DEVICE_TYPES,
} from '../../../common/constant';
import { glob } from 'glob';
import { createDirectory } from '../../../utils/directory/directory.utils';
import { deleteFile } from '../../../utils/file/file.utils';
import { UserContentDTO, UserIdUuidDTO, UserMetadataDTO } from '../dto';

@Injectable()
export class UserLocalRepository {
  private readonly logger = new Logger(UserLocalRepository.name);
  private storageStrategy: StorageStrategy;

  private users: UserEntity[] = [];

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

  // Get all user IDs and UUIDs
  async listUserIdsAndUUIDs(): Promise<UserIdUuidDTO[]> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.listUserIdsAndUUIDs();
  }

  // Get all users
  async listUsers(): Promise<UserEntity[]> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.listUsers();
  }

  // Get a user by UUID
  async getUser(UUID: string): Promise<UserEntity> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.getUser(UUID);
  }

  // Create a new user
  async createUser(
    createUserRequestDTO: CreateUserRequestDTO,
  ): Promise<UserEntity> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.createUser(createUserRequestDTO);
  }

  // Update a user by UUID
  async updateUser(
    UUID: string,
    updateUserRequestDTO: UpdateUserRequestDTO,
  ): Promise<UserEntity> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.updateUser(UUID, updateUserRequestDTO);
  }

  // Delete a user by UUID
  async deleteUser(UUID: string): Promise<UserEntity> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.deleteUser(UUID);
  }

  // Get a user by ID
  async getUserByID(ID: string): Promise<UserEntity> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.getUserByID(ID);
  }

  // Get a user by name
  async getUserByName(name: string): Promise<UserEntity> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.getUserByName(name);
  }

  // Get a user by username
  async getUserByUsername(username: string): Promise<UserEntity> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.getUserByUsername(username);
  }

  // Get a user by email
  async getUserByEmail(email: string): Promise<UserEntity> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.getUserByEmail(email);
  }

  // Update a user metadata by UUID
  async updateUserMetadata(
    UUID: string,
    updatedMetadata: UserMetadataDTO,
  ): Promise<UserMetadataDTO> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.updateUserMetadata(UUID, updatedMetadata);
  }

  // Update a user content by UUID
  async updateUserContent(
    UUID: string,
    updatedContent: UserContentDTO,
  ): Promise<UserContentDTO> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.updateUserContent(UUID, updatedContent);
  }

  // Get a user metadata by UUID
  async getUserMetadata(UUID: string): Promise<UserMetadataDTO> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.getUserMetadata(UUID);
  }

  // Get a user content by UUID
  async getUserContent(UUID: string): Promise<UserContentDTO> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.getUserContent(UUID);
  }

  private getStorageStrategy(): StorageStrategy {
    if (DEFAULT_STORAGE_DEVICE_TYPE === 'file') {
      if (DEFAULT_FILE_STORAGE_DEVICE_TYPE === 'json') {
        if (DEFAULT_STORAGE_FILE_TYPE === 'single') {
          return new SingleJsonStorage(
            DEFAULT_USER_FILE_PATH,
            this.readArrayFromJSON,
            this.writeArrayToJSON,
          );
        } else if (DEFAULT_STORAGE_FILE_TYPE === 'multiple') {
          return new MultipleJsonStorage(
            DEFAULT_USER_PATH,
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
    return String(this.users.length + 1);
    // return uuidv4();
  }

  async readUserFromJSON(filePath: string): Promise<UserEntity> {
    return this.readSingleFromJSON<UserEntity>(filePath);
  }

  async writeUserToJSON(filePath: string, user: UserEntity): Promise<void> {
    this.writeSingleToJSON<UserEntity>(filePath, user);
  }

  async readUserFromYAML(filePath: string): Promise<UserEntity> {
    return this.readSingleFromYAML<UserEntity>(filePath);
  }

  async writeUserToYAML(filePath: string, user: UserEntity): Promise<void> {
    this.writeSingleToYAML<UserEntity>(filePath, user);
  }

  async readUserFromCSV(filePath: string): Promise<UserEntity> {
    return this.readSingleFromCSV<UserEntity>(filePath);
  }

  async writeUserToCSV(filePath: string, user: UserEntity): Promise<void> {
    this.writeSingleToCSV<UserEntity>(filePath, user);
  }

  async readUsersFromJSON(filePath: string): Promise<UserEntity[]> {
    return this.readArrayFromJSON<UserEntity>(filePath);
  }

  async writeUsersToJSON(filePath: string, users: UserEntity[]): Promise<void> {
    this.writeArrayToJSON<UserEntity>(filePath, users);
  }

  async readUsersFromYAML(filePath: string): Promise<UserEntity[]> {
    return this.readArrayFromYAML<UserEntity>(filePath);
  }

  async writeUsersToYAML(filePath: string, users: UserEntity[]): Promise<void> {
    this.writeArrayToYAML<UserEntity>(filePath, users);
  }

  async readUsersFromCSV(filePath: string): Promise<UserEntity[]> {
    return this.readArrayFromCSV<UserEntity>(filePath);
  }

  async writeUsersToCSV(filePath: string, users: UserEntity[]): Promise<void> {
    this.writeArrayToCSV<UserEntity>(filePath, users);
  }
}

interface StorageStrategy {
  listUserIdsAndUUIDs(): Promise<UserIdUuidDTO[]>;
  listUsers(): Promise<UserEntity[]>;
  getUser(UUID: string): Promise<UserEntity>;
  createUser(createUserRequestDTO: CreateUserRequestDTO): Promise<UserEntity>;
  updateUser(
    UUID: string,
    updateUserRequestDTO: UpdateUserRequestDTO,
  ): Promise<UserEntity>;
  deleteUser(UUID: string): Promise<UserEntity>;
  getUserByID(ID: string): Promise<UserEntity>;
  getUserByName(name: string): Promise<UserEntity>;
  getUserByUsername(username: string): Promise<UserEntity>;
  getUserByEmail(email: string): Promise<UserEntity>;
  updateUserMetadata(
    uuid: string,
    updatedMetadata: UserMetadataDTO,
  ): Promise<UserMetadataDTO>;
  updateUserContent(
    uuid: string,
    updatedContent: UserContentDTO,
  ): Promise<UserContentDTO>;
  getUserMetadata(uuid: string): Promise<UserMetadataDTO>;
  getUserContent(uuid: string): Promise<UserContentDTO>;
  // searchUsers(query: string): Promise<UserEntity[]>;
}

class MemoryStorage implements StorageStrategy {
  private readonly logger = new Logger(MemoryStorage.name);
  private users: UserEntity[] = [
    new UserEntity(
      'john.doe',
      '00000000-0000-0000-0000-000000000001',
      new UserMetadataEntity(
        'John Doe',
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
      new UserContentEntity(
        'john.doe@mail.com',
        '123456789',
        'Doe',
        'John',
        ['PM'] as PROJECT_ROLE_TYPES[],
        ['PO'] as SCRUM_ROLE_TYPES[],
        '',
      ),
    ),
    new UserEntity(
      'jane.doe',
      '00000000-0000-0000-0000-000000000002',
      new UserMetadataEntity(
        'Jane Doe',
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
      new UserContentEntity(
        'jane.doe@mail.com',
        '123456789',
        'Doe',
        'Jane',
        ['EM'] as PROJECT_ROLE_TYPES[],
        ['SM'] as SCRUM_ROLE_TYPES[],
        '',
      ),
    ),
  ];

  async listUserIdsAndUUIDs(): Promise<UserIdUuidDTO[]> {
    return this.users.map((user) => ({
      ID: user.ID,
      UUID: user.UUID,
    }));
  }

  async listUsers(): Promise<UserEntity[]> {
    return this.users;
  }

  async getUser(UUID: string): Promise<UserEntity> {
    const user: UserEntity | undefined = this.users.find(
      (user) => user.UUID === UUID,
    );
    if (!user) {
      throw new NotFoundException(`User ${UUID} cannot be found`);
    }
    return user;
  }

  async createUser(
    createUserRequestDTO: CreateUserRequestDTO,
  ): Promise<UserEntity> {
    const newUUID: string = uuidV4();
    const newUserMetadata: UserMetadataEntity = plainToInstance(
      UserMetadataEntity,
      createUserRequestDTO.metadata,
    );
    const newUserContent: UserContentEntity = plainToInstance(
      UserContentEntity,
      createUserRequestDTO.content,
    );
    const newUser: UserEntity = new UserEntity(
      createUserRequestDTO.ID,
      newUUID,
      newUserMetadata,
      newUserContent,
    );
    this.users.push(newUser);
    return newUser;
  }

  async updateUser(
    UUID: string,
    updateUserRequestDTO: UpdateUserRequestDTO,
  ): Promise<UserEntity> {
    const userIndex = this.users.findIndex((user) => user.UUID === UUID);
    if (userIndex === -1) {
      throw new NotFoundException(`User ${UUID} cannot be found`);
    }
    const updatedUserMetadata: UserMetadataEntity = {
      ...this.users[userIndex].metadata,
      ...instanceToPlain(updateUserRequestDTO.metadata),
    };
    const updatedUserContent: UserContentEntity = {
      ...this.users[userIndex].content,
      ...updateUserRequestDTO.content,
    };
    const updatedUser = new UserEntity(
      this.users[userIndex].ID,
      UUID,
      updatedUserMetadata,
      updatedUserContent,
    );
    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  async deleteUser(UUID: string): Promise<UserEntity> {
    const userIndex = this.users.findIndex((user) => user.UUID === UUID);
    if (userIndex === -1) {
      throw new NotFoundException(`User ${UUID} cannot be found`);
    }
    const deletedUser: UserEntity = this.users.splice(userIndex, 1)[0];
    return deletedUser;
  }

  async getUserByID(ID: string): Promise<UserEntity> {
    const user: UserEntity | undefined = this.users.find(
      (user) => user.ID === ID,
    );
    if (!user) {
      throw new NotFoundException(`User ${ID} cannot be found`);
    }
    return user;
  }

  async getUserByName(name: string): Promise<UserEntity> {
    const user: UserEntity | undefined = this.users.find(
      (user) => user.metadata.name === name,
    );
    if (!user) {
      throw new NotFoundException(`User ${name} cannot be found`);
    }
    return user;
  }

  // Get a user by username
  async getUserByUsername(username: string): Promise<UserEntity> {
    this.logger.log(`User Username: ${username}`);
    const user = this.users.find((user) => user.ID === username);
    if (!user) {
      throw new NotFoundException(`User ${username} cannot be found`);
    }
    return user;
  }

  // Get a user by email
  async getUserByEmail(email: string): Promise<UserEntity> {
    this.logger.log(`User Email: ${email}`);
    const user = this.users.find((user) => user.content.email === email);
    if (!user) {
      throw new NotFoundException(`User ${email} cannot be found`);
    }
    return user;
  }

  // Update a user metadata by UUID
  async updateUserMetadata(
    uuid: string,
    updatedMetadata: UserMetadataDTO,
  ): Promise<UserMetadataDTO> {
    this.logger.log(`User UUID: ${uuid} | User Metadata: ${updatedMetadata}`);
    const userIndex = this.users.findIndex((user) => user.UUID === uuid);
    if (userIndex === -1) {
      throw new NotFoundException(`User ${uuid} cannot be found`);
    }
    const updatedUserMetadata: UserMetadataEntity = {
      ...this.users[userIndex].metadata,
      ...instanceToPlain(updatedMetadata),
    };
    const updatedUser = new UserEntity(
      this.users[userIndex].ID,
      uuid,
      updatedUserMetadata,
      this.users[userIndex].content,
    );
    this.users[userIndex] = updatedUser;
    return updatedUser.metadata;
  }

  // Update a user content by UUID
  async updateUserContent(
    uuid: string,
    updatedContent: UserContentDTO,
  ): Promise<UserContentDTO> {
    this.logger.log(`User UUID: ${uuid} | User Content: ${updatedContent}`);
    const userIndex = this.users.findIndex((user) => user.UUID === uuid);
    if (userIndex === -1) {
      throw new NotFoundException(`User ${uuid} cannot be found`);
    }
    const updatedUserContent: UserContentEntity = {
      ...this.users[userIndex].content,
      ...updatedContent,
    };
    this.users[userIndex].metadata.dates.updatedAt = new Date();
    const updatedUser = new UserEntity(
      this.users[userIndex].ID,
      uuid,
      this.users[userIndex].metadata,
      updatedUserContent,
    );
    this.users[userIndex] = updatedUser;
    return updatedUser.content;
  }

  // Get a user metadata by UUID
  async getUserMetadata(uuid: string): Promise<UserMetadataDTO> {
    this.logger.log(`User UUID: ${uuid}`);
    const userIndex = this.users.findIndex((user) => user.UUID === uuid);
    if (userIndex === -1) {
      throw new NotFoundException(`User ${uuid} cannot be found`);
    }
    return this.users[userIndex].metadata;
  }

  // Get a user content by UUID
  async getUserContent(uuid: string): Promise<UserContentDTO> {
    this.logger.log(`User UUID: ${uuid}`);
    const userIndex = this.users.findIndex((user) => user.UUID === uuid);
    if (userIndex === -1) {
      throw new NotFoundException(`User ${uuid} cannot be found`);
    }
    return this.users[userIndex].content;
  }
}

class SingleJsonStorage implements StorageStrategy {
  private readonly logger = new Logger(SingleJsonStorage.name);
  constructor(
    private readonly filePath: string,
    private readonly readFromJSON: <T>(filePath: string) => Promise<T[]>,
    private readonly writeToJSON: <T>(filePath: string, data: T[]) => void,
  ) {}

  async listUserIdsAndUUIDs(): Promise<UserIdUuidDTO[]> {
    const users: UserEntity[] = await this.readFromJSON<UserEntity>(
      this.filePath,
    );
    return users.map((user) => ({
      ID: user.ID,
      UUID: user.UUID,
    }));
  }

  async listUsers(): Promise<UserEntity[]> {
    return this.readFromJSON<UserEntity>(this.filePath);
  }

  async getUser(UUID: string): Promise<UserEntity> {
    const users: UserEntity[] = await this.readFromJSON<UserEntity>(
      this.filePath,
    );
    const user: UserEntity | undefined = users.find(
      (user) => user.UUID === UUID,
    );
    if (!user) {
      throw new NotFoundException(`User ${UUID} cannot be found`);
    }
    return user;
  }

  async createUser(
    createUserRequestDTO: CreateUserRequestDTO,
  ): Promise<UserEntity> {
    const users: UserEntity[] = await this.readFromJSON<UserEntity>(
      this.filePath,
    );
    const newUUID: string = uuidV4();
    const newUserMetadata: UserMetadataEntity = plainToInstance(
      UserMetadataEntity,
      createUserRequestDTO.metadata,
    );
    const newUserContent: UserContentEntity = plainToInstance(
      UserContentEntity,
      createUserRequestDTO.content,
    );
    const newUser: UserEntity = new UserEntity(
      createUserRequestDTO.ID,
      newUUID,
      newUserMetadata,
      newUserContent,
    );
    users.push(newUser);
    this.writeToJSON(this.filePath, users);
    return newUser;
  }

  async updateUser(
    UUID: string,
    updateUserRequestDTO: UpdateUserRequestDTO,
  ): Promise<UserEntity> {
    const users: UserEntity[] = await this.readFromJSON<UserEntity>(
      this.filePath,
    );
    const userIndex = users.findIndex((user) => user.UUID === UUID);
    if (userIndex === -1) {
      throw new NotFoundException(`User ${UUID} cannot be found`);
    }
    const updatedUserMetadata: UserMetadataEntity = {
      ...users[userIndex].metadata,
      ...instanceToPlain(updateUserRequestDTO.metadata),
    };
    const updatedUserContent: UserContentEntity = {
      ...users[userIndex].content,
      ...updateUserRequestDTO.content,
    };
    const updatedUser = new UserEntity(
      users[userIndex].ID,
      UUID,
      updatedUserMetadata,
      updatedUserContent,
    );
    users[userIndex] = updatedUser;
    this.writeToJSON(this.filePath, users);
    return updatedUser;
  }

  async deleteUser(UUID: string): Promise<UserEntity> {
    const users: UserEntity[] = await this.readFromJSON<UserEntity>(
      this.filePath,
    );
    const userIndex = users.findIndex((user) => user.UUID === UUID);
    if (userIndex === -1) {
      throw new NotFoundException(`User ${UUID} cannot be found`);
    }
    const deletedUser: UserEntity = users.splice(userIndex, 1)[0];
    this.writeToJSON(this.filePath, users);
    return deletedUser;
  }

  async getUserByID(ID: string): Promise<UserEntity> {
    const users: UserEntity[] = await this.readFromJSON<UserEntity>(
      this.filePath,
    );
    const user: UserEntity | undefined = users.find((user) => user.ID === ID);
    if (!user) {
      throw new NotFoundException(`User ${ID} cannot be found`);
    }
    return user;
  }

  async getUserByName(name: string): Promise<UserEntity> {
    const users: UserEntity[] = await this.readFromJSON<UserEntity>(
      this.filePath,
    );
    const user: UserEntity | undefined = users.find(
      (user) => user.metadata.name === name,
    );
    if (!user) {
      throw new NotFoundException(`User ${name} cannot be found`);
    }
    return user;
  }

  // Get a user by username
  async getUserByUsername(username: string): Promise<UserEntity> {
    this.logger.log(`User Username: ${username}`);
    const users: UserEntity[] = await this.readFromJSON<UserEntity>(
      this.filePath,
    );
    const user = users.find((user) => user.ID === username);
    if (!user) {
      throw new NotFoundException(`User ${username} cannot be found`);
    }
    return user;
  }

  // Get a user by email
  async getUserByEmail(email: string): Promise<UserEntity> {
    this.logger.log(`User Email: ${email}`);
    const users: UserEntity[] = await this.readFromJSON<UserEntity>(
      this.filePath,
    );
    const user = users.find((user) => user.content.email === email);
    if (!user) {
      throw new NotFoundException(`User ${email} cannot be found`);
    }
    return user;
  }

  // Update a user metadata by UUID
  async updateUserMetadata(
    uuid: string,
    updatedMetadata: UserMetadataDTO,
  ): Promise<UserMetadataDTO> {
    this.logger.log(`User UUID: ${uuid} | User Metadata: ${updatedMetadata}`);
    const users: UserEntity[] = await this.readFromJSON<UserEntity>(
      this.filePath,
    );
    const userIndex = users.findIndex((user) => user.UUID === uuid);
    if (userIndex === -1) {
      throw new NotFoundException(`User ${uuid} cannot be found`);
    }
    const updatedUserMetadata: UserMetadataEntity = {
      ...users[userIndex].metadata,
      ...instanceToPlain(updatedMetadata),
    };
    const updatedUser = new UserEntity(
      users[userIndex].ID,
      uuid,
      updatedUserMetadata,
      users[userIndex].content,
    );
    users[userIndex] = updatedUser;
    this.writeToJSON(this.filePath, users);
    return updatedUser.metadata;
  }

  // Update a user content by UUID
  async updateUserContent(
    uuid: string,
    updatedContent: UserContentDTO,
  ): Promise<UserContentDTO> {
    this.logger.log(`User UUID: ${uuid} | User Content: ${updatedContent}`);
    const users: UserEntity[] = await this.readFromJSON<UserEntity>(
      this.filePath,
    );
    const userIndex = users.findIndex((user) => user.UUID === uuid);
    if (userIndex === -1) {
      throw new NotFoundException(`User ${uuid} cannot be found`);
    }
    const updatedUserContent: UserContentEntity = {
      ...users[userIndex].content,
      ...updatedContent,
    };
    users[userIndex].metadata.dates.updatedAt = new Date();
    const updatedUser = new UserEntity(
      users[userIndex].ID,
      uuid,
      users[userIndex].metadata,
      updatedUserContent,
    );
    users[userIndex] = updatedUser;
    this.writeToJSON(this.filePath, users);
    return updatedUser.content;
  }

  // Get a user metadata by UUID
  async getUserMetadata(uuid: string): Promise<UserMetadataDTO> {
    this.logger.log(`User UUID: ${uuid}`);
    const users: UserEntity[] = await this.readFromJSON<UserEntity>(
      this.filePath,
    );
    const userIndex = users.findIndex((user) => user.UUID === uuid);
    if (userIndex === -1) {
      throw new NotFoundException(`User ${uuid} cannot be found`);
    }
    return users[userIndex].metadata;
  }

  // Get a user content by UUID
  async getUserContent(uuid: string): Promise<UserContentDTO> {
    this.logger.log(`User UUID: ${uuid}`);
    const users: UserEntity[] = await this.readFromJSON<UserEntity>(
      this.filePath,
    );
    const userIndex = users.findIndex((user) => user.UUID === uuid);
    if (userIndex === -1) {
      throw new NotFoundException(`User ${uuid} cannot be found`);
    }
    return users[userIndex].content;
  }
}

class MultipleJsonStorage implements StorageStrategy {
  private readonly logger = new Logger(MultipleJsonStorage.name);
  constructor(
    private readonly dirPath: string,
    private readonly readFromJSON: <T>(filePath: string) => Promise<T>,
    private readonly writeToJSON: <T>(filePath: string, data: T) => void,
  ) {}

  async listUserIdsAndUUIDs(): Promise<UserIdUuidDTO[]> {
    const filesPath: string[] = glob.sync(
      `${this.dirPath}/*.${DEFAULT_FILE_STORAGE_EXTENSION}`,
    );
    const users: UserEntity[] = [];
    for (const filePath of filesPath) {
      if (existsSync(filePath)) {
        const user: UserEntity = await this.readFromJSON<UserEntity>(filePath);
        if (user) {
          users.push(user);
        }
      }
    }
    return users.map((user) => ({
      ID: user.ID,
      UUID: user.UUID,
    }));
  }

  async listUsers(): Promise<UserEntity[]> {
    const filesPath: string[] = glob.sync(
      `${this.dirPath}/*.${DEFAULT_FILE_STORAGE_EXTENSION}`,
    );
    const users: UserEntity[] = [];
    for (const filePath of filesPath) {
      if (existsSync(filePath)) {
        const user: UserEntity = await this.readFromJSON<UserEntity>(filePath);
        if (user) {
          users.push(user);
        }
      }
    }
    return users;
  }

  async getUser(UUID: string): Promise<UserEntity> {
    const filePath = `${this.dirPath}/${UUID}.${DEFAULT_FILE_STORAGE_EXTENSION}`;
    if (existsSync(filePath)) {
      return this.readFromJSON<UserEntity>(filePath);
    } else {
      throw new NotFoundException(`User ${UUID} cannot be found`);
    }
  }

  async createUser(
    createUserRequestDTO: CreateUserRequestDTO,
  ): Promise<UserEntity> {
    const newUUID: string = uuidV4();
    const newUserMetadata: UserMetadataEntity = plainToInstance(
      UserMetadataEntity,
      createUserRequestDTO.metadata,
    );
    const newUserContent: UserContentEntity = plainToInstance(
      UserContentEntity,
      createUserRequestDTO.content,
    );
    const newUser: UserEntity = new UserEntity(
      createUserRequestDTO.ID,
      newUUID,
      newUserMetadata,
      newUserContent,
    );
    const filePath = `${this.dirPath}/${newUUID}.${DEFAULT_FILE_STORAGE_EXTENSION}`;
    this.writeToJSON(filePath, newUser);
    return newUser;
  }

  async updateUser(
    UUID: string,
    updateUserRequestDTO: UpdateUserRequestDTO,
  ): Promise<UserEntity> {
    const filePath = `${this.dirPath}/${UUID}.${DEFAULT_FILE_STORAGE_EXTENSION}`;
    if (existsSync(filePath)) {
      const user: UserEntity = await this.readFromJSON<UserEntity>(filePath);
      if (!user) {
        throw new NotFoundException(`User ${UUID} cannot be found`);
      }
      const updatedUserMetadata: UserMetadataEntity = {
        ...user.metadata,
        ...instanceToPlain(updateUserRequestDTO.metadata),
      };
      const updatedUserContent: UserContentEntity = {
        ...user.content,
        ...updateUserRequestDTO.content,
      };
      const updatedUser = new UserEntity(
        user.ID,
        UUID,
        updatedUserMetadata,
        updatedUserContent,
      );
      this.writeToJSON(filePath, updatedUser);
      return updatedUser;
    } else {
      throw new NotFoundException(`User ${UUID} cannot be found`);
    }
  }

  async deleteUser(UUID: string): Promise<UserEntity> {
    const filePath = `${this.dirPath}/${UUID}.${DEFAULT_FILE_STORAGE_EXTENSION}`;
    this.logger.debug(filePath);
    if (existsSync(filePath)) {
      const deletedUser: UserEntity = await this.readFromJSON<UserEntity>(
        filePath,
      );
      if (!deletedUser) {
        throw new NotFoundException(`User ${UUID} cannot be found`);
      }
      await deleteFile(filePath);
      return deletedUser;
    } else {
      throw new NotFoundException(`User ${UUID} cannot be found`);
    }
  }

  async getUserByID(ID: string): Promise<UserEntity> {
    const filesPath: string[] = glob.sync(
      `${this.dirPath}/*.${DEFAULT_FILE_STORAGE_EXTENSION}`,
    );
    for (const filePath of filesPath) {
      if (existsSync(filePath)) {
        const user: UserEntity = await this.readFromJSON<UserEntity>(filePath);
        if (user.ID === ID) {
          return user;
        }
      }
    }
    throw new NotFoundException(`User ${name} cannot be found`);
  }

  async getUserByName(name: string): Promise<UserEntity> {
    const filesPath: string[] = glob.sync(
      `${this.dirPath}/*.${DEFAULT_FILE_STORAGE_EXTENSION}`,
    );
    for (const filePath of filesPath) {
      if (existsSync(filePath)) {
        const user: UserEntity = await this.readFromJSON<UserEntity>(filePath);
        if (user.metadata.name === name) {
          return user;
        }
      }
    }
    throw new NotFoundException(`User ${name} cannot be found`);
  }

  // Get a user by username
  async getUserByUsername(username: string): Promise<UserEntity> {
    this.logger.log(`User Username: ${username}`);
    const filesPath: string[] = glob.sync(
      `${this.dirPath}/*.${DEFAULT_FILE_STORAGE_EXTENSION}`,
    );
    for (const filePath of filesPath) {
      if (existsSync(filePath)) {
        const users = await this.readFromJSON<UserEntity[]>(filePath);
        const user = users.find((user) => user.ID === username);
        if (user) {
          return user;
        }
      }
    }
    throw new NotFoundException(`User ${username} cannot be found`);
  }

  // Get a user by email
  async getUserByEmail(email: string): Promise<UserEntity> {
    this.logger.log(`User Email: ${email}`);
    const filesPath: string[] = glob.sync(
      `${this.dirPath}/*.${DEFAULT_FILE_STORAGE_EXTENSION}`,
    );
    for (const filePath of filesPath) {
      if (existsSync(filePath)) {
        const users = await this.readFromJSON<UserEntity[]>(filePath);
        const user = users.find((user) => user.content.email === email);
        if (user) {
          return user;
        }
      }
    }
    throw new NotFoundException(`User ${email} cannot be found`);
  }

  // Update a user metadata by UUID
  async updateUserMetadata(
    uuid: string,
    updatedMetadata: UserMetadataDTO,
  ): Promise<UserMetadataDTO> {
    this.logger.log(`User UUID: ${uuid} | User Metadata: ${updatedMetadata}`);
    const filePath = `${this.dirPath}/${uuid}.${DEFAULT_FILE_STORAGE_EXTENSION}`;
    if (existsSync(filePath)) {
      const user: UserEntity = await this.readFromJSON<UserEntity>(filePath);
      if (!user) {
        throw new NotFoundException(`User ${uuid} cannot be found`);
      }
      const updatedUserMetadata: UserMetadataEntity = {
        ...user.metadata,
        ...instanceToPlain(updatedMetadata),
      };
      const updatedUser = new UserEntity(
        user.ID,
        uuid,
        updatedUserMetadata,
        user.content,
      );
      this.writeToJSON(filePath, updatedUser);
      return updatedUser.metadata;
    } else {
      throw new NotFoundException(`User ${uuid} cannot be found`);
    }
  }

  // Update a user content by UUID
  async updateUserContent(
    uuid: string,
    updatedContent: UserContentDTO,
  ): Promise<UserContentDTO> {
    this.logger.log(`User UUID: ${uuid} | User Content: ${updatedContent}`);
    const filePath = `${this.dirPath}/${uuid}.${DEFAULT_FILE_STORAGE_EXTENSION}`;
    if (existsSync(filePath)) {
      const user: UserEntity = await this.readFromJSON<UserEntity>(filePath);
      if (!user) {
        throw new NotFoundException(`User ${uuid} cannot be found`);
      }
      const updatedUserContent: UserContentEntity = {
        ...user.content,
        ...updatedContent,
      };
      user.metadata.dates.updatedAt = new Date();
      const updatedUser = new UserEntity(
        user.ID,
        uuid,
        user.metadata,
        updatedUserContent,
      );
      this.writeToJSON(filePath, updatedUser);
      return updatedUser.content;
    } else {
      throw new NotFoundException(`User ${uuid} cannot be found`);
    }
  }

  // Get a user metadata by UUID
  async getUserMetadata(uuid: string): Promise<UserMetadataDTO> {
    this.logger.log(`User UUID: ${uuid}`);
    const filePath = `${this.dirPath}/${uuid}.${DEFAULT_FILE_STORAGE_EXTENSION}`;
    if (existsSync(filePath)) {
      const user: UserEntity = await this.readFromJSON<UserEntity>(filePath);
      if (!user) {
        throw new NotFoundException(`User ${uuid} cannot be found`);
      }
      return user.metadata;
    } else {
      throw new NotFoundException(`User ${uuid} cannot be found`);
    }
  }

  // Get a user content by UUID
  async getUserContent(uuid: string): Promise<UserContentDTO> {
    this.logger.log(`User UUID: ${uuid}`);
    const filePath = `${this.dirPath}/${uuid}.${DEFAULT_FILE_STORAGE_EXTENSION}`;
    if (existsSync(filePath)) {
      const user: UserEntity = await this.readFromJSON<UserEntity>(filePath);
      if (!user) {
        throw new NotFoundException(`User ${uuid} cannot be found`);
      }
      return user.content;
    } else {
      throw new NotFoundException(`User ${uuid} cannot be found`);
    }
  }
}
