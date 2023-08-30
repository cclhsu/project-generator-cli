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
import { CommonDateEntity } from '../../../common/entity/common-date.entity';

export class TeamMetadataEntity {
  constructor(name: string, dates: CommonDateEntity) {
    this.name = name;
    this.dates = dates;
  }

  @ApiProperty({
    description: 'Name of the team metadata.',
    example: 'Development Team',
  })
  @Expose({ name: 'name', toPlainOnly: true })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @ApiProperty({
    description: 'Dates related to the team metadata.',
    type: CommonDateEntity,
  })
  @Expose({ name: 'dates', toPlainOnly: true })
  @ValidateNested({ each: true })
  dates: CommonDateEntity;
}
