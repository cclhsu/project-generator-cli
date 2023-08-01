import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
// import { Transform, Type } from 'class-transformer';

export class ProjectNameAnswerDto {
  constructor(projectName: string) {
    this.projectName = projectName;
  }
  @ApiProperty()
  @IsString()
  projectName: string;
}
