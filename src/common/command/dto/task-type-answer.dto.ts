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
  TASK_TYPES,
  DEFAULT_TASK_TYPE,
  TASK_TYPE_ARRAY,
} from '../../../common/constant';

export const TASK_TYPE_MSG: Answers = {
  regexp: new RegExp(`^(${TASK_TYPE_ARRAY.join('|')})$`) as RegExp,
  message: 'Task type is a type of TASK_TYPES',
  example: TASK_TYPE_ARRAY,
  default: DEFAULT_TASK_TYPE,
  typeMessage: 'Task type must be a string',
  requiredMessage: 'Please enter an task type',
  invalidMessage:
    'Invalid task type type. Allowed values: ' + TASK_TYPE_ARRAY.join(', '),
  errorMessage:
    'Please enter a valid task types in the type of ' +
    TASK_TYPE_ARRAY.join(', '),
};

export class TaskTypeAnswerDTO {
  constructor(taskType: TASK_TYPES = DEFAULT_TASK_TYPE) {
    this.taskType = taskType;
  }

  @ApiProperty({
    description: TASK_TYPE_MSG.message,
    example: TASK_TYPE_MSG.example,
    type: [String],
    default: TASK_TYPE_MSG.default,
  })
  @Expose({ name: 'taskType', toPlainOnly: true })
  @IsNotEmpty({ message: TASK_TYPE_MSG.requiredMessage })
  @IsString({ message: TASK_TYPE_MSG.typeMessage })
  @IsEnum(TASK_TYPE_ARRAY, {
    message: TASK_TYPE_MSG.invalidMessage,
    context: {
      reason: 'taskType',
    },
  })
  taskType: TASK_TYPES;
}
