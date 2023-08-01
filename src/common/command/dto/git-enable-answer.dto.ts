import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
// import { Transform, Type } from 'class-transformer';

export class GitEnableAnswerDto {
  constructor(gitEnable: string) {
    this.gitEnable = gitEnable;
  }
  @ApiProperty()
  @IsString()
  gitEnable: string;
}
