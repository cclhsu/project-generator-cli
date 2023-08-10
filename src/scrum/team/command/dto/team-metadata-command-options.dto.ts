import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';
import { TeamMetadataDTO } from 'src/scrum/team/dto/team-metadata.dto';
import { CommonDateDTO } from '../../../common/dto/common-date.dto';

export class TeamMetadataCommandOptionsDTO extends TeamMetadataDTO {
  constructor(ID: string, name: string, dates: CommonDateDTO) {
    super(ID, name, dates);
  }
}
