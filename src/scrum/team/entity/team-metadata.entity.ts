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
import { CommonDateEntity } from 'src/scrum/common/entity/common-date.entity';

export class TeamMetadataEntity {
  constructor(ID: string, name: string, dates: CommonDateEntity) {
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
  dates: CommonDateEntity;
}
