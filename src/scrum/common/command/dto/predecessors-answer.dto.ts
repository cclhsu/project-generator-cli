import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';

export class PredecessorsAnswerDTO {
  constructor(predecessors: string[]) {
    this.predecessors = predecessors;
  }
  @ApiProperty()
  @IsString()
  predecessors: string[];
}
