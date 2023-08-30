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

export const USER_FIRST_NAME_MSG: Answers = {
  regexp: /^[A-Z][a-z]+$/,
  message: 'User first name is Unique identifier in the format "John".',
  example: 'e.g. John',
  typeMessage: 'User first name must be a string',
  requiredMessage: 'Please enter an user first name',
  invalidMessage: 'Please enter a valid user first name',
  MinLengthMessage: 'User first name must have at least 2 characters',
  MaxLengthMessage: 'User first name cannot exceed 100 characters',
  errorMessage: 'Please enter a valid user first name format (e.g. John)',
};

export class UserFirstNameAnswerDTO {
  constructor(firstName: string) {
    this.firstName = firstName;
  }

  @ApiProperty({
    description: USER_FIRST_NAME_MSG.message,
    example: USER_FIRST_NAME_MSG.example,
  })
  @Expose({ name: 'firstName', toPlainOnly: true })
  @IsNotEmpty({ message: USER_FIRST_NAME_MSG.requiredMessage })
  @IsString({ message: USER_FIRST_NAME_MSG.typeMessage })
  @MinLength(2, { message: USER_FIRST_NAME_MSG.MinLengthMessage })
  @MaxLength(100, { message: USER_FIRST_NAME_MSG.MaxLengthMessage })
  @Matches(USER_FIRST_NAME_MSG.regexp, {
    message: USER_FIRST_NAME_MSG.errorMessage,
  })
  firstName: string;
}
