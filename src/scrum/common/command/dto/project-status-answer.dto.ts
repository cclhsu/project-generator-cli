import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';

export class ProjectStatusAnswerDTO {
  constructor(projectStatus: string) {
    this.projectStatus = projectStatus;
  }
  @ApiProperty()
  @IsString()
  projectStatus: string;
}
