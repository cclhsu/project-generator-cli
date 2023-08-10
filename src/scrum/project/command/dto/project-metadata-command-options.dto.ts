import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ProjectMetadataDTO } from '../../dto/project-metadata.dto';
import { PROJECT_STATUS_TYPES } from '../../../common/constant';
import { CommonDateDTO } from '../../../common/dto/common-date.dto';
// import { Transform, Type } from 'class-transformer';

export class ProjectMetadataCommandOptionsDTO extends ProjectMetadataDTO {
  constructor(
    ID: string,
    name: string,
    status: PROJECT_STATUS_TYPES,
    dates: CommonDateDTO,
  ) {
    super(ID, name, status, dates);
  }
}
