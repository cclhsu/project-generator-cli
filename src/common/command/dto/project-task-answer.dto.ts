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

export class ProjectTaskAnswerDTO {
  constructor(projectTask: string) {
    this.projectTask = projectTask;
  }

  @ApiProperty({
    description: 'Name or identifier of the project task.',
    example: 'frontend-task',
  })
  @IsString({ message: 'Project task must be a string.' })
  projectTask: string;
}
