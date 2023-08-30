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

export class ParentAnswerDTO {
  constructor(parent: string) {
    this.parent = parent;
  }

  @ApiProperty({
    description: 'ID of the parent task.',
    example: '00000000-0000-0000-0000-000000000000',
  })
  @Expose({ name: 'parent', toPlainOnly: true })
  @IsString({ message: 'parent must be a string' })
  @IsUUID('all', { message: 'Invalid UUID format' })
  parent: string;
}
