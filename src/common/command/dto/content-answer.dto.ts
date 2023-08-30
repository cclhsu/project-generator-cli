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

export class ContentAnswerDTO {
  constructor(content: string) {
    this.content = content;
  }

  @ApiProperty({
    description: 'Content of the message.',
    example: 'This is a helpful message.',
  })
  @Expose({ name: 'content', toPlainOnly: true })
  @IsString({ message: 'Content must be a string' })
  content: string;
}
