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
import { IterationContentEntity } from './iteration-content.entity';
import { IterationMetadataEntity } from './iteration-metadata.entity';

export class IterationEntity {
  constructor(
    UUID: string,
    metadata: IterationMetadataEntity,
    content: IterationContentEntity,
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
  metadata: IterationMetadataEntity;

  @ApiProperty()
  @Expose({ name: 'content', toPlainOnly: true })
  @IsObject()
  content: IterationContentEntity;
}
