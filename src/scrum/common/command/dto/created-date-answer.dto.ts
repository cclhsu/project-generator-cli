import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDateString, IsString } from 'class-validator';
// import { Transform, Type } from 'class-transformer';

export class CreatedDateAnswerDTO {
  constructor(createdDate: Date) {
    this.createdDate = createdDate;
  }
  @ApiProperty()
  @IsDateString()
  createdDate: Date;
}
