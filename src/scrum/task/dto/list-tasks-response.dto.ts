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
import { TaskResponseDTO } from './task-response.dto';

export class ListTaskResponseDTO {
  constructor(tasks: TaskResponseDTO[]) {
    this.tasks = tasks;
  }

  @ApiProperty({ type: () => TaskResponseDTO, isArray: true })
  @Expose({ name: 'tasks', toPlainOnly: true })
  @IsArray()
  @ValidateNested({ each: true })
  readonly tasks: TaskResponseDTO[];
}
