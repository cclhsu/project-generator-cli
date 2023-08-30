import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateTaskRequestDTO } from './dto/create-task-request.dto';
import { UpdateTaskRequestDTO } from './dto/update-task-request.dto';
import { TaskResponseDTO } from './dto/task-response.dto';
import { TaskEntity } from './entity/task.entity';
import { TaskLocalRepository as TaskRepository } from './repository/task-local.repository';
import { TaskMetadataDTO } from './dto/task-metadata.dto';
import { TaskContentDTO } from './dto/task-content.dto';
import {
  UpdateTaskMetadataRequestDTO,
  TaskMetadataResponseDTO,
  UpdateTaskContentRequestDTO,
  TaskContentResponseDTO,
  TaskIdUuidDTO,
  TaskIdUuidStatusDTO,
} from './dto';
import { validateDtoMetadataContent } from '../../utils/validation/validation.utils';
import { CommonDateDTO } from '../../common/dto';
import { updateCommonDates } from '../../common/command/utils';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(private readonly taskRepository: TaskRepository) {}

  async ListTaskIdsUUIDsStatues(): Promise<TaskIdUuidStatusDTO[]> {
    return this.taskRepository.ListTaskIdsUUIDsStatues();
  }

  async listTaskIdsAndUUIDs(): Promise<TaskIdUuidDTO[]> {
    return this.taskRepository.listTaskIdsAndUUIDs();
  }

  async listTasks(): Promise<TaskResponseDTO[]> {
    const tasks = await this.taskRepository.listTasks();
    this.logger.log(`Tasks: ${JSON.stringify(tasks, null, 2)}`);
    return this.convertToTaskResponseList(tasks);
  }

  async getTask(uuid: string): Promise<TaskResponseDTO> {
    const task = await this.taskRepository.getTask(uuid);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    this.logger.log(`Task: ${JSON.stringify(task, null, 2)}`);
    return this.convertToTaskResponse(task);
  }

  async createTask(
    createTaskRequestDTO: CreateTaskRequestDTO,
  ): Promise<TaskResponseDTO> {
    const {
      ID,
      UUID,
      metadata: { name },
    } = createTaskRequestDTO;

    if (await this.isTaskExist(name, ID, UUID)) {
      throw new Error('Task with the same name, ID, or UUID already exists');
    }

    const error = await validateDtoMetadataContent<CreateTaskRequestDTO>(
      createTaskRequestDTO,
    );
    if (error) {
      throw new Error(error);
    }

    // Create the task
    const task = await this.taskRepository.createTask(createTaskRequestDTO);
    this.logger.log(`Task: ${JSON.stringify(task, null, 2)}`);
    return this.convertToTaskResponse(task);
  }

  async updateTask(
    uuid: string,
    updateTaskRequestDTO: UpdateTaskRequestDTO,
  ): Promise<TaskResponseDTO> {
    // Check if task exists
    const task = await this.getTask(uuid);
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const dates: CommonDateDTO = updateCommonDates(
      task.metadata.dates,
      updateTaskRequestDTO.metadata.dates,
    );
    updateTaskRequestDTO.metadata.dates = dates;

    const error = await validateDtoMetadataContent<UpdateTaskRequestDTO>(
      updateTaskRequestDTO,
    );
    if (error) {
      throw new Error(error);
    }

    // Update the task
    const updatedTask = await this.taskRepository.updateTask(
      uuid,
      updateTaskRequestDTO,
    );

    if (!updatedTask) {
      throw new Error('Failed to update task');
    }

    this.logger.log(`Task: ${JSON.stringify(updatedTask, null, 2)}`);
    return this.convertToTaskResponse(updatedTask);
  }

  async deleteTask(uuid: string): Promise<TaskResponseDTO> {
    // Check if task exists
    const task = await this.getTask(uuid);
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    // Delete the task
    const deleteTask = await this.taskRepository.deleteTask(uuid);
    if (!deleteTask) {
      throw new Error('Failed to delete task');
    }

    this.logger.log(`Task: ${JSON.stringify(deleteTask, null, 2)}`);
    return this.convertToTaskResponse(deleteTask);
  }

  async getTaskByID(ID: string): Promise<TaskResponseDTO> {
    const task = await this.taskRepository.getTaskByID(ID);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    this.logger.log(`Task: ${JSON.stringify(task, null, 2)}`);
    return this.convertToTaskResponse(task);
  }

  async getTaskByName(name: string): Promise<TaskResponseDTO> {
    const task = await this.taskRepository.getTaskByName(name);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    this.logger.log(`Task: ${JSON.stringify(task, null, 2)}`);
    return this.convertToTaskResponse(task);
  }

  async listTasksWithMetadata(): Promise<TaskMetadataResponseDTO[]> {
    const tasks = await this.taskRepository.listTasks();
    return tasks.map((task) => this.convertToTaskMetadataResponse(task));
  }

  async updateTaskMetadata(
    uuid: string,
    updateTaskMetadataRequestDTO: UpdateTaskMetadataRequestDTO,
  ): Promise<TaskMetadataResponseDTO> {
    // Check if task exists
    const task = await this.getTask(uuid);
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const dates: CommonDateDTO = updateCommonDates(
      task.metadata.dates,
      updateTaskMetadataRequestDTO.metadata.dates,
    );
    updateTaskMetadataRequestDTO.metadata.dates = dates;

    // Update the task
    const updatedTaskMetadata: TaskMetadataDTO =
      await this.taskRepository.updateTaskMetadata(
        uuid,
        updateTaskMetadataRequestDTO.metadata,
      );

    if (!updatedTaskMetadata) {
      throw new Error('Failed to update task');
    }

    this.logger.log(`Task: ${JSON.stringify(updatedTaskMetadata, null, 2)}`);
    return new TaskMetadataResponseDTO(task.ID, uuid, updatedTaskMetadata);
  }

  async updateTaskContent(
    uuid: string,
    updateTaskContentRequestDTO: UpdateTaskContentRequestDTO,
  ): Promise<TaskContentResponseDTO> {
    // Check if task exists
    const task = await this.getTask(uuid);
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    // // Update the dates values UpdatedAt and UpdatedBy
    // const dates: CommonDateDTO = updateCommonDates(
    //   task.metadata.dates,
    //   updateTaskContentRequestDTO.metadata.dates,
    //   true,
    // );
    // updateTaskContentRequestDTO.metadata.dates = dates;

    // Update the task
    const updatedTaskContent: TaskContentDTO =
      await this.taskRepository.updateTaskContent(
        uuid,
        updateTaskContentRequestDTO.content,
      );

    if (!updatedTaskContent) {
      throw new Error('Failed to update task');
    }

    this.logger.log(`Task: ${JSON.stringify(updatedTaskContent, null, 2)}`);
    return new TaskContentResponseDTO(task.ID, uuid, updatedTaskContent);
  }

  async getTaskMetadata(uuid: string): Promise<TaskMetadataResponseDTO> {
    const task = await this.taskRepository.getTask(uuid);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    this.logger.log(`Task: ${JSON.stringify(task, null, 2)}`);
    return new TaskMetadataResponseDTO(task.ID, uuid, task.metadata);
  }

  async getTaskContent(uuid: string): Promise<TaskContentResponseDTO> {
    const task = await this.taskRepository.getTask(uuid);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    this.logger.log(`Task: ${JSON.stringify(task, null, 2)}`);
    return new TaskContentResponseDTO(task.ID, uuid, task.content);
  }

  // Other methods...

  async isTaskExist(name: string, ID: string, UUID: string): Promise<boolean> {
    try {
      const taskByName = await this.taskRepository.getTaskByName(name);
      if (taskByName) {
        return true;
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.verbose(`Task not found by name: ${name}`);
      } else {
        this.logger.error(error);
      }
    }

    try {
      const taskByID = await this.taskRepository.getTaskByID(ID);
      if (taskByID) {
        return true;
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.verbose(`Task not found by ID: ${ID}`);
      } else {
        this.logger.error(error);
      }
    }

    try {
      const taskByUUID = await this.taskRepository.getTask(UUID);
      if (taskByUUID) {
        return true;
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.verbose(`Task not found by UUID: ${UUID}`);
      } else {
        this.logger.error(error);
      }
    }
    return false;
  }

  async isNoTasksExist(): Promise<boolean> {
    const tasks = await this.taskRepository.listTasks();
    return tasks.length === 0;
  }

  async isExactlyOneTaskExist(): Promise<boolean> {
    const tasks = await this.taskRepository.listTasks();
    return tasks.length === 1;
  }

  async isAtLeastOneTaskExist(): Promise<boolean> {
    const tasks = await this.taskRepository.listTasks();
    return tasks.length >= 1;
  }

  convertToTaskResponse(task: TaskEntity): TaskResponseDTO {
    this.logger.verbose(`Converting Task: ${JSON.stringify(task, null, 2)}`);
    const taskMetadata: TaskMetadataDTO = new TaskMetadataDTO(
      task.metadata.name,
      task.metadata.taskType,
      task.metadata.assignee,
      task.metadata.status,
      task.metadata.priority,
      task.metadata.risk,
      task.metadata.tags,
      task.metadata.dates,
      task.metadata.storyPoint,
      task.metadata.iterations ?? [],
      task.metadata.relations ?? [],
    );
    const taskContent: TaskContentDTO = new TaskContentDTO(
      task.content.context,
      task.content.description,
      task.content.links ?? [],
      task.content.messages ?? [],
    );
    const taskResponse: TaskResponseDTO = new TaskResponseDTO(
      task.ID,
      task.UUID,
      taskMetadata,
      taskContent,
    );
    return taskResponse;
  }

  convertToTaskResponseList(tasks: TaskEntity[]): TaskResponseDTO[] {
    this.logger.verbose(`Converting Tasks: ${JSON.stringify(tasks, null, 2)}`);
    const taskResponseList: TaskResponseDTO[] = tasks.map((task) => {
      const taskMetadata: TaskMetadataDTO = new TaskMetadataDTO(
        task.metadata.name,
        task.metadata.taskType,
        task.metadata.assignee,
        task.metadata.status,
        task.metadata.priority,
        task.metadata.risk,
        task.metadata.tags,
        task.metadata.dates,
        task.metadata.storyPoint,
        task.metadata.iterations ?? [],
        task.metadata.relations ?? [],
      );
      const taskContent: TaskContentDTO = new TaskContentDTO(
        task.content.context,
        task.content.description,
        task.content.links ?? [],
        task.content.messages ?? [],
      );
      const taskResponse: TaskResponseDTO = new TaskResponseDTO(
        task.ID,
        task.UUID,
        taskMetadata,
        taskContent,
      );
      return taskResponse;
    });

    return taskResponseList;
  }

  private convertToTaskMetadataResponse(
    task: TaskEntity,
  ): TaskMetadataResponseDTO {
    const taskMetadata: TaskMetadataDTO = new TaskMetadataDTO(
      task.metadata.name,
      task.metadata.taskType,
      task.metadata.assignee,
      task.metadata.status,
      task.metadata.priority,
      task.metadata.risk,
      task.metadata.tags,
      task.metadata.dates,
      task.metadata.storyPoint,
      task.metadata.iterations ?? [],
      task.metadata.relations ?? [],
    );
    return new TaskMetadataResponseDTO(task.ID, task.UUID, taskMetadata);
  }
}
