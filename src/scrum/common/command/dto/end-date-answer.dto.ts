import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDateString, IsString } from 'class-validator';
// import { Transform, Type } from 'class-transformer';

export class EndDateAnswerDTO {
  constructor(endDate: Date) {
    this.endDate = endDate;
  }
  @ApiProperty()
  @IsDateString()
  endDate: Date;
}
