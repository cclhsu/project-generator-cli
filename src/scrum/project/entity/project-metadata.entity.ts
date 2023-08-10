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
import { CommonDateEntity } from '../../common/entity/common-date.entity';
import { PROJECT_STATUS_TYPES } from '../../common/constant/project-status.constant';

export class ProjectMetadataEntity {
  constructor(
    ID: string,
    name: string,
    status: PROJECT_STATUS_TYPES,
    dates: CommonDateEntity,
  ) {
    this.ID = ID;
    this.name = name;
    this.status = status;
    this.dates = dates;
  }

  @ApiProperty()
  @Expose({ name: 'ID', toPlainOnly: true })
  @IsString()
  ID: string; // Unique identifier for the Scrum Project

  @ApiProperty()
  @Expose({ name: 'name', toPlainOnly: true })
  @IsString()
  name: string; // Name of the Scrum Project

  @ApiProperty()
  @Expose({ name: 'status', toPlainOnly: true })
  @IsString()
  status: PROJECT_STATUS_TYPES; // Current status of the Scrum Project

  @ApiProperty()
  @Expose({ name: 'dates', toPlainOnly: true })
  @IsObject()
  dates: CommonDateEntity;
}
