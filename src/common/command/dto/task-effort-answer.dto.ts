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
  TASK_EFFORT_TYPES,
  DEFAULT_TASK_EFFORT,
  TASK_EFFORT_TYPE_ARRAY,
} from '../../../common/constant';

export const TASK_EFFORT_MSG: Answers = {
  regexp: new RegExp(`^(${TASK_EFFORT_TYPE_ARRAY.join('|')})$`) as RegExp,
  message: 'Task effort is a type of TASK_EFFORT_TYPES',
  example: TASK_EFFORT_TYPE_ARRAY,
  default: DEFAULT_TASK_EFFORT,
  typeMessage: 'Task effort must be a string',
  requiredMessage: 'Please enter an task effort',
  invalidMessage:
    'Invalid task effort type. Allowed values: ' +
    TASK_EFFORT_TYPE_ARRAY.join(', '),
  errorMessage:
    'Please enter a valid task effort in the type of ' +
    TASK_EFFORT_TYPE_ARRAY.join(', '),
};

export class TaskEffortAnswerDTO {
  constructor(taskEffort: TASK_EFFORT_TYPES = DEFAULT_TASK_EFFORT) {
    this.taskEffort = taskEffort;
  }

  @ApiProperty({
    description: TASK_EFFORT_MSG.message,
    example: TASK_EFFORT_MSG.example,
    type: [String],
    default: TASK_EFFORT_MSG.default,
  })
  @Expose({ name: 'taskEffort', toPlainOnly: true })
  @IsNotEmpty({ message: TASK_EFFORT_MSG.requiredMessage })
  @IsString({ message: TASK_EFFORT_MSG.typeMessage })
  @IsEnum(TASK_EFFORT_TYPE_ARRAY, {
    message: TASK_EFFORT_MSG.invalidMessage,
    context: {
      reason: 'taskEffort',
    },
  })
  taskEffort: TASK_EFFORT_TYPES;
}
