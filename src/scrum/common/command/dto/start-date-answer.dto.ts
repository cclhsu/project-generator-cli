import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDateString, IsString } from 'class-validator';
// import { Transform, Type } from 'class-transformer';

export class StartDateAnswerDTO {
  constructor(startDate: Date) {
    this.startDate = startDate;
  }
  @ApiProperty()
  @IsDateString()
  startDate: Date;
}
