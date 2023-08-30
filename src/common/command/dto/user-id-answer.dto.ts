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

export const USER_ID_MSG: Answers = {
  regexp: /^[a-z]+\.[a-z]+\d*$/,
  message: 'User ID is Unique identifier in the format "john.doe".',
  example: 'e.g. john.doe',
  typeMessage: 'User ID must be a string',
  requiredMessage: 'Please enter an user ID',
  invalidMessage: 'Please enter a valid user ID',
  errorMessage: 'Please enter a valid user ID format (e.g. john.doe)',
};

export class UserIdAnswerDTO {
  constructor(ID: string) {
    this.ID = ID;
  }

  @ApiProperty({
    description: USER_ID_MSG.message,
    example: USER_ID_MSG.example,
  })
  @Expose({ name: 'ID', toPlainOnly: true })
  @IsNotEmpty({ message: USER_ID_MSG.requiredMessage })
  @IsString({ message: USER_ID_MSG.typeMessage })
  @Matches(USER_ID_MSG.regexp, {
    message: USER_ID_MSG.errorMessage,
  })
  ID: string;
}
