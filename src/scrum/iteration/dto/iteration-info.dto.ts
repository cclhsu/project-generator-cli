import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsEmail,
  IsObject,
  IsString,
  MinLength,
  isArray,
  isObject,
} from 'class-validator';
import { Expose } from 'class-transformer';
export class IterationInfoDTO {
  constructor(ID: string, name: string, startDate: Date, endDate: Date) {
    this.ID = ID;
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  @ApiProperty()
  @Expose({ name: 'ID', toPlainOnly: true })
  @IsString()
  ID: string;

  @ApiProperty()
  @Expose({ name: 'name', toPlainOnly: true })
  @IsString()
  name: string;

  @ApiProperty()
  @Expose({ name: 'startDate', toPlainOnly: true })
  @IsDateString()
  startDate: Date;

  @ApiProperty()
  @Expose({ name: 'endDate', toPlainOnly: true })
  @IsDateString()
  endDate: Date;
}
