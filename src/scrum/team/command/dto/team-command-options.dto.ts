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
import { TeamMetadataCommandOptionsDTO } from './team-metadata-command-options.dto';
import { TeamContentCommandOptionsDTO } from './team-content-command-options.dto';

export class TeamCommandOptionsDTO {
  constructor(
    UUID: string,
    metadata: TeamMetadataCommandOptionsDTO,
    content: TeamContentCommandOptionsDTO,
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
  metadata: TeamMetadataCommandOptionsDTO;

  @ApiProperty()
  @Expose({ name: 'content', toPlainOnly: true })
  @IsObject()
  content: TeamContentCommandOptionsDTO;
}
