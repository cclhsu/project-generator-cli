import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
// import { Transform, Type } from 'class-transformer';

export class GitProviderAnswerDto {
  constructor(gitProvider: string) {
    this.gitProvider = gitProvider;
  }
  @ApiProperty()
  @IsString()
  gitProvider: string;
}
