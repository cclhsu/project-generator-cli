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
import { IterationContentCommandOptionsDTO } from './iteration-content-command-options.dto';
import { IterationMetadataCommandOptionsDTO } from './iteration-metadata-command-options.dto';

export class IterationCommandOptionsDTO {
  constructor(
    UUID: string,
    metadata: IterationMetadataCommandOptionsDTO,
    content: IterationContentCommandOptionsDTO,
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
  metadata: IterationMetadataCommandOptionsDTO;

  @ApiProperty()
  @Expose({ name: 'content', toPlainOnly: true })
  @IsObject()
  content: IterationContentCommandOptionsDTO;
}
