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

export const PROJECT_ROLES_MSG: Answers = {
  regexp: new RegExp(`^(${PROJECT_ROLE_TYPE_ARRAY.join('|')})$`) as RegExp,
  message: 'Project roles is a type of PROJECT_ROLES_TYPES',
  example: PROJECT_ROLE_TYPE_ARRAY,
  default: DEFAULT_PROJECT_ROLE,
  typeMessage: 'Project roles must be an array of string',
  requiredMessage: 'Please enter an project roles',
  invalidMessage:
    'Invalid project roles type. Allowed values: ' +
    PROJECT_ROLE_TYPE_ARRAY.join(', '),
  errorMessage:
    'Please enter a valid project roles in the type of ' +
    PROJECT_ROLE_TYPE_ARRAY.join(', '),
};

export class ProjectRolesAnswerDTO {
  constructor(projectRoles: PROJECT_ROLE_TYPES[] = [DEFAULT_PROJECT_ROLE]) {
    this.projectRoles = projectRoles;
  }

  @ApiProperty({
    description: PROJECT_ROLES_MSG.message,
    example: PROJECT_ROLES_MSG.example,
    type: [String],
    default: PROJECT_ROLES_MSG.default,
  })
  @Expose({ name: 'projectRoles', toPlainOnly: true })
  @IsNotEmpty({ message: PROJECT_ROLES_MSG.requiredMessage })
  @IsArray({ message: PROJECT_ROLES_MSG.typeMessage })
  @IsIn(PROJECT_ROLE_TYPE_ARRAY, {
    each: true,
    message: PROJECT_ROLES_MSG.invalidMessage,
  })
  projectRoles: PROJECT_ROLE_TYPES[];
}
