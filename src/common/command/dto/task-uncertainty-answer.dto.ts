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
  TASK_UNCERTAINTY_TYPES,
  DEFAULT_TASK_UNCERTAINTY,
  TASK_UNCERTAINTY_TYPE_ARRAY,
} from '../../../common/constant';

export const TASK_UNCERTAINTY_MSG: Answers = {
  regexp: new RegExp(`^(${TASK_UNCERTAINTY_TYPE_ARRAY.join('|')})$`) as RegExp,
  message: 'Task uncertainty is a type of TASK_UNCERTAINTY_TYPES',
  example: TASK_UNCERTAINTY_TYPE_ARRAY,
  default: DEFAULT_TASK_UNCERTAINTY,
  typeMessage: 'Task uncertainty must be a string',
  requiredMessage: 'Please enter an task uncertainty',
  invalidMessage:
    'Invalid task uncertainty type. Allowed values: ' +
    TASK_UNCERTAINTY_TYPE_ARRAY.join(', '),
  errorMessage:
    'Please enter a valid task uncertainty in the type of ' +
    TASK_UNCERTAINTY_TYPE_ARRAY.join(', '),
};

export class TaskUncertaintyAnswerDTO {
  constructor(
    taskUncertainty: TASK_UNCERTAINTY_TYPES = DEFAULT_TASK_UNCERTAINTY,
  ) {
    this.taskUncertainty = taskUncertainty;
  }

  @ApiProperty({
    description: TASK_UNCERTAINTY_MSG.message,
    example: TASK_UNCERTAINTY_MSG.example,
    type: [String],
    default: TASK_UNCERTAINTY_MSG.default,
  })
  @Expose({ name: 'taskUncertainty', toPlainOnly: true })
  @IsNotEmpty({ message: TASK_UNCERTAINTY_MSG.requiredMessage })
  @IsString({ message: TASK_UNCERTAINTY_MSG.typeMessage })
  @IsEnum(TASK_UNCERTAINTY_TYPE_ARRAY, {
    message: TASK_UNCERTAINTY_MSG.invalidMessage,
    context: {
      reason: 'taskUncertainty',
    },
  })
  taskUncertainty: TASK_UNCERTAINTY_TYPES;
}
