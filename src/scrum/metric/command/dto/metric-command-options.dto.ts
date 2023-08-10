import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsObject,
  IsString,
  MinLength,
  isObject,
} from 'class-validator';
import { Expose } from 'class-transformer';
import { MetricMetadataCommandOptionsDTO } from './metric-metadata-command-options.dto';
import { MetricContentCommandOptionsDTO } from './metric-content-command-options.dto';

export class MetricCommandOptionsDTO {
  constructor(
    UUID: string,
    metadata: MetricMetadataCommandOptionsDTO,
    content: MetricContentCommandOptionsDTO,
  ) {
    this.UUID = UUID;
    this.metadata = metadata;
    this.content = content;
  }

  @ApiProperty()
  @Expose({ name: 'UUID', toPlainOnly: true })
  @IsString()
  UUID: string;

  @ApiProperty()
  @Expose({ name: 'metadata', toPlainOnly: true })
  @IsObject()
  metadata: MetricMetadataCommandOptionsDTO;

  @ApiProperty()
  @Expose({ name: 'content', toPlainOnly: true })
  @IsObject()
  content: MetricContentCommandOptionsDTO;
}
