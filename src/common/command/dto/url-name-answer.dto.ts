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
import { GENERAL_URL_TYPE_ARRAY } from '../../../common/constant';

export const URL_NAME_MSG: Answers = {
  // regexp: /^[A-Z][A-Za-z]+(: [A-Z][a-z]+)? Url$/,
  regexp: new RegExp(`^(${GENERAL_URL_TYPE_ARRAY.join('|')})$`) as RegExp,
  message: 'Url name is a type of GENERAL_URL_TYPE',
  example: 'e.g. XYZ Url',
  typeMessage: 'Url name must be a string',
  requiredMessage: 'Please enter an url name',
  invalidMessage: 'Please enter a valid url name',
  MinLengthMessage: 'Url name must have at least 2 characters',
  MaxLengthMessage: 'Url name cannot exceed 100 characters',
  errorMessage:
    'Please enter a valid URL name in the type of ' +
    GENERAL_URL_TYPE_ARRAY.join(', '),
};

export class UrlNameAnswerDTO {
  constructor(urlName: string) {
    this.urlName = urlName;
  }

  @ApiProperty({
    description: URL_NAME_MSG.message,
    example: URL_NAME_MSG.example,
  })
  @Expose({ name: 'urlName', toPlainOnly: true })
  @IsNotEmpty({ message: URL_NAME_MSG.requiredMessage })
  @IsString({ message: URL_NAME_MSG.typeMessage })
  @MinLength(2, { message: URL_NAME_MSG.MinLengthMessage })
  @MaxLength(100, { message: URL_NAME_MSG.MaxLengthMessage })
  @Matches(URL_NAME_MSG.regexp, {
    message: URL_NAME_MSG.errorMessage,
  })
  urlName: string;
}
