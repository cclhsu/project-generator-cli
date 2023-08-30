import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { CreateTaskRequestDTO, TaskIdUuidStatusDTO } from '../dto';
import { UpdateTaskRequestDTO } from '../dto';
import { TaskEntity } from '../entity/task.entity';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { TaskMetadataEntity } from '../entity/task-metadata.entity';
import { TaskContentEntity } from '../entity/task-content.entity';
import { CommonDateEntity } from '../../../common/entity/common-date.entity';
import { existsSync, mkdirSync, readFileSync } from 'fs';
import {
  DEFAULT_DATABASE_STORAGE_DEVICE_TYPE,
  DEFAULT_FILE_STORAGE_DEVICE_TYPE,
  DEFAULT_FILE_STORAGE_EXTENSION,
  DEFAULT_STORAGE_DEVICE_TYPE,
  DEFAULT_STORAGE_FILE_TYPE,
  DEFAULT_TASK_FILE_PATH,
  DEFAULT_TASK_PATH,
  STORAGE_DEVICE_TYPES,
} from '../../../common/constant';
import { glob } from 'glob';
import { createDirectory } from '../../../utils/directory/directory.utils';
import { deleteFile } from '../../../utils/file/file.utils';
import { TaskMetadataDTO, TaskContentDTO, TaskIdUuidDTO } from '../dto';
import { ListIterationIdsAndUUIDsCommand } from '../../iteration/command/list-iteration-ids-uuids.command';

@Injectable()
export class TaskLocalRepository {
  private readonly logger = new Logger(TaskLocalRepository.name);
  private storageStrategy: StorageStrategy;

  private tasks: TaskEntity[] = [];

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

