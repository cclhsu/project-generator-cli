import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';

export class ContentAnswerDTO {
  constructor(Content: string) {
    this.Content = Content;
  }
  @ApiProperty()
  @IsString()
  Content: string;
}
