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
import { ProjectResponseDTO } from './project-response.dto';

export class ListProjectResponseDTO {
  constructor(projects: ProjectResponseDTO[]) {
    this.projects = projects;
  }

  @ApiProperty({ type: () => ProjectResponseDTO, isArray: true })
  @Expose({ name: 'projects', toPlainOnly: true })
  @IsArray()
  @ValidateNested({ each: true })
  projects: ProjectResponseDTO[];
}
