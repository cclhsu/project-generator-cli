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

export class SummaryAnswerDTO {
  constructor(summary: string) {
    this.summary = summary;
  }

  @ApiProperty({
    description: 'Summary of the content.',
    example: 'Develop new feature set.',
  })
  @Expose({ name: 'summary', toPlainOnly: true })
  @IsString({ message: 'Summary must be a string' })
  summary: string;
}
