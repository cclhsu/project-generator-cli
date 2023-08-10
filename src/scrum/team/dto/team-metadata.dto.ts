import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsObject,
  IsString,
  MinLength,
  isObject,
} from 'class-validator';
import { Expose } from 'class-transformer';
import { CommonDateDTO } from '../../common/dto/common-date.dto';

export class TeamMetadataDTO {
  constructor(ID: string, name: string, dates: CommonDateDTO) {
    this.ID = ID;
    this.name = name;
    this.dates = dates;
  }

  @ApiProperty()
  @Expose({ name: 'ID', toPlainOnly: true })
  @IsString()
  ID: string; // Unique identifier for the Team Metadata

  @ApiProperty()
  @Expose({ name: 'name', toPlainOnly: true })
  @IsString()
  name: string; // Name of the Team Metadata

  @ApiProperty()
  @Expose({ name: 'dates', toPlainOnly: true })
  @IsObject()
  dates: CommonDateDTO;
}
