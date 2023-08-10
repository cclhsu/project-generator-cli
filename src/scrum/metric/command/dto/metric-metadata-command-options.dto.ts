import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';
import { MetricMetadataDTO } from 'src/scrum/metric/dto/metric-metadata.dto';
import { CommonDateDTO } from '../../../common/dto/common-date.dto';

export class MetricMetadataCommandOptionsDTO extends MetricMetadataDTO {
  constructor(ID: string, name: string, dates: CommonDateDTO) {
    super(ID, name, dates);
  }
}
