import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { TeamContentDTO } from 'src/scrum/team/dto/team-content.dto';
// import { Transform, Type } from 'class-transformer';

export class TeamContentCommandOptionsDTO extends TeamContentDTO {
  constructor(members: string[], productOwner: string, scrumMaster: string) {
    super(members, productOwner, scrumMaster);
  }
}
