import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';

export class ProjectSuiteNameAnswerDTO {
  constructor(projectSuiteName: string) {
    this.projectSuiteName = projectSuiteName;
  }
  @ApiProperty()
  @IsString()
  projectSuiteName: string;
}
