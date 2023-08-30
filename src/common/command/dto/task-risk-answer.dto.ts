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
  TASK_RISK_TYPES,
  DEFAULT_TASK_RISK,
  TASK_RISK_TYPE_ARRAY,
} from '../../../common/constant';

export const TASK_RISK_MSG: Answers = {
  regexp: new RegExp(`^(${TASK_RISK_TYPE_ARRAY.join('|')})$`) as RegExp,
  message: 'Task risk is a type of TASK_RISK_TYPES',
  example: TASK_RISK_TYPE_ARRAY,
  default: DEFAULT_TASK_RISK,
  typeMessage: 'Task risk must be a string',
  requiredMessage: 'Please enter an task risk',
  invalidMessage:
    'Invalid task risk type. Allowed values: ' +
    TASK_RISK_TYPE_ARRAY.join(', '),
  errorMessage:
    'Please enter a valid task risk in the type of ' +
    TASK_RISK_TYPE_ARRAY.join(', '),
};

export class TaskRiskAnswerDTO {
  constructor(taskRisk: TASK_RISK_TYPES = DEFAULT_TASK_RISK) {
    this.taskRisk = taskRisk;
  }

  @ApiProperty({
    description: TASK_RISK_MSG.message,
    example: TASK_RISK_MSG.example,
    type: [String],
    default: TASK_RISK_MSG.default,
  })
  @Expose({ name: 'taskRisk', toPlainOnly: true })
  @IsNotEmpty({ message: TASK_RISK_MSG.requiredMessage })
  @IsString({ message: TASK_RISK_MSG.typeMessage })
  @IsEnum(TASK_RISK_TYPE_ARRAY, {
    message: TASK_RISK_MSG.invalidMessage,
    context: {
      reason: 'taskRisk',
    },
  })
  taskRisk: TASK_RISK_TYPES;
}
