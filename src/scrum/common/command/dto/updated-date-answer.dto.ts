import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDateString, IsString } from 'class-validator';
// import { Transform, Type } from 'class-transformer';

export class UpdatedDateAnswerDTO {
  constructor(updatedDate: Date) {
    this.updatedDate = updatedDate;
  }
  @ApiProperty()
  @IsDateString()
  updatedDate: Date;
}
