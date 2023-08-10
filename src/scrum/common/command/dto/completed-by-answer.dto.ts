import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';

export class CompletedByAnswerDTO {
  constructor(completedBy: string) {
    this.completedBy = completedBy;
  }
  @ApiProperty()
  @IsString()
  completedBy: string;
}
