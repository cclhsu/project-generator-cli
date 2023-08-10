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
import { ProjectMetadataCommandOptionsDTO } from './project-metadata-command-options.dto';
import { ProjectContentCommandOptionsDTO } from './project-content-command-options.dto';

export class ProjectCommandOptionsDTO {
  constructor(
    UUID: string,
    metadata: ProjectMetadataCommandOptionsDTO,
    content: ProjectContentCommandOptionsDTO,
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
  metadata: ProjectMetadataCommandOptionsDTO;

  @ApiProperty()
  @Expose({ name: 'content', toPlainOnly: true })
  @IsObject()
  content: ProjectContentCommandOptionsDTO;
}
