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

export class DocumentVariablesFilePathAnswerDTO {
  constructor(documentVariablesFilePath: string) {
    this.documentVariablesFilePath = documentVariablesFilePath;
  }
  @ApiProperty()
  @IsString()
  documentVariablesFilePath: string;
}
