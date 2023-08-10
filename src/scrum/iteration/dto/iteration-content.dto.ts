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
import { TaskMetadataDTO } from '../../task/dto/task-metadata.dto';
import { ColumnDTO } from './column.dto';

export class IterationContentDTO {
  constructor(
    description: string,
    goal: string,
    // tasks: string[],
    columns: ColumnDTO<TaskMetadataDTO>[],
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
  columns: ColumnDTO<TaskMetadataDTO>[];
}
