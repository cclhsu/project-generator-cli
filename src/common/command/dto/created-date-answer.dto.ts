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

export class CreatedAtAnswerDTO {
  constructor(createdAt: Date) {
    this.createdAt = createdAt;
  }

  @ApiProperty({
    description: 'The date when the task was created.',
    example: '2023-08-15T12:00:00Z',
  })
  @Expose({ name: 'createdAt', toPlainOnly: true })
  @IsDateString()
  createdAt: Date;
}
