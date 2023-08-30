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
  IsUrl,
  Length,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';

export const URL_MSG: Answers = {
  regexp: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
  message: 'Url is Unique identifier in the format "https://xyz.com".',
  example: 'e.g. https://xyz.com',
  typeMessage: 'Url must be a string',
  requiredMessage: 'Please enter an url',
  invalidMessage: 'Please enter a valid url',
  errorMessage: 'Please enter a valid url format (e.g. https://xyz.com)',
};

export class UrlAnswerDTO {
  constructor(url: string) {
    this.url = url;
  }

  @ApiProperty({
    description: URL_MSG.message,
    example: URL_MSG.example,
  })
  @Expose({ name: 'url', toPlainOnly: true })
  @IsNotEmpty({ message: URL_MSG.requiredMessage })
  @IsString({ message: URL_MSG.typeMessage })
  @IsUrl({}, { message: URL_MSG.errorMessage })
  // @Matches(URL_MSG.regexp, {
  //   message: URL_MSG.errorMessage,
  // })
  url: string;
}
