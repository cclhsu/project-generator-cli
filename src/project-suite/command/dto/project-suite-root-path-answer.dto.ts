import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';

export class ProjectSuiteRootPathAnswerDTO {
  constructor(ProjectSuiteRootPath: string) {
    this.ProjectSuiteRootPath = ProjectSuiteRootPath;
  }
  @ApiProperty()
  @IsString()
  ProjectSuiteRootPath: string;
}
