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

export class StartedByAnswerDTO {
  constructor(startedBy: string) {
    this.startedBy = startedBy;
  }

  @ApiProperty({
    description: 'The name of the user who started the task.',
    example: 'john.doe',
  })
  @Expose({ name: 'startedBy', toPlainOnly: true })
  @IsString({ message: 'Started by must be a string' })
  startedBy: string;
}
