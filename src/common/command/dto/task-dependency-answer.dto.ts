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
  TASK_DEPENDENCY_TYPES,
  DEFAULT_TASK_DEPENDENCY,
  TASK_DEPENDENCY_TYPE_ARRAY,
} from '../../../common/constant';

export const TASK_DEPENDENCY_MSG: Answers = {
  regexp: new RegExp(`^(${TASK_DEPENDENCY_TYPE_ARRAY.join('|')})$`) as RegExp,
  message: 'Task dependency is a type of TASK_DEPENDENCY_TYPES',
  example: TASK_DEPENDENCY_TYPE_ARRAY,
  default: DEFAULT_TASK_DEPENDENCY,
  typeMessage: 'Task dependency must be a string',
  requiredMessage: 'Please enter an task dependency',
  invalidMessage:
    'Invalid task dependency type. Allowed values: ' +
    TASK_DEPENDENCY_TYPE_ARRAY.join(', '),
  errorMessage:
    'Please enter a valid task dependency in the type of ' +
    TASK_DEPENDENCY_TYPE_ARRAY.join(', '),
};

export class TaskDependencyAnswerDTO {
  constructor(taskDependency: TASK_DEPENDENCY_TYPES = DEFAULT_TASK_DEPENDENCY) {
    this.taskDependency = taskDependency;
  }

  @ApiProperty({
    description: TASK_DEPENDENCY_MSG.message,
    example: TASK_DEPENDENCY_MSG.example,
    type: [String],
    default: TASK_DEPENDENCY_MSG.default,
  })
  @Expose({ name: 'taskDependency', toPlainOnly: true })
  @IsNotEmpty({ message: TASK_DEPENDENCY_MSG.requiredMessage })
  @IsString({ message: TASK_DEPENDENCY_MSG.typeMessage })
  @IsEnum(TASK_DEPENDENCY_TYPE_ARRAY, {
    message: TASK_DEPENDENCY_MSG.invalidMessage,
    context: {
      reason: 'taskDependency',
    },
  })
  taskDependency: TASK_DEPENDENCY_TYPES;
}
