import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsIn,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class DocumentFilePathAnswerDTO {
  constructor(documentFilePath: string) {
    this.documentFilePath = documentFilePath;
  }
  @ApiProperty()
  @IsString()
  documentFilePath: string;
}
