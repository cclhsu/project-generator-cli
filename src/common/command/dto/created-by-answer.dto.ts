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

export class CreatedByAnswerDTO {
  constructor(createdBy: string) {
    this.createdBy = createdBy;
  }

  @ApiProperty({
    description: 'The name of the user who created the task.',
    example: 'john.doe',
  })
  @Expose({ name: 'createdBy', toPlainOnly: true })
  @IsString({ message: 'Created by must be a string' })
  createdBy: string;
}
