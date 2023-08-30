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
  TASK_STATUS_TYPES,
  DEFAULT_TASK_STATUS,
  TASK_STATUS_TYPE_ARRAY,
} from '../../../common/constant';

export const TASK_STATUS_MSG: Answers = {
  regexp: new RegExp(`^(${TASK_STATUS_TYPE_ARRAY.join('|')})$`) as RegExp,
  message: 'Task status is a type of TASK_STATUS_TYPES',
  example: TASK_STATUS_TYPE_ARRAY,
  default: DEFAULT_TASK_STATUS,
  typeMessage: 'Task status must be a string',
  requiredMessage: 'Please enter an task status',
  invalidMessage:
    'Invalid task status type. Allowed values: ' +
    TASK_STATUS_TYPE_ARRAY.join(', '),
  errorMessage:
    'Please enter a valid task status in the type of ' +
    TASK_STATUS_TYPE_ARRAY.join(', '),
};

export class TaskStatusAnswerDTO {
  constructor(taskStatus: TASK_STATUS_TYPES = DEFAULT_TASK_STATUS) {
    this.taskStatus = taskStatus;
  }

  @ApiProperty({
    description: TASK_STATUS_MSG.message,
    example: TASK_STATUS_MSG.example,
    type: [String],
    default: TASK_STATUS_MSG.default,
  })
  @Expose({ name: 'taskStatus', toPlainOnly: true })
  @IsNotEmpty({ message: TASK_STATUS_MSG.requiredMessage })
  @IsString({ message: TASK_STATUS_MSG.typeMessage })
  @IsEnum(TASK_STATUS_TYPE_ARRAY, {
    message: TASK_STATUS_MSG.invalidMessage,
    context: {
      reason: 'taskStatus',
    },
  })
  taskStatus: TASK_STATUS_TYPES;
}
