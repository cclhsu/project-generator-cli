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
  SCRUM_ROLE_TYPES,
  DEFAULT_SCRUM_ROLE,
  SCRUM_ROLE_TYPE_ARRAY,
} from '../../../common/constant';

export const SCRUM_ROLES_MSG: Answers = {
  regexp: new RegExp(`^(${SCRUM_ROLE_TYPE_ARRAY.join('|')})$`) as RegExp,
  message: 'Scrum roles is a type of SCRUM_ROLES_TYPES',
  example: SCRUM_ROLE_TYPE_ARRAY,
  default: DEFAULT_SCRUM_ROLE,
  typeMessage: 'Scrum roles must be an array of string',
  requiredMessage: 'Please enter an scrum roles',
  invalidMessage:
    'Invalid scrum roles type. Allowed values: ' +
    SCRUM_ROLE_TYPE_ARRAY.join(', '),
  errorMessage:
    'Please enter a valid scrum roles in the type of ' +
    SCRUM_ROLE_TYPE_ARRAY.join(', '),
};

export class ScrumRolesAnswerDTO {
  constructor(scrumRoles: SCRUM_ROLE_TYPES[] = [DEFAULT_SCRUM_ROLE]) {
    this.scrumRoles = scrumRoles;
  }

  @ApiProperty({
    description: SCRUM_ROLES_MSG.message,
    example: SCRUM_ROLES_MSG.example,
    type: [String],
    default: SCRUM_ROLES_MSG.default,
  })
  @Expose({ name: 'scrumRoles', toPlainOnly: true })
  @IsNotEmpty({ message: SCRUM_ROLES_MSG.requiredMessage })
  @IsArray({ message: SCRUM_ROLES_MSG.typeMessage })
  @IsIn(SCRUM_ROLE_TYPE_ARRAY, {
    each: true,
    message: SCRUM_ROLES_MSG.invalidMessage,
  })
  scrumRoles: SCRUM_ROLE_TYPES[];
}
