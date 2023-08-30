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

export const ITERATION_NAME_MSG: Answers = {
  regexp: /^[A-Z]{3}:\d{4}\/\d{2}\/\d{2}-\d{4}\/\d{2}\/\d{2} Iteration$/,
  message: 'Iteration name is Unique identifier in the format "PPP:YYYY/MM/DD-YYYY/MM/DD Iteration".',
  example: 'e.g. PPP:YYYY/MM/DD-YYYY/MM/DD Iteration',
  typeMessage: 'Iteration name must be a string',
  requiredMessage: 'Please enter an iteration name',
  invalidMessage: 'Please enter a valid iteration name',
  MinLengthMessage: 'Iteration name must have at least 2 characters',
  MaxLengthMessage: 'Iteration name cannot exceed 100 characters',
  errorMessage: 'Please enter a valid iteration name format (e.g. PPP:YYYY/MM/DD-YYYY/MM/DD Iteration)',
};

export class IterationNameAnswerDTO {
  constructor(iterationName: string) {
    this.iterationName = iterationName;
  }

  @ApiProperty({
    description: ITERATION_NAME_MSG.message,
    example: ITERATION_NAME_MSG.example,
  })
  @Expose({ name: 'iterationName', toPlainOnly: true })
  @IsNotEmpty({ message: ITERATION_NAME_MSG.requiredMessage })
  @IsString({ message: ITERATION_NAME_MSG.typeMessage })
  @MinLength(2, { message: ITERATION_NAME_MSG.MinLengthMessage })
  @MaxLength(100, { message: ITERATION_NAME_MSG.MaxLengthMessage })
  @Matches(ITERATION_NAME_MSG.regexp, {
    message: ITERATION_NAME_MSG.errorMessage,
  })
  iterationName: string;
}
