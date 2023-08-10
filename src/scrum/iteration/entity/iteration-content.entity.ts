import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsEmail,
  IsObject,
  IsString,
  MinLength,
  isObject,
} from 'class-validator';
import { Expose } from 'class-transformer';
import { TaskMetadataEntity } from '../../task/entity/task-metadata.entity';
import { ColumnEntity } from './column.entity';

export class IterationContentEntity {
  constructor(
    description: string,
    goal: string,
    // tasks: string[],
    columns: ColumnEntity<TaskMetadataEntity>[],
  ) {
    this.description = description;
    this.goal = goal;
    // this.tasks = tasks;
    this.columns = columns;
  }

  @ApiProperty()
  @Expose({ name: 'description', toPlainOnly: true })
  @IsString()
  description: string;

  @ApiProperty()
  @Expose({ name: 'goal', toPlainOnly: true })
  @IsString()
  goal: string;

  // @ApiProperty()
  // @Expose({ name: 'tasks', toPlainOnly: true })
  // @IsArray()
  // tasks: string[];

  @ApiProperty()
  @Expose({ name: 'columns', toPlainOnly: true })
  @IsArray()
  columns: ColumnEntity<TaskMetadataEntity>[];
}
