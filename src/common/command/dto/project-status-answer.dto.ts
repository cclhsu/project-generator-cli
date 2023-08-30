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
import {
  PROJECT_STATUS_TYPES,
  DEFAULT_PROJECT_STATUS,
  PROJECT_STATUS_TYPE_ARRAY,
} from '../../../common/constant';

export const PROJECT_STATUS_MSG: Answers = {
  regexp: new RegExp(`^(${PROJECT_STATUS_TYPE_ARRAY.join('|')})$`) as RegExp,
  message: 'Project status is a type of PROJECT_STATUS_TYPES',
  example: PROJECT_STATUS_TYPE_ARRAY,
  default: DEFAULT_PROJECT_STATUS,
  typeMessage: 'Project status must be a string',
  requiredMessage: 'Please enter an project status',
  invalidMessage:
    'Invalid project status type. Allowed values: ' +
    PROJECT_STATUS_TYPE_ARRAY.join(', '),
  errorMessage:
    'Please enter a valid project status in the type of ' +
    PROJECT_STATUS_TYPE_ARRAY.join(', '),
};

export class ProjectStatusAnswerDTO {
  constructor(projectStatus: PROJECT_STATUS_TYPES = DEFAULT_PROJECT_STATUS) {
    this.projectStatus = projectStatus;
  }

  @ApiProperty({
    description: PROJECT_STATUS_MSG.message,
    example: PROJECT_STATUS_MSG.example,
    type: [String],
    default: PROJECT_STATUS_MSG.default,
  })
  @Expose({ name: 'projectStatus', toPlainOnly: true })
  @IsNotEmpty({ message: PROJECT_STATUS_MSG.requiredMessage })
  @IsString({ message: PROJECT_STATUS_MSG.typeMessage })
  @IsEnum(PROJECT_STATUS_TYPE_ARRAY, {
    message: PROJECT_STATUS_MSG.invalidMessage,
    context: {
      reason: 'projectStatus',
    },
  })
  projectStatus: PROJECT_STATUS_TYPES;
}
