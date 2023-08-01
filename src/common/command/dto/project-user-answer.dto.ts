import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
// import { Transform, Type } from 'class-transformer';

export class ProjectUserAnswerDto {
  constructor(projectUser: string) {
    this.projectUser = projectUser;
  }
  @ApiProperty()
  @IsString()
  projectUser: string;
}
