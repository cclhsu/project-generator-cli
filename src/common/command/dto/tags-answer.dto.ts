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

export class TagsAnswerDTO {
  constructor(tags: string[]) {
    this.tags = tags;
  }

  @ApiProperty({
    description: 'Tags associated with the task.',
  })
  @Expose({ name: 'tags', toPlainOnly: true })
  @IsString({ each: true })
  @IsArray()
  tags: string[];
}
