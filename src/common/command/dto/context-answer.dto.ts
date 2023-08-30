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

export class ContextAnswerDTO {
  constructor(context: string) {
    this.context = context;
  }

  @ApiProperty({
    description: 'Context of the content.',
    example: 'Develop new feature set.',
  })
  @Expose({ name: 'context', toPlainOnly: true })
  @IsString({ message: 'Context must be a string' })
  context: string;
}
