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
  TASK_COMPLEXITY_TYPES,
  DEFAULT_TASK_COMPLEXITY,
  TASK_COMPLEXITY_TYPE_ARRAY,
} from '../../../common/constant';

export const TASK_COMPLEXITY_MSG: Answers = {
  regexp: new RegExp(`^(${TASK_COMPLEXITY_TYPE_ARRAY.join('|')})$`) as RegExp,
  message: 'Task complexity is a type of TASK_COMPLEXITY_TYPES',
  example: TASK_COMPLEXITY_TYPE_ARRAY,
  default: DEFAULT_TASK_COMPLEXITY,
  typeMessage: 'Task complexity must be a string',
  requiredMessage: 'Please enter an task complexity',
  invalidMessage:
    'Invalid task complexity type. Allowed values: ' +
    TASK_COMPLEXITY_TYPE_ARRAY.join(', '),
  errorMessage:
    'Please enter a valid task complexity in the type of ' +
    TASK_COMPLEXITY_TYPE_ARRAY.join(', '),
};

export class TaskComplexityAnswerDTO {
  constructor(taskComplexity: TASK_COMPLEXITY_TYPES = DEFAULT_TASK_COMPLEXITY) {
    this.taskComplexity = taskComplexity;
  }

  @ApiProperty({
    description: TASK_COMPLEXITY_MSG.message,
    example: TASK_COMPLEXITY_MSG.example,
    type: [String],
    default: TASK_COMPLEXITY_MSG.default,
  })
  @Expose({ name: 'taskComplexity', toPlainOnly: true })
  @IsNotEmpty({ message: TASK_COMPLEXITY_MSG.requiredMessage })
  @IsString({ message: TASK_COMPLEXITY_MSG.typeMessage })
  @IsEnum(TASK_COMPLEXITY_TYPE_ARRAY, {
    message: TASK_COMPLEXITY_MSG.invalidMessage,
    context: {
      reason: 'taskComplexity',
    },
  })
  taskComplexity: TASK_COMPLEXITY_TYPES;
}
