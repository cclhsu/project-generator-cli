import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
// import { Transform, Type } from 'class-transformer';

export class CommitMessageAnswerDto {
  constructor(commitMessage: string) {
    this.commitMessage = commitMessage;
  }
  @ApiProperty()
  @IsString()
  commitMessage: string;
}
