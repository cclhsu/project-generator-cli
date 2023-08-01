import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
// import { Transform, Type } from 'class-transformer';

export class ProjectTypeAnswerDto {
  constructor(projectType: string) {
    this.projectType = projectType;
  }
  @ApiProperty()
  @IsString()
  projectType: string;
}
