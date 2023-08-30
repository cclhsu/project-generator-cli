import { Answers } from 'inquirer';
import { ApiProperty } from '@nestjs/swagger';
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

export const ID_MSG: Answers = {
  regexp: /^[A-Z]{3}-\d{4}$/,
  message: 'ID is Unique identifier in the format "PPP-XXXX".',
  example: 'e.g. ABC-1234',
  typeMessage: 'ID must be a string',
  requiredMessage: 'Please enter an ID',
  invalidMessage: 'Please enter a valid ID',
  errorMessage: 'Please enter a valid ID format (e.g. ABC-1234)',
};

export class IdAnswerDTO {
  constructor(ID: string) {
    this.ID = ID;
  }

  @ApiProperty({
    description: ID_MSG.message,
    example: ID_MSG.example,
  })
  @Expose({ name: 'ID', toPlainOnly: true })
  @IsNotEmpty({ message: ID_MSG.requiredMessage })
  @IsString({ message: ID_MSG.typeMessage })
  @Matches(ID_MSG.regexp, {
    message: ID_MSG.errorMessage,
  })
  ID: string;
}
