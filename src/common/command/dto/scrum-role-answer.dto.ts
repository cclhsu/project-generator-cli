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

export const SCRUM_ROLE_MSG: Answers = {
  regexp: new RegExp(`^(${SCRUM_ROLE_TYPE_ARRAY.join('|')})$`) as RegExp,
  message: 'Scrum role is a type of SCRUM_ROLE_TYPES',
  example: SCRUM_ROLE_TYPE_ARRAY,
  default: DEFAULT_SCRUM_ROLE,
  typeMessage: 'Scrum role must be a string',
  requiredMessage: 'Please enter an scrum role',
  invalidMessage:
    'Invalid scrum role type. Allowed values: ' +
    SCRUM_ROLE_TYPE_ARRAY.join(', '),
  errorMessage:
    'Please enter a valid scrum role in the type of ' +
    SCRUM_ROLE_TYPE_ARRAY.join(', '),
};

export class ScrumRoleAnswerDTO {
  constructor(scrumRole: SCRUM_ROLE_TYPES = DEFAULT_SCRUM_ROLE) {
    this.scrumRole = scrumRole;
  }

  @ApiProperty({
    description: SCRUM_ROLE_MSG.message,
    example: SCRUM_ROLE_MSG.example,
    type: [String],
    default: SCRUM_ROLE_MSG.default,
  })
  @Expose({ name: 'scrumRole', toPlainOnly: true })
  @IsNotEmpty({ message: SCRUM_ROLE_MSG.requiredMessage })
  @IsString({ message: SCRUM_ROLE_MSG.typeMessage })
  @IsEnum(SCRUM_ROLE_TYPE_ARRAY, {
    message: SCRUM_ROLE_MSG.invalidMessage,
    context: {
      reason: 'scrumRole',
    },
  })
  scrumRole: SCRUM_ROLE_TYPES;
}
