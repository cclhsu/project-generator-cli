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
import { ProjectDTO } from '../../../scrum/project/dto';

export class ProjectsAnswerDTO {
  constructor(projects: ProjectDTO[]) {
    this.projects = projects;
  }

  @ApiProperty({
    description: 'An array of project DTOs.',
    type: () => ProjectDTO,
    isArray: true,
  })
  @Expose({ name: 'projects', toPlainOnly: true })
  @IsArray({ message: 'Projects must be an array' })
  @ValidateNested({ each: true })
  projects: ProjectDTO[];
}
