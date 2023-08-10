import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';
import { UserMetadataDTO } from 'src/scrum/user/dto/user-metadata.dto';
import { CommonDateDTO } from '../../../common/dto/common-date.dto';

export class UserMetadataCommandOptionsDTO extends UserMetadataDTO {
  constructor(ID: string, name: string, dates: CommonDateDTO) {
    super(ID, name, dates);
  }
}
