import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { CreateUserRequestDTO } from '../dto/create-user-request.dto';
import { UpdateUserRequestDTO } from '../dto/update-user-request.dto';
import { UserEntity } from '../entity/user.entity';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { existsSync, mkdirSync, readFileSync } from 'fs';
import {
  DEFAULT_DATABASE_STORAGE_DEVICE_TYPE,
  DEFAULT_FILE_STORAGE_DEVICE_TYPE,
  DEFAULT_FILE_STORAGE_EXTENSION,
  DEFAULT_STORAGE_DEVICE_TYPE,
  DEFAULT_STORAGE_FILE_TYPE,
  DEFAULT_USER_FILE_PATH,
  DEFAULT_USER_PATH,
  STORAGE_DEVICE_TYPES,
} from 'src/scrum/common/constant/repository.constant';
import { glob } from 'glob';
import { createDirectory } from 'src/utils/directory/directory.utils';
import { deleteFile } from 'src/utils/file/file.utils';
import { throws } from 'assert';

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
    private readonly writeArrayToCSV: <T>(filePath: string, data: T[]) => void, // @Inject('ReadArrayFromMarkdown') // private readonly readArrayFromMarkdown: <T>(filePath: string) => Promise<T[]>, // @Inject('WriteArrayToMarkdown')
  ) // private readonly writeArrayToMarkdown: <T>(filePath: string, data: T[]) => void,
  {
    this.storageStrategy = this.getStorageStrategy();
  }

  // Get all users
  async listUsers(): Promise<UserEntity[]> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.listUsers();
  }

  // Get a user by ID
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

  // Update a user by ID
  async updateUser(
    UUID: string,
    updateUserRequestDTO: UpdateUserRequestDTO,
  ): Promise<UserEntity> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.updateUser(UUID, updateUserRequestDTO);
  }

  // Delete a user by ID
  async deleteUser(UUID: string): Promise<UserEntity> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.deleteUser(UUID);
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
  listUsers(): Promise<UserEntity[]>;
  getUser(UUID: string): Promise<UserEntity>;
  createUser(createUserRequestDTO: CreateUserRequestDTO): Promise<UserEntity>;
  updateUser(
    UUID: string,
    updateUserRequestDTO: UpdateUserRequestDTO,
  ): Promise<UserEntity>;
  deleteUser(UUID: string): Promise<UserEntity>;
  getUserByName(name: string): Promise<UserEntity>;
  getUserByUsername(username: string): Promise<UserEntity>;
  getUserByEmail(email: string): Promise<UserEntity>;
}

