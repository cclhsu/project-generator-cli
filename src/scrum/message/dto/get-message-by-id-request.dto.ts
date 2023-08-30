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

export class GetMessageByIdRequestDTO {
  constructor(ID: string) {
    this.ID = ID;
  }

  @ApiProperty({
    description: 'ID is Unique identifier for ' + GetMessageByIdRequestDTO.name,
    example: '00000000-0000-0000-0000-000000000000',
  })
  @Expose({ name: 'ID', toPlainOnly: true })
  @IsString({ message: 'ID must be a string.' })
  @IsUUID('all', { message: 'Invalid ID format.' })
  ID: string;
}
