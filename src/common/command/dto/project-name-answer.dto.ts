import { Answers } from 'inquirer';
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

export const PROJECT_NAME_MSG: Answers = {
  regexp: /^[A-Z][A-Za-z]+(: [A-Z][a-z]+)? Project$/,
  message: 'Project name is Unique identifier in the format "XYZ Project".',
  example: 'e.g. XYZ Project',
  typeMessage: 'Project name must be a string',
  requiredMessage: 'Please enter an project name',
  invalidMessage: 'Please enter a valid project name',
  MinLengthMessage: 'Project name must have at least 2 characters',
  MaxLengthMessage: 'Project name cannot exceed 100 characters',
  errorMessage: 'Please enter a valid project name format (e.g. XYZ Project)',
};

export class ProjectNameAnswerDTO {
  constructor(projectName: string) {
    this.projectName = projectName;
  }

  @ApiProperty({
    description: PROJECT_NAME_MSG.message,
    example: PROJECT_NAME_MSG.example,
  })
  @Expose({ name: 'projectName', toPlainOnly: true })
  @IsNotEmpty({ message: PROJECT_NAME_MSG.requiredMessage })
  @IsString({ message: PROJECT_NAME_MSG.typeMessage })
  @MinLength(2, { message: PROJECT_NAME_MSG.MinLengthMessage })
  @MaxLength(100, { message: PROJECT_NAME_MSG.MaxLengthMessage })
  @Matches(PROJECT_NAME_MSG.regexp, {
    message: PROJECT_NAME_MSG.errorMessage,
  })
  projectName: string;
}