class MemoryStorage implements StorageStrategy {
  private readonly logger = new Logger(MemoryStorage.name);
  private users: UserEntity[] = [
    new UserEntity(
      '00000000-0000-0000-0000-000000000001',
      'john.doe@mail.com',
      '0911223344',
      'john.doe',
      'changeme',
      new Date('2000/01/01'),
      new Date('2000/12/31'),
    ),
    new UserEntity(
      '00000000-0000-0000-0000-000000000002',
      'jane.doe@mail.com',
      '0911223344',
      'jane.doe',
      'password123',
      new Date('2000/01/01'),
      new Date('2000/12/31'),
    ),
  ];

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
    const newUser = new UserEntity(
      newUUID,
      createUserRequestDTO.email,
      createUserRequestDTO.phone,
      createUserRequestDTO.username,
      createUserRequestDTO.password,
      // createUserRequestDTO.hash,
      new Date(),
      new Date(),
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
    const updatedUser = {
      // ...this.users[userIndex],
      // ...updateUserRequestDTO,
      UUID: UUID,
      Email: updateUserRequestDTO.email,
      Phone: updateUserRequestDTO.phone,
      Username: updateUserRequestDTO.username,
      Password: updateUserRequestDTO.password,
      // Hash: this.users[userIndex].Hash,
      CreateTimestamp: this.users[userIndex].CreateTimestamp,
      UpdateTimestamp: new Date(),
    };
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

  async getUserByName(name: string): Promise<UserEntity> {
    throw new Error('Method not implemented.');
    // const user: UserEntity | undefined = this.users.find(
    //   (user) => user.name === name,
    // );
    // if (!user) {
    //   throw new NotFoundException(`User ${name} cannot be found`);
    // }
    // return user;
  }

  // Get a user by username
  async getUserByUsername(username: string): Promise<UserEntity> {
    this.logger.log(`User Username: ${username}`);
    const user = this.users.find((user) => user.Username === username);
    if (!user) {
      throw new NotFoundException(`User ${username} cannot be found`);
    }
    return user;
  }

  // Get a user by email
  async getUserByEmail(email: string): Promise<UserEntity> {
    this.logger.log(`User Email: ${email}`);
    const user = this.users.find((user) => user.Email === email);
    if (!user) {
      throw new NotFoundException(`User ${email} cannot be found`);
    }
    return user;
  }
}

class SingleJsonStorage implements StorageStrategy {
  private readonly logger = new Logger(SingleJsonStorage.name);
  constructor(
    private readonly filePath: string,
    private readonly readFromJSON: <T>(filePath: string) => Promise<T[]>,
    private readonly writeToJSON: <T>(filePath: string, data: T[]) => void,
  ) {}

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
    const newUser = new UserEntity(
      newUUID,
      createUserRequestDTO.email,
      createUserRequestDTO.phone,
      createUserRequestDTO.username,
      createUserRequestDTO.password,
      // createUserRequestDTO.hash,
      new Date(),
      new Date(),
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
    const updatedUser = {
      // ...this.users[userIndex],
      // ...updateUserRequestDTO,
      UUID: UUID,
      Email: updateUserRequestDTO.email,
      Phone: updateUserRequestDTO.phone,
      Username: updateUserRequestDTO.username,
      Password: updateUserRequestDTO.password,
      // Hash: this.users[userIndex].Hash,
      CreateTimestamp: users[userIndex].CreateTimestamp,
      UpdateTimestamp: new Date(),
    };
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

  async getUserByName(name: string): Promise<UserEntity> {
    throw new Error('Method not implemented.');
    // const users: UserEntity[] = await this.readFromJSON<UserEntity>(
    //   this.filePath,
    // );
    // const user: UserEntity | undefined = users.find(
    //   (user) => user.name === name,
    // );
    // if (!user) {
    //   throw new NotFoundException(`User ${name} cannot be found`);
    // }
    // return user;
  }

  // Get a user by username
  async getUserByUsername(username: string): Promise<UserEntity> {
    this.logger.log(`User Username: ${username}`);
    const users: UserEntity[] = await this.readFromJSON<UserEntity>(
      this.filePath,
    );
    const user = users.find((user) => user.Username === username);
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
    const user = users.find((user) => user.Email === email);
    if (!user) {
      throw new NotFoundException(`User ${email} cannot be found`);
    }
    return user;
  }
}

class MultipleJsonStorage implements StorageStrategy {
  private readonly logger = new Logger(MultipleJsonStorage.name);
  constructor(
    private readonly dirPath: string,
    private readonly readFromJSON: <T>(filePath: string) => Promise<T>,
    private readonly writeToJSON: <T>(filePath: string, data: T) => void,
  ) {}

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
    const newUser = new UserEntity(
      newUUID,
      createUserRequestDTO.email,
      createUserRequestDTO.phone,
      createUserRequestDTO.username,
      createUserRequestDTO.password,
      // createUserRequestDTO.hash,
      new Date(),
      new Date(),
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
      const updatedUser = {
        // ...this.users[userIndex],
        // ...updateUserRequestDTO,
        UUID: UUID,
        Email: updateUserRequestDTO.email,
        Phone: updateUserRequestDTO.phone,
        Username: updateUserRequestDTO.username,
        Password: updateUserRequestDTO.password,
        // Hash: this.users[userIndex].Hash,
        CreateTimestamp: user.CreateTimestamp,
        UpdateTimestamp: new Date(),
      };
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

  async getUserByName(name: string): Promise<UserEntity> {
    throw new Error('Method not implemented.');
    // const filesPath: string[] = glob.sync(
    //   `${this.dirPath}/*.${DEFAULT_FILE_STORAGE_EXTENSION}`,
    // );
    // for (const filePath of filesPath) {
    //   if (existsSync(filePath)) {
    //     const users = await this.readFromJSON<UserEntity[]>(filePath);
    //     const user = users.find((user) => user.name === name);
    //     if (user) {
    //       return user;
    //     }
    //   }
    // }
    // throw new NotFoundException(`User ${name} cannot be found`);
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
        const user = users.find((user) => user.Username === username);
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
        const user = users.find((user) => user.Email === email);
        if (user) {
          return user;
        }
      }
    }
    throw new NotFoundException(`User ${email} cannot be found`);
  }
}
