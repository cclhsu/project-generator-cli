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
import { IdUuidStatusDTO } from '../../../common/dto';

export class TasksIdUuidStatusAnswerDTO {
  constructor(tasks: IdUuidStatusDTO[]) {
    this.tasks = tasks;
  }

  @ApiProperty({
    description: 'An array of task DTOs.',
    type: () => IdUuidStatusDTO,
    isArray: true,
  })
  @Expose({ name: 'tasks', toPlainOnly: true })
  @IsArray({ message: 'Tasks must be an array' })
  @ValidateNested({ each: true })
  tasks: IdUuidStatusDTO[];
}
