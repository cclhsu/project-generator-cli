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

export const ITERATION_ID_MSG: Answers = {
  regexp: /^[A-Z]{3}:\d{4}\/\d{2}\/\d{2}-\d{4}\/\d{2}\/\d{2}$/,
  message:
    'Iteration ID is Unique identifier in the format "PPP:YYYY/MM/DD-YYYY/MM/DD".',
  example: 'e.g. ABC:2020/01/01-2020/12/31',
  typeMessage: 'Iteration ID must be a string',
  requiredMessage: 'Please enter an iteration ID',
  invalidMessage: 'Please enter a valid iteration ID',
  errorMessage:
    'Please enter a valid iteration ID format (e.g. ABC:2020/01/01-2020/12/31)',
};

export class IterationIdAnswerDTO {
  constructor(ID: string) {
    this.ID = ID;
  }

  @ApiProperty({
    description: ITERATION_ID_MSG.message,
    example: ITERATION_ID_MSG.example,
  })
  @Expose({ name: 'ID', toPlainOnly: true })
  @IsNotEmpty({ message: ITERATION_ID_MSG.requiredMessage })
  @IsString({ message: ITERATION_ID_MSG.typeMessage })
  @Matches(ITERATION_ID_MSG.regexp, {
    message: ITERATION_ID_MSG.errorMessage,
  })
  ID: string;
}
