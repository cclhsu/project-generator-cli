import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDateString, IsString } from 'class-validator';
// import { Transform, Type } from 'class-transformer';

export class StartedDateAnswerDTO {
  constructor(startedDate: Date) {
    this.startedDate = startedDate;
  }
  @ApiProperty()
  @IsDateString()
  startedDate: Date;
}
