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
import { ProjectMetadataEntity } from "./project-metadata.entity";
import { ProjectContentEntity } from "./project-content.entity";

export class ProjectEntity {
  constructor(
    UUID: string,
    metadata: ProjectMetadataEntity,
    content: ProjectContentEntity,
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
  metadata: ProjectMetadataEntity;

  @ApiProperty()
  @Expose({ name: 'content', toPlainOnly: true })
  @IsObject()
  content: ProjectContentEntity;
}
