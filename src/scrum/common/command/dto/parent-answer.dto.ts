import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';

export class ParentAnswerDTO {
  constructor(Parent: string) {
    this.Parent = Parent;
  }
  @ApiProperty()
  @IsString()
  Parent: string;
}
