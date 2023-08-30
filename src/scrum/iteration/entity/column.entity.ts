import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsEmail,
  IsObject,
  IsString,
  IsUUID,
  MinLength,
  isArray,
  isObject,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { TaskMetadataEntity } from '../../task/entity/task-metadata.entity';

export class ColumnEntity<T extends TaskMetadataEntity> {
  constructor(name: string, tasks: T[]) {
    this.name = name;
    this.tasks = tasks;
  }

  @ApiProperty({
    description: 'Name of the column.',
  })
  @Expose({ name: 'name', toPlainOnly: true })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Tasks in the column.',
  })
  @Expose({ name: 'tasks', toPlainOnly: true })
  tasks: T[];
}

export const generateDefaultColumns = (
  columnNames: string[],
): ColumnEntity<TaskMetadataEntity>[] => {
  return columnNames.map(
    (columnName) => new ColumnEntity<TaskMetadataEntity>(columnName, []),
  );
};

export const defaultKanbanColumns = generateDefaultColumns([
  'Backlog',
  'To Do',
  'In Progress',
  'Done',
]);

export const defaultScrumColumns = generateDefaultColumns([
  'To Do',
  'In Progress',
  'Done',
]);
