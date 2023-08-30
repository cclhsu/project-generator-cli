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

export class ProjectIterationAnswerDTO {
  constructor(projectIteration: string) {
    this.projectIteration = projectIteration;
  }

  @ApiProperty({
    description: 'Name or identifier of the project iteration.',
    example: 'frontend-iteration',
  })
  @IsString({ message: 'Project iteration must be a string.' })
  projectIteration: string;
}
