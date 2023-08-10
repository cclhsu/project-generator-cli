import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { MetricContentDTO } from 'src/scrum/metric/dto/metric-content.dto';
// import { Transform, Type } from 'class-transformer';

export class MetricContentCommandOptionsDTO extends MetricContentDTO {
  constructor() {
    super();
  }
}
