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

export class SrcRootAnswerDTO {
  constructor(srcRoot: string) {
    this.srcRoot = srcRoot;
  }

  @ApiProperty({
    description: 'Root directory path for the source code.',
    example: '/path/to/src',
  })
  @IsString({ message: 'Source root must be a string.' })
  srcRoot: string;
}
