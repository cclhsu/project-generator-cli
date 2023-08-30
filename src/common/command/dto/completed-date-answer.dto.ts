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

export class CompletedAtAnswerDTO {
  constructor(completedAt: Date) {
    this.completedAt = completedAt;
  }

  @ApiProperty({
    description: 'The date when the task was completed.',
    example: '2023-08-15T12:00:00Z',
  })
  @Expose({ name: 'completedAt', toPlainOnly: true })
  @IsDateString()
  completedAt: Date;
}
