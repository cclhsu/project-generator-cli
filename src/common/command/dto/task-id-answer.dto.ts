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

export const TASK_ID_MSG: Answers = {
  regexp: /^[A-Z]{3}-\d{4}$/,
  message: 'Task ID is Unique identifier in the format "PPP-XXXX".',
  example: 'e.g. ABC-1234',
  typeMessage: 'Task ID must be a string',
  requiredMessage: 'Please enter an task ID',
  invalidMessage: 'Please enter a valid task ID',
  errorMessage: 'Please enter a valid task ID format (e.g. ABC-1234)',
};

export class TaskIdAnswerDTO {
  constructor(ID: string) {
    this.ID = ID;
  }

  @ApiProperty({
    description: TASK_ID_MSG.message,
    example: TASK_ID_MSG.example,
  })
  @Expose({ name: 'ID', toPlainOnly: true })
  @IsNotEmpty({ message: TASK_ID_MSG.requiredMessage })
  @IsString({ message: TASK_ID_MSG.typeMessage })
  @Matches(TASK_ID_MSG.regexp, {
    message: TASK_ID_MSG.errorMessage,
  })
  ID: string;
}