  // Get all task IDs, UUIDs and status
  async ListTaskIdsUUIDsStatues(): Promise<TaskIdUuidStatusDTO[]> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.ListTaskIdsUUIDsStatues();
  }

  // Get all task IDs and UUIDs
  async listTaskIdsAndUUIDs(): Promise<TaskIdUuidDTO[]> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.listTaskIdsAndUUIDs();
  }

  // Get all tasks
  async listTasks(): Promise<TaskEntity[]> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.listTasks();
  }

  // Get a task by UUID
  async getTask(UUID: string): Promise<TaskEntity> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.getTask(UUID);
  }

  // Create a new task
  async createTask(
    createTaskRequestDTO: CreateTaskRequestDTO,
  ): Promise<TaskEntity> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.createTask(createTaskRequestDTO);
  }

  // Update a task by UUID
  async updateTask(
    UUID: string,
    updateTaskRequestDTO: UpdateTaskRequestDTO,
  ): Promise<TaskEntity> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.updateTask(UUID, updateTaskRequestDTO);
  }

  // Delete a task by UUID
  async deleteTask(UUID: string): Promise<TaskEntity> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.deleteTask(UUID);
  }

  // Get a task by ID
  async getTaskByID(ID: string): Promise<TaskEntity> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.getTaskByID(ID);
  }

  // Get a task by name
  async getTaskByName(name: string): Promise<TaskEntity> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.getTaskByName(name);
  }

  // Update a task metadata by UUID
  async updateTaskMetadata(
    UUID: string,
    updatedMetadata: TaskMetadataDTO,
  ): Promise<TaskMetadataDTO> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.updateTaskMetadata(UUID, updatedMetadata);
  }

  // Update a task content by UUID
  async updateTaskContent(
    UUID: string,
    updatedContent: TaskContentDTO,
  ): Promise<TaskContentDTO> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.updateTaskContent(UUID, updatedContent);
  }

  // Get a task metadata by UUID
  async getTaskMetadata(UUID: string): Promise<TaskMetadataDTO> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.getTaskMetadata(UUID);
  }

  // Get a task content by UUID
  async getTaskContent(UUID: string): Promise<TaskContentDTO> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.getTaskContent(UUID);
  }

  private getStorageStrategy(): StorageStrategy {
    if (DEFAULT_STORAGE_DEVICE_TYPE === 'file') {
      if (DEFAULT_FILE_STORAGE_DEVICE_TYPE === 'json') {
        if (DEFAULT_STORAGE_FILE_TYPE === 'single') {
          return new SingleJsonStorage(
            DEFAULT_TASK_FILE_PATH,
            this.readArrayFromJSON,
            this.writeArrayToJSON,
          );
        } else if (DEFAULT_STORAGE_FILE_TYPE === 'multiple') {
          return new MultipleJsonStorage(
            DEFAULT_TASK_PATH,
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
    return String(this.tasks.length + 1);
    // return uuidv4();
  }

  async readTaskFromJSON(filePath: string): Promise<TaskEntity> {
    return this.readSingleFromJSON<TaskEntity>(filePath);
  }

  async writeTaskToJSON(filePath: string, task: TaskEntity): Promise<void> {
    this.writeSingleToJSON<TaskEntity>(filePath, task);
  }

  async readTaskFromYAML(filePath: string): Promise<TaskEntity> {
    return this.readSingleFromYAML<TaskEntity>(filePath);
  }

  async writeTaskToYAML(filePath: string, task: TaskEntity): Promise<void> {
    this.writeSingleToYAML<TaskEntity>(filePath, task);
  }

  async readTaskFromCSV(filePath: string): Promise<TaskEntity> {
    return this.readSingleFromCSV<TaskEntity>(filePath);
  }

  async writeTaskToCSV(filePath: string, task: TaskEntity): Promise<void> {
    this.writeSingleToCSV<TaskEntity>(filePath, task);
  }

  async readTasksFromJSON(filePath: string): Promise<TaskEntity[]> {
    return this.readArrayFromJSON<TaskEntity>(filePath);
  }

  async writeTasksToJSON(filePath: string, tasks: TaskEntity[]): Promise<void> {
    this.writeArrayToJSON<TaskEntity>(filePath, tasks);
  }

  async readTasksFromYAML(filePath: string): Promise<TaskEntity[]> {
    return this.readArrayFromYAML<TaskEntity>(filePath);
  }

  async writeTasksToYAML(filePath: string, tasks: TaskEntity[]): Promise<void> {
    this.writeArrayToYAML<TaskEntity>(filePath, tasks);
  }

  async readTasksFromCSV(filePath: string): Promise<TaskEntity[]> {
    return this.readArrayFromCSV<TaskEntity>(filePath);
  }

  async writeTasksToCSV(filePath: string, tasks: TaskEntity[]): Promise<void> {
    this.writeArrayToCSV<TaskEntity>(filePath, tasks);
  }
}

interface StorageStrategy {
  ListTaskIdsUUIDsStatues(): Promise<TaskIdUuidStatusDTO[]>;
  listTaskIdsAndUUIDs(): Promise<TaskIdUuidDTO[]>;
  listTasks(): Promise<TaskEntity[]>;
  getTask(UUID: string): Promise<TaskEntity>;
  createTask(createTaskRequestDTO: CreateTaskRequestDTO): Promise<TaskEntity>;
  updateTask(
    UUID: string,
    updateTaskRequestDTO: UpdateTaskRequestDTO,
  ): Promise<TaskEntity>;
  deleteTask(UUID: string): Promise<TaskEntity>;
  getTaskByID(ID: string): Promise<TaskEntity>;
  getTaskByName(name: string): Promise<TaskEntity>;
  updateTaskMetadata(
    uuid: string,
    updatedMetadata: TaskMetadataDTO,
  ): Promise<TaskMetadataDTO>;
  updateTaskContent(
    uuid: string,
    updatedContent: TaskContentDTO,
  ): Promise<TaskContentDTO>;
  getTaskMetadata(uuid: string): Promise<TaskMetadataDTO>;
  getTaskContent(uuid: string): Promise<TaskContentDTO>;
  // searchTasks(query: string): Promise<TaskEntity[]>;
}

class MemoryStorage implements StorageStrategy {
  private readonly logger = new Logger(MemoryStorage.name);
  private tasks: TaskEntity[] = [
    // new TaskEntity(
    //   'ABC-123',
    //   '00000000-0000-0000-0000-000000000001',
    //   new TaskMetadataEntity(
    //     'Task 1',
    //     new CommonDateEntity(
    //       new Date('2021-01-01T00:00:00.000Z'),
    //       'john.doe',
    //       new Date('2021-01-01T00:00:00.000Z'),
    //       'john.doe',
    //       new Date('2021-01-01T00:00:00.000Z'),
    //       'john.doe',
    //       new Date('2021-01-01T00:00:00.000Z'),
    //       new Date('2021-01-01T00:00:00.000Z'),
    //       new Date('2021-01-01T00:00:00.000Z'),
    //       'john.doe',
    //     ),
    //   ),
    //   new TaskContentEntity(['john.doe', 'jane.doe'], 'john.doe', 'jane.doe'),
    // ),
    // new TaskEntity(
    //   'XYZ-789',
    //   '00000000-0000-0000-0000-000000000002',
    //   new TaskMetadataEntity(
    //     'Task 2',
    //     new CommonDateEntity(
    //       new Date('2021-01-01T00:00:00.000Z'),
    //       'jane.doe',
    //       new Date('2021-01-01T00:00:00.000Z'),
    //       'jane.doe',
    //       new Date('2021-01-01T00:00:00.000Z'),
    //       'jane.doe',
    //       new Date('2021-01-01T00:00:00.000Z'),
    //       new Date('2021-01-01T00:00:00.000Z'),
    //       new Date('2021-01-01T00:00:00.000Z'),
    //       'jane.doe',
    //     ),
    //   ),
    //   new TaskContentEntity(['john.doe', 'jane.doe'], 'john.doe', 'jane.doe'),
    // ),
  ];

  async ListTaskIdsUUIDsStatues(): Promise<TaskIdUuidStatusDTO[]> {
    return this.tasks.map((task) => ({
      ID: task.ID,
      UUID: task.UUID,
      status: task.metadata.status,
    }));
  }

  async listTaskIdsAndUUIDs(): Promise<TaskIdUuidDTO[]> {
    return this.tasks.map((task) => ({
      ID: task.ID,
      UUID: task.UUID,
    }));
  }

  async listTasks(): Promise<TaskEntity[]> {
    return this.tasks;
  }

  async getTask(UUID: string): Promise<TaskEntity> {
    const task: TaskEntity | undefined = this.tasks.find(
      (task) => task.UUID === UUID,
    );
    if (!task) {
      throw new NotFoundException(`Task ${UUID} cannot be found`);
    }
    return task;
  }

  async createTask(
    createTaskRequestDTO: CreateTaskRequestDTO,
  ): Promise<TaskEntity> {
    const newUUID: string = uuidV4();
    const newTaskMetadata: TaskMetadataEntity = plainToInstance(
      TaskMetadataEntity,
      createTaskRequestDTO.metadata,
    );
    const newTaskContent: TaskContentEntity = plainToInstance(
      TaskContentEntity,
      createTaskRequestDTO.content,
    );
    const newTask: TaskEntity = new TaskEntity(
      createTaskRequestDTO.ID,
      newUUID,
      newTaskMetadata,
      newTaskContent,
    );
    this.tasks.push(newTask);
    return newTask;
  }

  async updateTask(
    UUID: string,
    updateTaskRequestDTO: UpdateTaskRequestDTO,
  ): Promise<TaskEntity> {
    const taskIndex = this.tasks.findIndex((task) => task.UUID === UUID);
    if (taskIndex === -1) {
      throw new NotFoundException(`Task ${UUID} cannot be found`);
    }
    const updatedTaskMetadata: TaskMetadataEntity = {
      ...this.tasks[taskIndex].metadata,
      ...instanceToPlain(updateTaskRequestDTO.metadata),
    };
    const updatedTaskContent: TaskContentEntity = {
      ...this.tasks[taskIndex].content,
      ...updateTaskRequestDTO.content,
    };
    const updatedTask = new TaskEntity(
      this.tasks[taskIndex].ID,
      UUID,
      updatedTaskMetadata,
      updatedTaskContent,
    );
    this.tasks[taskIndex] = updatedTask;
    return updatedTask;
  }

  async deleteTask(UUID: string): Promise<TaskEntity> {
    const taskIndex = this.tasks.findIndex((task) => task.UUID === UUID);
    if (taskIndex === -1) {
      throw new NotFoundException(`Task ${UUID} cannot be found`);
    }
    const deletedTask: TaskEntity = this.tasks.splice(taskIndex, 1)[0];
    return deletedTask;
  }

  async getTaskByID(ID: string): Promise<TaskEntity> {
    const task: TaskEntity | undefined = this.tasks.find(
      (task) => task.ID === ID,
    );
    if (!task) {
      throw new NotFoundException(`Task ${ID} cannot be found`);
    }
    return task;
  }

  async getTaskByName(name: string): Promise<TaskEntity> {
    const task: TaskEntity | undefined = this.tasks.find(
      (task) => task.metadata.name === name,
    );
    if (!task) {
      throw new NotFoundException(`Task ${name} cannot be found`);
    }
    return task;
  }

  // Update a task metadata by UUID
  async updateTaskMetadata(
    uuid: string,
    updatedMetadata: TaskMetadataDTO,
  ): Promise<TaskMetadataDTO> {
    this.logger.log(`Task UUID: ${uuid} | Task Metadata: ${updatedMetadata}`);
    const taskIndex = this.tasks.findIndex((task) => task.UUID === uuid);
    if (taskIndex === -1) {
      throw new NotFoundException(`Task ${uuid} cannot be found`);
    }
    const updatedTaskMetadata: TaskMetadataEntity = {
      ...this.tasks[taskIndex].metadata,
      ...instanceToPlain(updatedMetadata),
    };
    const updatedTask = new TaskEntity(
      this.tasks[taskIndex].ID,
      uuid,
      updatedTaskMetadata,
      this.tasks[taskIndex].content,
    );
    this.tasks[taskIndex] = updatedTask;
    return updatedTask.metadata;
  }

  // Update a task content by UUID
  async updateTaskContent(
    uuid: string,
    updatedContent: TaskContentDTO,
  ): Promise<TaskContentDTO> {
    this.logger.log(`Task UUID: ${uuid} | Task Content: ${updatedContent}`);
    const taskIndex = this.tasks.findIndex((task) => task.UUID === uuid);
    if (taskIndex === -1) {
      throw new NotFoundException(`Task ${uuid} cannot be found`);
    }
    const updatedTaskContent: TaskContentEntity = {
      ...this.tasks[taskIndex].content,
      ...updatedContent,
    };
    this.tasks[taskIndex].metadata.dates.updatedAt = new Date();
    const updatedTask = new TaskEntity(
      this.tasks[taskIndex].ID,
      uuid,
      this.tasks[taskIndex].metadata,
      updatedTaskContent,
    );
    this.tasks[taskIndex] = updatedTask;
    return updatedTask.content;
  }

  // Get a task metadata by UUID
  async getTaskMetadata(uuid: string): Promise<TaskMetadataDTO> {
    this.logger.log(`Task UUID: ${uuid}`);
    const taskIndex = this.tasks.findIndex((task) => task.UUID === uuid);
    if (taskIndex === -1) {
      throw new NotFoundException(`Task ${uuid} cannot be found`);
    }
    return this.tasks[taskIndex].metadata;
  }

  // Get a task content by UUID
  async getTaskContent(uuid: string): Promise<TaskContentDTO> {
    this.logger.log(`Task UUID: ${uuid}`);
    const taskIndex = this.tasks.findIndex((task) => task.UUID === uuid);
    if (taskIndex === -1) {
      throw new NotFoundException(`Task ${uuid} cannot be found`);
    }
    return this.tasks[taskIndex].content;
  }
}

class SingleJsonStorage implements StorageStrategy {
  private readonly logger = new Logger(SingleJsonStorage.name);
  constructor(
    private readonly filePath: string,
    private readonly readFromJSON: <T>(filePath: string) => Promise<T[]>,
    private readonly writeToJSON: <T>(filePath: string, data: T[]) => void,
  ) {}

  async ListTaskIdsUUIDsStatues(): Promise<TaskIdUuidStatusDTO[]> {
    const tasks: TaskEntity[] = await this.readFromJSON<TaskEntity>(
      this.filePath,
    );
    return tasks.map((task) => ({
      ID: task.ID,
      UUID: task.UUID,
      status: task.metadata.status,
    }));
  }

  async listTaskIdsAndUUIDs(): Promise<TaskIdUuidDTO[]> {
    const tasks: TaskEntity[] = await this.readFromJSON<TaskEntity>(
      this.filePath,
    );
    return tasks.map((task) => ({
      ID: task.ID,
      UUID: task.UUID,
    }));
  }

  async listTasks(): Promise<TaskEntity[]> {
    return this.readFromJSON<TaskEntity>(this.filePath);
  }

  async getTask(UUID: string): Promise<TaskEntity> {
    const tasks: TaskEntity[] = await this.readFromJSON<TaskEntity>(
      this.filePath,
    );
    const task: TaskEntity | undefined = tasks.find(
      (task) => task.UUID === UUID,
    );
    if (!task) {
      throw new NotFoundException(`Task ${UUID} cannot be found`);
    }
    return task;
  }

  async createTask(
    createTaskRequestDTO: CreateTaskRequestDTO,
  ): Promise<TaskEntity> {
    const tasks: TaskEntity[] = await this.readFromJSON<TaskEntity>(
      this.filePath,
    );
    const newUUID: string = uuidV4();
    const newTaskMetadata: TaskMetadataEntity = plainToInstance(
      TaskMetadataEntity,
      createTaskRequestDTO.metadata,
    );
    const newTaskContent: TaskContentEntity = plainToInstance(
      TaskContentEntity,
      createTaskRequestDTO.content,
    );
    const newTask: TaskEntity = new TaskEntity(
      createTaskRequestDTO.ID,
      newUUID,
      newTaskMetadata,
      newTaskContent,
    );
    tasks.push(newTask);
    this.writeToJSON(this.filePath, tasks);
    return newTask;
  }

  async updateTask(
    UUID: string,
    updateTaskRequestDTO: UpdateTaskRequestDTO,
  ): Promise<TaskEntity> {
    const tasks: TaskEntity[] = await this.readFromJSON<TaskEntity>(
      this.filePath,
    );
    const taskIndex = tasks.findIndex((task) => task.UUID === UUID);
    if (taskIndex === -1) {
      throw new NotFoundException(`Task ${UUID} cannot be found`);
    }
    const updatedTaskMetadata: TaskMetadataEntity = {
      ...tasks[taskIndex].metadata,
      ...instanceToPlain(updateTaskRequestDTO.metadata),
    };
    const updatedTaskContent: TaskContentEntity = {
      ...tasks[taskIndex].content,
      ...updateTaskRequestDTO.content,
    };
    const updatedTask = new TaskEntity(
      tasks[taskIndex].ID,
      UUID,
      updatedTaskMetadata,
      updatedTaskContent,
    );
    tasks[taskIndex] = updatedTask;
    this.writeToJSON(this.filePath, tasks);
    return updatedTask;
  }

  async deleteTask(UUID: string): Promise<TaskEntity> {
    const tasks: TaskEntity[] = await this.readFromJSON<TaskEntity>(
      this.filePath,
    );
    const taskIndex = tasks.findIndex((task) => task.UUID === UUID);
    if (taskIndex === -1) {
      throw new NotFoundException(`Task ${UUID} cannot be found`);
    }
    const deletedTask: TaskEntity = tasks.splice(taskIndex, 1)[0];
    this.writeToJSON(this.filePath, tasks);
    return deletedTask;
  }

  async getTaskByID(ID: string): Promise<TaskEntity> {
    const tasks: TaskEntity[] = await this.readFromJSON<TaskEntity>(
      this.filePath,
    );
    const task: TaskEntity | undefined = tasks.find((task) => task.ID === ID);
    if (!task) {
      throw new NotFoundException(`Task ${ID} cannot be found`);
    }
    return task;
  }

  async getTaskByName(name: string): Promise<TaskEntity> {
    const tasks: TaskEntity[] = await this.readFromJSON<TaskEntity>(
      this.filePath,
    );
    const task: TaskEntity | undefined = tasks.find(
      (task) => task.metadata.name === name,
    );
    if (!task) {
      throw new NotFoundException(`Task ${name} cannot be found`);
    }
    return task;
  }

  // Update a task metadata by UUID
  async updateTaskMetadata(
    uuid: string,
    updatedMetadata: TaskMetadataDTO,
  ): Promise<TaskMetadataDTO> {
    this.logger.log(`Task UUID: ${uuid} | Task Metadata: ${updatedMetadata}`);
    const tasks: TaskEntity[] = await this.readFromJSON<TaskEntity>(
      this.filePath,
    );
    const taskIndex = tasks.findIndex((task) => task.UUID === uuid);
    if (taskIndex === -1) {
      throw new NotFoundException(`Task ${uuid} cannot be found`);
    }
    const updatedTaskMetadata: TaskMetadataEntity = {
      ...tasks[taskIndex].metadata,
      ...instanceToPlain(updatedMetadata),
    };
    const updatedTask = new TaskEntity(
      tasks[taskIndex].ID,
      uuid,
      updatedTaskMetadata,
      tasks[taskIndex].content,
    );
    tasks[taskIndex] = updatedTask;
    this.writeToJSON(this.filePath, tasks);
    return updatedTask.metadata;
  }

  // Update a task content by UUID
  async updateTaskContent(
    uuid: string,
    updatedContent: TaskContentDTO,
  ): Promise<TaskContentDTO> {
    this.logger.log(`Task UUID: ${uuid} | Task Content: ${updatedContent}`);
    const tasks: TaskEntity[] = await this.readFromJSON<TaskEntity>(
      this.filePath,
    );
    const taskIndex = tasks.findIndex((task) => task.UUID === uuid);
    if (taskIndex === -1) {
      throw new NotFoundException(`Task ${uuid} cannot be found`);
    }
    const updatedTaskContent: TaskContentEntity = {
      ...tasks[taskIndex].content,
      ...updatedContent,
    };
    tasks[taskIndex].metadata.dates.updatedAt = new Date();
    const updatedTask = new TaskEntity(
      tasks[taskIndex].ID,
      uuid,
      tasks[taskIndex].metadata,
      updatedTaskContent,
    );
    tasks[taskIndex] = updatedTask;
    this.writeToJSON(this.filePath, tasks);
    return updatedTask.content;
  }

  // Get a task metadata by UUID
  async getTaskMetadata(uuid: string): Promise<TaskMetadataDTO> {
    this.logger.log(`Task UUID: ${uuid}`);
    const tasks: TaskEntity[] = await this.readFromJSON<TaskEntity>(
      this.filePath,
    );
    const taskIndex = tasks.findIndex((task) => task.UUID === uuid);
    if (taskIndex === -1) {
      throw new NotFoundException(`Task ${uuid} cannot be found`);
    }
    return tasks[taskIndex].metadata;
  }

  // Get a task content by UUID
  async getTaskContent(uuid: string): Promise<TaskContentDTO> {
    this.logger.log(`Task UUID: ${uuid}`);
    const tasks: TaskEntity[] = await this.readFromJSON<TaskEntity>(
      this.filePath,
    );
    const taskIndex = tasks.findIndex((task) => task.UUID === uuid);
    if (taskIndex === -1) {
      throw new NotFoundException(`Task ${uuid} cannot be found`);
    }
    return tasks[taskIndex].content;
  }
}

class MultipleJsonStorage implements StorageStrategy {
  private readonly logger = new Logger(MultipleJsonStorage.name);
  constructor(
    private readonly dirPath: string,
    private readonly readFromJSON: <T>(filePath: string) => Promise<T>,
    private readonly writeToJSON: <T>(filePath: string, data: T) => void,
  ) {}

  async ListTaskIdsUUIDsStatues(): Promise<TaskIdUuidStatusDTO[]> {
    const filesPath: string[] = glob.sync(
      `${this.dirPath}/*.${DEFAULT_FILE_STORAGE_EXTENSION}`,
    );
    const tasks: TaskIdUuidStatusDTO[] = [];
    for (const filePath of filesPath) {
      if (existsSync(filePath)) {
        const task: TaskEntity = await this.readFromJSON<TaskEntity>(filePath);
        if (task) {
          tasks.push({
            ID: task.ID,
            UUID: task.UUID,
            status: task.metadata.status,
          });
        }
      }
    }
    return tasks;
  }

  async listTaskIdsAndUUIDs(): Promise<TaskIdUuidDTO[]> {
    const filesPath: string[] = glob.sync(
      `${this.dirPath}/*.${DEFAULT_FILE_STORAGE_EXTENSION}`,
    );
    const tasks: TaskIdUuidDTO[] = [];
    for (const filePath of filesPath) {
      if (existsSync(filePath)) {
        const task: TaskEntity = await this.readFromJSON<TaskEntity>(filePath);
        if (task) {
          tasks.push({
            ID: task.ID,
            UUID: task.UUID,
          });
        }
      }
    }
    return tasks;
  }

  async listTasks(): Promise<TaskEntity[]> {
    const filesPath: string[] = glob.sync(
      `${this.dirPath}/*.${DEFAULT_FILE_STORAGE_EXTENSION}`,
    );
    const tasks: TaskEntity[] = [];
    for (const filePath of filesPath) {
      if (existsSync(filePath)) {
        const task: TaskEntity = await this.readFromJSON<TaskEntity>(filePath);
        if (task) {
          tasks.push(task);
        }
      }
    }
    return tasks;
  }

  async getTask(UUID: string): Promise<TaskEntity> {
    const filePath = `${this.dirPath}/${UUID}.${DEFAULT_FILE_STORAGE_EXTENSION}`;
    if (existsSync(filePath)) {
      return this.readFromJSON<TaskEntity>(filePath);
    } else {
      throw new NotFoundException(`Task ${UUID} cannot be found`);
    }
  }

  async createTask(
    createTaskRequestDTO: CreateTaskRequestDTO,
  ): Promise<TaskEntity> {
    const newUUID: string = uuidV4();
    const newTaskMetadata: TaskMetadataEntity = plainToInstance(
      TaskMetadataEntity,
      createTaskRequestDTO.metadata,
    );
    const newTaskContent: TaskContentEntity = plainToInstance(
      TaskContentEntity,
      createTaskRequestDTO.content,
    );
    const newTask: TaskEntity = new TaskEntity(
      createTaskRequestDTO.ID,
      newUUID,
      newTaskMetadata,
      newTaskContent,
    );
    const filePath = `${this.dirPath}/${newUUID}.${DEFAULT_FILE_STORAGE_EXTENSION}`;
    this.writeToJSON(filePath, newTask);
    return newTask;
  }

  async updateTask(
    UUID: string,
    updateTaskRequestDTO: UpdateTaskRequestDTO,
  ): Promise<TaskEntity> {
    const filePath = `${this.dirPath}/${UUID}.${DEFAULT_FILE_STORAGE_EXTENSION}`;
    if (existsSync(filePath)) {
      const task: TaskEntity = await this.readFromJSON<TaskEntity>(filePath);
      if (!task) {
        throw new NotFoundException(`Task ${UUID} cannot be found`);
      }
      const updatedTaskMetadata: TaskMetadataEntity = {
        ...task.metadata,
        ...instanceToPlain(updateTaskRequestDTO.metadata),
      };
      const updatedTaskContent: TaskContentEntity = {
        ...task.content,
        ...updateTaskRequestDTO.content,
      };
      const updatedTask = new TaskEntity(
        task.ID,
        UUID,
        updatedTaskMetadata,
        updatedTaskContent,
      );
      this.writeToJSON(filePath, updatedTask);
      return updatedTask;
    } else {
      throw new NotFoundException(`Task ${UUID} cannot be found`);
    }
  }

  async deleteTask(UUID: string): Promise<TaskEntity> {
    const filePath = `${this.dirPath}/${UUID}.${DEFAULT_FILE_STORAGE_EXTENSION}`;
    this.logger.debug(filePath);
    if (existsSync(filePath)) {
      const deletedTask: TaskEntity = await this.readFromJSON<TaskEntity>(
        filePath,
      );
      if (!deletedTask) {
        throw new NotFoundException(`Task ${UUID} cannot be found`);
      }
      await deleteFile(filePath);
      return deletedTask;
    } else {
      throw new NotFoundException(`Task ${UUID} cannot be found`);
    }
  }

  async getTaskByID(ID: string): Promise<TaskEntity> {
    const filesPath: string[] = glob.sync(
      `${this.dirPath}/*.${DEFAULT_FILE_STORAGE_EXTENSION}`,
    );
    for (const filePath of filesPath) {
      if (existsSync(filePath)) {
        const task = await this.readFromJSON<TaskEntity>(filePath);
        if (task.ID === ID) {
          return task;
        }
      }
    }
    throw new NotFoundException(`Task ${name} cannot be found`);
  }

  async getTaskByName(name: string): Promise<TaskEntity> {
    const filesPath: string[] = glob.sync(
      `${this.dirPath}/*.${DEFAULT_FILE_STORAGE_EXTENSION}`,
    );
    for (const filePath of filesPath) {
      if (existsSync(filePath)) {
        const task = await this.readFromJSON<TaskEntity>(filePath);
        if (task.metadata.name === name) {
          return task;
        }
      }
    }
    throw new NotFoundException(`Task ${name} cannot be found`);
  }

  // Update a task metadata by UUID
  async updateTaskMetadata(
    uuid: string,
    updatedMetadata: TaskMetadataDTO,
  ): Promise<TaskMetadataDTO> {
    this.logger.log(`Task UUID: ${uuid} | Task Metadata: ${updatedMetadata}`);
    const filePath = `${this.dirPath}/${uuid}.${DEFAULT_FILE_STORAGE_EXTENSION}`;
    if (existsSync(filePath)) {
      const task: TaskEntity = await this.readFromJSON<TaskEntity>(filePath);
      if (!task) {
        throw new NotFoundException(`Task ${uuid} cannot be found`);
      }
      const updatedTaskMetadata: TaskMetadataEntity = {
        ...task.metadata,
        ...instanceToPlain(updatedMetadata),
      };
      const updatedTask = new TaskEntity(
        task.ID,
        uuid,
        updatedTaskMetadata,
        task.content,
      );
      this.writeToJSON(filePath, updatedTask);
      return updatedTask.metadata;
    } else {
      throw new NotFoundException(`Task ${uuid} cannot be found`);
    }
  }

  // Update a task content by UUID
  async updateTaskContent(
    uuid: string,
    updatedContent: TaskContentDTO,
  ): Promise<TaskContentDTO> {
    this.logger.log(`Task UUID: ${uuid} | Task Content: ${updatedContent}`);
    const filePath = `${this.dirPath}/${uuid}.${DEFAULT_FILE_STORAGE_EXTENSION}`;
    if (existsSync(filePath)) {
      const task: TaskEntity = await this.readFromJSON<TaskEntity>(filePath);
      if (!task) {
        throw new NotFoundException(`Task ${uuid} cannot be found`);
      }
      const updatedTaskContent: TaskContentEntity = {
        ...task.content,
        ...updatedContent,
      };
      task.metadata.dates.updatedAt = new Date();
      const updatedTask = new TaskEntity(
        task.ID,
        uuid,
        task.metadata,
        updatedTaskContent,
      );
      this.writeToJSON(filePath, updatedTask);
      return updatedTask.content;
    } else {
      throw new NotFoundException(`Task ${uuid} cannot be found`);
    }
  }

  // Get a task metadata by UUID
  async getTaskMetadata(uuid: string): Promise<TaskMetadataDTO> {
    this.logger.log(`Task UUID: ${uuid}`);
    const filePath = `${this.dirPath}/${uuid}.${DEFAULT_FILE_STORAGE_EXTENSION}`;
    if (existsSync(filePath)) {
      const task: TaskEntity = await this.readFromJSON<TaskEntity>(filePath);
      if (!task) {
        throw new NotFoundException(`Task ${uuid} cannot be found`);
      }
      return task.metadata;
    } else {
      throw new NotFoundException(`Task ${uuid} cannot be found`);
    }
  }

  // Get a task content by UUID
  async getTaskContent(uuid: string): Promise<TaskContentDTO> {
    this.logger.log(`Task UUID: ${uuid}`);
    const filePath = `${this.dirPath}/${uuid}.${DEFAULT_FILE_STORAGE_EXTENSION}`;
    if (existsSync(filePath)) {
      const task: TaskEntity = await this.readFromJSON<TaskEntity>(filePath);
      if (!task) {
        throw new NotFoundException(`Task ${uuid} cannot be found`);
      }
      return task.content;
    } else {
      throw new NotFoundException(`Task ${uuid} cannot be found`);
    }
  }
}
