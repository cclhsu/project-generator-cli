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

export const MESSAGE_NAME_MSG: Answers = {
  regexp: /^[A-Z][A-Za-z]+(: [A-Z][a-z]+)? Message$/,
  message: 'Message name is Unique identifier in the format "XYZ Message".',
  example: 'e.g. XYZ Message',
  typeMessage: 'Message name must be a string',
  requiredMessage: 'Please enter an message name',
  invalidMessage: 'Please enter a valid message name',
  MinLengthMessage: 'Message name must have at least 2 characters',
  MaxLengthMessage: 'Message name cannot exceed 100 characters',
  errorMessage: 'Please enter a valid message name format (e.g. XYZ Message)',
};

export class MessageNameAnswerDTO {
  constructor(messageName: string) {
    this.messageName = messageName;
  }

  @ApiProperty({
    description: MESSAGE_NAME_MSG.message,
    example: MESSAGE_NAME_MSG.example,
  })
  @Expose({ name: 'messageName', toPlainOnly: true })
  @IsNotEmpty({ message: MESSAGE_NAME_MSG.requiredMessage })
  @IsString({ message: MESSAGE_NAME_MSG.typeMessage })
  @MinLength(2, { message: MESSAGE_NAME_MSG.MinLengthMessage })
  @MaxLength(100, { message: MESSAGE_NAME_MSG.MaxLengthMessage })
  @Matches(MESSAGE_NAME_MSG.regexp, {
    message: MESSAGE_NAME_MSG.errorMessage,
  })
  messageName: string;
}
