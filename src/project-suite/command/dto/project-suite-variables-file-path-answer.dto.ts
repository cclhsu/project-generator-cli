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

export class ProjectSuiteVariablesFilePathAnswerDTO {
  constructor(projectSuiteVariablesFilePath: string) {
    this.projectSuiteVariablesFilePath = projectSuiteVariablesFilePath;
  }
  @ApiProperty()
  @IsString()
  projectSuiteVariablesFilePath: string;
}
