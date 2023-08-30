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
import {
  DEFAULT_PROJECT_STATUS,
  PROJECT_STATUS_TYPE_ARRAY,
  PROJECT_STATUS_TYPES,
} from '../../../common/constant';
import { CommonDateEntity } from '../../../common/entity/common-date.entity';

export class ProjectMetadataEntity {
  constructor(
    name: string,
    status: PROJECT_STATUS_TYPES,
    dates: CommonDateEntity,
  ) {
    this.name = name;
    this.status = status;
    this.dates = dates;
  }

  @ApiProperty({
    description: 'Name of the Project Metadata.',
    example: 'John Doe',
  })
  @Expose({ name: 'name', toPlainOnly: true })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @ApiProperty({
    description:
      'The status of the project (PLANNED, IN_PROGRESS, or COMPLETED).',
    enum: PROJECT_STATUS_TYPE_ARRAY,
    example: DEFAULT_PROJECT_STATUS,
    nullable: false,
    type: 'string',
  })
  @IsString()
  @IsIn(PROJECT_STATUS_TYPE_ARRAY, {
    message: `Invalid project status. Possible values: ${PROJECT_STATUS_TYPE_ARRAY.join(
      ', ',
    )}`,
  })
  status: PROJECT_STATUS_TYPES;

  @ApiProperty({
    description: 'Dates related to the Project Metadata.',
    type: CommonDateEntity,
  })
  @Expose({ name: 'dates', toPlainOnly: true })
  @ValidateNested({ each: true })
  dates: CommonDateEntity;
}
