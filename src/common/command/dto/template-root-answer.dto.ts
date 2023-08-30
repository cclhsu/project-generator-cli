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

export class TemplateRootAnswerDTO {
  constructor(templateRoot: string) {
    this.templateRoot = templateRoot;
  }

  @ApiProperty({
    description: 'The path to the template file.',
    example: '/path/to/config.json',
  })
  @IsString()
  templateRoot: string;
}
