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
import { CommonDateDTO } from '../../../common/dto/common-date.dto';

export class UserMetadataDTO {
  constructor(name: string, dates: CommonDateDTO) {
    this.name = name;
    this.dates = dates;
  }

  @ApiProperty({
    description: 'Name of the User Metadata.',
    example: 'John Doe',
  })
  @Expose({ name: 'name', toPlainOnly: true })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @ApiProperty({
    description: 'Dates related to the User Metadata.',
    type: CommonDateDTO,
  })
  @Expose({ name: 'dates', toPlainOnly: true })
  @ValidateNested({ each: true })
  dates: CommonDateDTO;
}
