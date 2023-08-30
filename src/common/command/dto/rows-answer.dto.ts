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

export class RowsAnswerDTO {
  constructor(rows: string[]) {
    this.rows = rows;
  }

  @ApiProperty({
    description: 'Rows of the iteration board.',
    type: [String],
  })
  @Expose({ name: 'rows', toPlainOnly: true })
  @IsArray({ message: 'Rows must be an array' })
  @Type(() => String)
  @ValidateNested({ each: true })
  rows: string[];
}
