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

export class TaskRelationsDTO {
  constructor(
    parent: string,
    subtasks: string[],
    predecessors: string[],
    successors: string[],
    relatedTasks: string[],
    blockedTasks: string[],
  ) {
    this.parent = parent;
    this.subtasks = subtasks;
    this.predecessors = predecessors;
    this.successors = successors;
    this.relatedTasks = relatedTasks;
    this.blockedTasks = blockedTasks;
  }

  @ApiProperty()
  @Expose({ name: 'parent', toPlainOnly: true })
  @IsString()
  parent: string;

  @ApiProperty()
  @Expose({ name: 'subtasks', toPlainOnly: true })
  @IsArray()
  subtasks: string[];

  @ApiProperty()
  @Expose({ name: 'predecessors', toPlainOnly: true })
  @IsArray()
  predecessors: string[];

  @ApiProperty()
  @Expose({ name: 'successors', toPlainOnly: true })
  @IsArray()
  successors: string[];

  @ApiProperty()
  @Expose({ name: 'relatedTasks', toPlainOnly: true })
  @IsArray()
  relatedTasks: string[];

  @ApiProperty()
  @Expose({ name: 'blockedTasks', toPlainOnly: true })
  @IsArray()
  blockedTasks: string[];
}
