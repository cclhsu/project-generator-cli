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

export class UpdatedByAnswerDTO {
  constructor(updatedBy: string) {
    this.updatedBy = updatedBy;
  }

  @ApiProperty({
    description: 'The name of the user who updated the task.',
    example: 'john.doe',
  })
  @Expose({ name: 'updatedBy', toPlainOnly: true })
  @IsString({ message: 'Updated by must be a string' })
  updatedBy: string;
}
