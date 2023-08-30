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
  PROJECT_ROLE_TYPES,
  DEFAULT_PROJECT_ROLE,
  PROJECT_ROLE_TYPE_ARRAY,
} from '../../../common/constant';

export const PROJECT_ROLE_MSG: Answers = {
  regexp: new RegExp(`^(${PROJECT_ROLE_TYPE_ARRAY.join('|')})$`) as RegExp,
  message: 'Project role is a type of PROJECT_ROLE_TYPES',
  example: PROJECT_ROLE_TYPE_ARRAY,
  default: DEFAULT_PROJECT_ROLE,
  typeMessage: 'Project role must be a string',
  requiredMessage: 'Please enter an project role',
  invalidMessage:
    'Invalid project role type. Allowed values: ' +
    PROJECT_ROLE_TYPE_ARRAY.join(', '),
  errorMessage:
    'Please enter a valid project role in the type of ' +
    PROJECT_ROLE_TYPE_ARRAY.join(', '),
};

export class ProjectRoleAnswerDTO {
  constructor(projectRole: PROJECT_ROLE_TYPES = DEFAULT_PROJECT_ROLE) {
    this.projectRole = projectRole;
  }

  @ApiProperty({
    description: PROJECT_ROLE_MSG.message,
    example: PROJECT_ROLE_MSG.example,
    type: [String],
    default: PROJECT_ROLE_MSG.default,
  })
  @Expose({ name: 'projectRole', toPlainOnly: true })
  @IsNotEmpty({ message: PROJECT_ROLE_MSG.requiredMessage })
  @IsString({ message: PROJECT_ROLE_MSG.typeMessage })
  @IsEnum(PROJECT_ROLE_TYPE_ARRAY, {
    message: PROJECT_ROLE_MSG.invalidMessage,
    context: {
      reason: 'projectRole',
    },
  })
  projectRole: PROJECT_ROLE_TYPES;
}
