import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNumberString,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { TaskRelationsDTO } from '../../../scrum/task/dto/relation';

export class TaskRelationsAnswerDTO {
  constructor(taskRelations: TaskRelationsDTO[]) {
    this.taskRelations = taskRelations;
  }

  @ApiProperty({
    description: 'An array of TaskRelationsDTOs.',
    type: () => TaskRelationsDTO,
    isArray: true,
  })
  @Expose({ name: 'taskRelations', toPlainOnly: true })
  @IsArray({ message: 'Task Relations must be an array' })
  @ValidateNested({ each: true })
  taskRelations: TaskRelationsDTO[];
}
