import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDateString, IsString } from 'class-validator';
// import { Transform, Type } from 'class-transformer';

export class CompletedDateAnswerDTO {
  constructor(completedDate: Date) {
    this.completedDate = completedDate;
  }
  @ApiProperty()
  @IsDateString()
  completedDate: Date;
}
