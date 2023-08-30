import { ApiProperty } from '@nestjs/swagger';
import { Answers } from 'inquirer';
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

export const PROJECT_ID_MSG: Answers = {
  regexp: /^[A-Z]{3}$/,
  message: 'Project ID is Unique identifier in the format "PPP".',
  example: 'e.g. ABC',
  typeMessage: 'Project ID must be a string',
  requiredMessage: 'Please enter an project ID',
  invalidMessage: 'Please enter a valid project ID',
  errorMessage: 'Please enter a valid project ID format (e.g. ABC)',
};

export class ProjectIdAnswerDTO {
  constructor(ID: string) {
    this.ID = ID;
  }

  @ApiProperty({
    description: PROJECT_ID_MSG.message,
    example: PROJECT_ID_MSG.example,
  })
  @Expose({ name: 'ID', toPlainOnly: true })
  @IsNotEmpty({ message: PROJECT_ID_MSG.requiredMessage })
  @IsString({ message: PROJECT_ID_MSG.typeMessage })
  @Matches(PROJECT_ID_MSG.regexp, {
    message: PROJECT_ID_MSG.errorMessage,
  })
  ID: string;
}
