import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsEmail,
  IsObject,
  IsString,
  MinLength,
  isObject,
} from 'class-validator';
import { Expose } from 'class-transformer';

export class DocumentationLinkEntity {
  constructor(name: string, url: string) {
    this.name = name;
    this.url = url;
  }

  @ApiProperty()
  @Expose({ name: 'name', toPlainOnly: true })
  @IsString()
  name: string;

  @ApiProperty()
  @Expose({ name: 'url', toPlainOnly: true })
  @IsString()
  url: string;
}
