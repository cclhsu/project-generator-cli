import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';

export class ProjectSuiteGitProviderAnswerDTO {
  constructor(projectSuiteGitProvider: string) {
    this.projectSuiteGitProvider = projectSuiteGitProvider;
  }
  @ApiProperty()
  @IsString()
  projectSuiteGitProvider: string;
}
