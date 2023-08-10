import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';

export class UpdatedByAnswerDTO {
  constructor(updatedBy: string) {
    this.updatedBy = updatedBy;
  }
  @ApiProperty()
  @IsString()
  updatedBy: string;
}
