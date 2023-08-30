import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsIn,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class ProjectSuiteRootPathAnswerDTO {
  constructor(ProjectSuiteRootPath: string) {
    this.ProjectSuiteRootPath = ProjectSuiteRootPath;
  }
  @ApiProperty()
  @IsString()
  ProjectSuiteRootPath: string;
}
