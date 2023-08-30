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
  IsUrl,
  Length,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class NameUrlEntity {
  constructor(name: string, url: string) {
    this.name = name;
    this.url = url;
  }

  @ApiProperty({
    description: 'Name of the link.',
    example: 'User Guide',
  })
  @Expose({ name: 'name', toPlainOnly: true })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @ApiProperty({
    description: 'Url is Unique identifier in the format "https://xyz.com".',
    example: 'e.g. https://xyz.com',
  })
  @Expose({ name: 'url', toPlainOnly: true })
  @IsNotEmpty({ message: 'Please enter an url' })
  @IsString({ message: 'Url must be a string' })
  @IsUrl(
    {},
    { message: 'Please enter a valid url format (e.g. https://xyz.com)' },
  )
  // @Matches(URL_MSG.regexp, {
  //   message: 'Please enter a valid url format (e.g. https://xyz.com)',
  // })
  url: string;
}
