import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';

export class SuccessorsAnswerDTO {
  constructor(successors: string[]) {
    this.successors = successors;
  }
  @ApiProperty()
  @IsString()
  successors: string[];
}
