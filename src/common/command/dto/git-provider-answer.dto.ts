import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';

export class GitProviderAnswerDTO {
  constructor(gitProvider: string) {
    this.gitProvider = gitProvider;
  }
  @ApiProperty()
  @IsString()
  gitProvider: string;
}
