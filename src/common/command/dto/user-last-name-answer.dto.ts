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

export const USER_LAST_NAME_MSG: Answers = {
  regexp: /^[A-Z][a-z]+$/,
  message: 'User last name is Unique identifier in the format "Doe".',
  example: 'e.g. Doe',
  typeMessage: 'User last name must be a string',
  requiredMessage: 'Please enter an user last name',
  invalidMessage: 'Please enter a valid user last name',
  MinLengthMessage: 'User last name must have at least 2 characters',
  MaxLengthMessage: 'User last name cannot exceed 100 characters',
  errorMessage: 'Please enter a valid user last name format (e.g. Doe)',
};

export class UserLastNameAnswerDTO {
  constructor(lastName: string) {
    this.lastName = lastName;
  }

  @ApiProperty({
    description: USER_LAST_NAME_MSG.message,
    example: USER_LAST_NAME_MSG.example,
  })
  @Expose({ name: 'lastName', toPlainOnly: true })
  @IsNotEmpty({ message: USER_LAST_NAME_MSG.requiredMessage })
  @IsString({ message: USER_LAST_NAME_MSG.typeMessage })
  @MinLength(2, { message: USER_LAST_NAME_MSG.MinLengthMessage })
  @MaxLength(100, { message: USER_LAST_NAME_MSG.MaxLengthMessage })
  @Matches(USER_LAST_NAME_MSG.regexp, {
    message: USER_LAST_NAME_MSG.errorMessage,
  })
  lastName: string;
}
