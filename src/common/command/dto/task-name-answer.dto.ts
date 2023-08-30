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

export const TASK_NAME_MSG: Answers = {
  regexp: /^[A-Z][A-Za-z]+(: [A-Z][a-z]+)? Task$/,
  message: 'Task name is Unique identifier in the format "XYZ Task".',
  example: 'e.g. XYZ Task',
  typeMessage: 'Task name must be a string',
  requiredMessage: 'Please enter an task name',
  invalidMessage: 'Please enter a valid task name',
  MinLengthMessage: 'Task name must have at least 2 characters',
  MaxLengthMessage: 'Task name cannot exceed 100 characters',
  errorMessage: 'Please enter a valid task name format (e.g. XYZ Task)',
};

export class TaskNameAnswerDTO {
  constructor(taskName: string) {
    this.taskName = taskName;
  }

  @ApiProperty({
    description: TASK_NAME_MSG.message,
    example: TASK_NAME_MSG.example,
  })
  @Expose({ name: 'taskName', toPlainOnly: true })
  @IsNotEmpty({ message: TASK_NAME_MSG.requiredMessage })
  @IsString({ message: TASK_NAME_MSG.typeMessage })
  @MinLength(2, { message: TASK_NAME_MSG.MinLengthMessage })
  @MaxLength(100, { message: TASK_NAME_MSG.MaxLengthMessage })
  @Matches(TASK_NAME_MSG.regexp, {
    message: TASK_NAME_MSG.errorMessage,
  })
  taskName: string;
}
