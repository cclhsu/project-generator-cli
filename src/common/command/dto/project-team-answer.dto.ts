import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';

export class ProjectTeamAnswerDTO {
  constructor(projectTeam: string) {
    this.projectTeam = projectTeam;
  }
  @ApiProperty()
  @IsString()
  projectTeam: string;
}
