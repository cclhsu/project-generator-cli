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
  ITERATION_TYPES,
  DEFAULT_ITERATION_TYPE,
  ITERATION_TYPE_ARRAY,
} from '../../../common/constant';

export const ITERATION_TYPE_MSG: Answers = {
  regexp: new RegExp(`^(${ITERATION_TYPE_ARRAY.join('|')})$`) as RegExp,
  message: 'Iteration type is a type of ITERATION_TYPES',
  example: ITERATION_TYPE_ARRAY,
  default: DEFAULT_ITERATION_TYPE,
  typeMessage: 'Iteration type must be a string',
  requiredMessage: 'Please enter an iteration type',
  invalidMessage:
    'Invalid iteration type type. Allowed values: ' + ITERATION_TYPE_ARRAY.join(', '),
  errorMessage:
    'Please enter a valid iteration types in the type of ' +
    ITERATION_TYPE_ARRAY.join(', '),
};

export class IterationTypeAnswerDTO {
  constructor(iterationType: ITERATION_TYPES = DEFAULT_ITERATION_TYPE) {
    this.iterationType = iterationType;
  }

  @ApiProperty({
    description: ITERATION_TYPE_MSG.message,
    example: ITERATION_TYPE_MSG.example,
    type: [String],
    default: ITERATION_TYPE_MSG.default,
  })
  @Expose({ name: 'iterationType', toPlainOnly: true })
  @IsNotEmpty({ message: ITERATION_TYPE_MSG.requiredMessage })
  @IsString({ message: ITERATION_TYPE_MSG.typeMessage })
  @IsEnum(ITERATION_TYPE_ARRAY, {
    message: ITERATION_TYPE_MSG.invalidMessage,
    context: {
      reason: 'iterationType',
    },
  })
  iterationType: ITERATION_TYPES;
}
