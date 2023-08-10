import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';
// import { MetricMetadataDTO } from './metric-metadata.dto';
// import { MetricContentDTO } from './metric-content.dto';

export class GetMetricByIdRequestDTO {
  constructor(
    UUID: string,
    // metadata: MetricMetadataDTO,
    // content: MetricContentDTO,
  ) {
    this.UUID = UUID;
    // this.metadata = metadata;
    // this.content = content;
  }

  @ApiProperty()
  @Expose({ name: 'UUID', toPlainOnly: true })
  @IsString()
  UUID: string;

  // @ApiProperty()
  // @Expose({ name: 'metadata', toPlainOnly: true })
  // @IsObject()
  // metadata: MetricMetadataDTO;

  // @ApiProperty()
  // @Expose({ name: 'content', toPlainOnly: true })
  // @IsObject()
  // content: MetricContentDTO;
}
