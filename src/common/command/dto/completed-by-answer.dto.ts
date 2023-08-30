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

export class CompletedByAnswerDTO {
  constructor(completedBy: string) {
    this.completedBy = completedBy;
  }

  @ApiProperty({
    description: 'The name of the user who completed the task.',
    example: 'john.doe',
  })
  @Expose({ name: 'completedBy', toPlainOnly: true })
  @IsString({ message: 'Completed by must be a string' })
  completedBy: string;
}
