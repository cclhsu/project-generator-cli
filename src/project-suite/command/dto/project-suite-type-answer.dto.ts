import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';

export class ProjectSuiteTypeAnswerDTO {
  constructor(projectSuiteType: string) {
    this.projectSuiteType = projectSuiteType;
  }
  @ApiProperty()
  @IsString()
  projectSuiteType: string;
}
