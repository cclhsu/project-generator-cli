import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';

export class StartedByAnswerDTO {
  constructor(startedBy: string) {
    this.startedBy = startedBy;
  }
  @ApiProperty()
  @IsString()
  startedBy: string;
}
