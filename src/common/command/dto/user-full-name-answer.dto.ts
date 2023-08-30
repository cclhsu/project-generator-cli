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

export const USER_FULL_NAME_MSG: Answers = {
  regexp: /^[A-Z][a-z]+ [A-Z][a-z]+$/,
  message: 'User full name is Unique identifier in the format "John Doe".',
  example: 'e.g. John Doe',
  typeMessage: 'User full name must be a string',
  requiredMessage: 'Please enter an user full name',
  invalidMessage: 'Please enter a valid user full name',
  MinLengthMessage: 'User full name must have at least 2 characters',
  MaxLengthMessage: 'User full name cannot exceed 100 characters',
  errorMessage: 'Please enter a valid user full name format (e.g. John Doe)',
};

export class UserFullNameAnswerDTO {
  constructor(fullName: string) {
    this.fullName = fullName;
  }

  @ApiProperty({
    description: USER_FULL_NAME_MSG.message,
    example: USER_FULL_NAME_MSG.example,
  })
  @Expose({ name: 'fullName', toPlainOnly: true })
  @IsNotEmpty({ message: USER_FULL_NAME_MSG.requiredMessage })
  @IsString({ message: USER_FULL_NAME_MSG.typeMessage })
  @MinLength(2, { message: USER_FULL_NAME_MSG.MinLengthMessage })
  @MaxLength(100, { message: USER_FULL_NAME_MSG.MaxLengthMessage })
  @Matches(USER_FULL_NAME_MSG.regexp, {
    message: USER_FULL_NAME_MSG.errorMessage,
  })
  fullName: string;
}
