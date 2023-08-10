import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';

export class TagsAnswerDTO {
  constructor(tags: string[]) {
    this.tags = tags;
  }
  @ApiProperty()
  @IsString()
  tags: string[];
}
