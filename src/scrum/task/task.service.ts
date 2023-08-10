import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateTaskRequestDTO } from './dto/create-task-request.dto';
import { UpdateTaskRequestDTO } from './dto/update-task-request.dto';
import { TaskResponseDTO } from './dto/task-response.dto';
import { TaskEntity } from './entity/task.entity';
import { TaskLocalRepository as TaskRepository } from './repository/task-local.repository';
import { TaskMetadataDTO } from './dto/task-metadata.dto';
import { TaskContentDTO } from './dto/task-content.dto';
// import { TaskPrismaRepository as TaskRepository } from './repositories/task-prisma.repository';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(private readonly taskRepository: TaskRepository) {}

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
    const name: string = createTaskRequestDTO.metadata.name;

    try {
      // Check if task already exists
      const taskExists = await this.getTaskByName(name);
      if (taskExists) {
        throw new Error('Task already exists');
      }
    } catch (NotFoundException) {}

    // Create the task
    const task = await this.taskRepository.createTask(createTaskRequestDTO);
    this.logger.log(`Task: ${JSON.stringify(task, null, 2)}`);
    return this.convertToTaskResponse(task);
  }

  async updateTask(
    uuid: string,
    updateTaskRequestDTO: TaskResponseDTO,
  ): Promise<TaskResponseDTO> {
    // Check if task exists
    const task = await this.getTask(uuid);
    if (!task) {
      throw new NotFoundException('Task not found');
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

  async getTaskByName(name: string): Promise<TaskResponseDTO> {
    const task = await this.taskRepository.getTaskByName(name);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    this.logger.log(`Task: ${JSON.stringify(task, null, 2)}`);
    return this.convertToTaskResponse(task);
  }

  // Other methods...

  convertToTaskResponse(task: TaskEntity): TaskResponseDTO {
    const taskMetadata: TaskMetadataDTO = new TaskMetadataDTO(
      task.metadata.ID,
      task.metadata.name,
      task.metadata.taskType,
      task.metadata.assignee,
      task.metadata.status,
      task.metadata.priority,
      task.metadata.risk,
      task.metadata.tags,
      task.metadata.dates,
      task.metadata.storyPoint,
      task.metadata.sprints ?? [],
      task.metadata.relations ?? [],
    );
    const taskContent: TaskContentDTO = new TaskContentDTO(
      task.content.description,
      task.content.documentationLinks ?? [],
      task.content.comments ?? [],
    );
    const taskResponse: TaskResponseDTO = new TaskResponseDTO(
      task.UUID,
      taskMetadata,
      taskContent,
    );
    return taskResponse;
  }

  convertToTaskResponseList(tasks: TaskEntity[]): TaskResponseDTO[] {
    const taskResponseList: TaskResponseDTO[] = tasks.map((task) => {
      const taskMetadata: TaskMetadataDTO = new TaskMetadataDTO(
        task.metadata.ID,
        task.metadata.name,
        task.metadata.taskType,
        task.metadata.assignee,
        task.metadata.status,
        task.metadata.priority,
        task.metadata.risk,
        task.metadata.tags,
        task.metadata.dates,
        task.metadata.storyPoint,
        task.metadata.sprints ?? [],
        task.metadata.relations ?? [],
      );
      const taskContent: TaskContentDTO = new TaskContentDTO(
        task.content.description,
        task.content.documentationLinks ?? [],
        task.content.comments ?? [],
      );
      const taskResponse: TaskResponseDTO = new TaskResponseDTO(
        task.UUID,
        taskMetadata,
        taskContent,
      );
      return taskResponse;
    });

    return taskResponseList;
  }
}
