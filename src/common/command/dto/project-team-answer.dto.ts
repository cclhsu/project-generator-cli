import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
// import { Transform, Type } from 'class-transformer';

export class ProjectTeamAnswerDto {
  constructor(projectTeam: string) {
    this.projectTeam = projectTeam;
  }
  @ApiProperty()
  @IsString()
  projectTeam: string;
}
