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
  TASK_PRIORITY_TYPES,
  DEFAULT_TASK_PRIORITY,
  TASK_PRIORITY_TYPE_ARRAY,
} from '../../../common/constant';

export const TASK_PRIORITY_MSG: Answers = {
  regexp: new RegExp(`^(${TASK_PRIORITY_TYPE_ARRAY.join('|')})$`) as RegExp,
  message: 'Task priority is a type of TASK_PRIORITY_TYPES',
  example: TASK_PRIORITY_TYPE_ARRAY,
  default: DEFAULT_TASK_PRIORITY,
  typeMessage: 'Task priority must be a string',
  requiredMessage: 'Please enter an task priority',
  invalidMessage:
    'Invalid task priority type. Allowed values: ' +
    TASK_PRIORITY_TYPE_ARRAY.join(', '),
  errorMessage:
    'Please enter a valid task priority in the type of ' +
    TASK_PRIORITY_TYPE_ARRAY.join(', '),
};

export class TaskPriorityAnswerDTO {
  constructor(taskPriority: TASK_PRIORITY_TYPES = DEFAULT_TASK_PRIORITY) {
    this.taskPriority = taskPriority;
  }

  @ApiProperty({
    description: TASK_PRIORITY_MSG.message,
    example: TASK_PRIORITY_MSG.example,
    type: [String],
    default: TASK_PRIORITY_MSG.default,
  })
  @Expose({ name: 'taskPriority', toPlainOnly: true })
  @IsNotEmpty({ message: TASK_PRIORITY_MSG.requiredMessage })
  @IsString({ message: TASK_PRIORITY_MSG.typeMessage })
  @IsEnum(TASK_PRIORITY_TYPE_ARRAY, {
    message: TASK_PRIORITY_MSG.invalidMessage,
    context: {
      reason: 'taskPriority',
    },
  })
  taskPriority: TASK_PRIORITY_TYPES;
}
