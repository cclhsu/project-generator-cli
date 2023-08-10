import { TaskResponseDTO } from './task-response.dto';

export class ListTaskResponseDTO {
  constructor(tasks: TaskResponseDTO[]) {
    this.tasks = tasks;
  }
  tasks: TaskResponseDTO[];
}
