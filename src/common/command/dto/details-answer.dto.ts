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

export class DetailsAnswerDTO {
  constructor(details: string) {
    this.details = details;
  }

  @ApiProperty({
    description: 'Details of the content.',
    example: 'Develop new feature set.',
  })
  @Expose({ name: 'details', toPlainOnly: true })
  @IsString({ message: 'Details must be a string' })
  details: string;
}
