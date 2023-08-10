import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsEmail,
  IsObject,
  IsString,
  MinLength,
  isArray,
  isObject,
} from 'class-validator';
import { Expose } from 'class-transformer';
import { TaskMetadataDTO } from '../../task/dto/task-metadata.dto';

export class ColumnDTO<T extends TaskMetadataDTO> {
  constructor(name: string, tasks: T[]) {
    this.name = name;
    this.tasks = tasks;
  }

  @ApiProperty()
  @Expose({ name: 'name', toPlainOnly: true })
  @IsString()
  name: string;

  @ApiProperty()
  @Expose({ name: 'tasks', toPlainOnly: true })
  @IsObject()
  @IsArray()
  tasks: T[];
}

export const defaultKanbanColumns: ColumnDTO<TaskMetadataDTO>[] = [
  new ColumnDTO<TaskMetadataDTO>('Backlog', []),
  new ColumnDTO<TaskMetadataDTO>('To Do', []),
  new ColumnDTO<TaskMetadataDTO>('In Progress', []),
  new ColumnDTO<TaskMetadataDTO>('Done', []),
];

export const defaultScrumColumns: ColumnDTO<TaskMetadataDTO>[] = [
  new ColumnDTO<TaskMetadataDTO>('To Do', []),
  new ColumnDTO<TaskMetadataDTO>('In Progress', []),
  new ColumnDTO<TaskMetadataDTO>('Done', []),
];
