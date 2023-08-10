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
import { TaskMetadataEntity } from '../../task/entity/task-metadata.entity';

export class ColumnEntity<T extends TaskMetadataEntity> {
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

export const defaultKanbanColumns: ColumnEntity<TaskMetadataEntity>[] = [
  new ColumnEntity<TaskMetadataEntity>('Backlog', []),
  new ColumnEntity<TaskMetadataEntity>('To Do', []),
  new ColumnEntity<TaskMetadataEntity>('In Progress', []),
  new ColumnEntity<TaskMetadataEntity>('Done', []),
];

export const defaultScrumColumns: ColumnEntity<TaskMetadataEntity>[] = [
  new ColumnEntity<TaskMetadataEntity>('To Do', []),
  new ColumnEntity<TaskMetadataEntity>('In Progress', []),
  new ColumnEntity<TaskMetadataEntity>('Done', []),
];
