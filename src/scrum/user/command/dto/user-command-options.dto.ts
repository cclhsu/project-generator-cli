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
import { UserMetadataCommandOptionsDTO } from './user-metadata-command-options.dto';
import { UserContentCommandOptionsDTO } from './user-content-command-options.dto';

export class UserCommandOptionsDTO {
  constructor(
    UUID: string,
    metadata: UserMetadataCommandOptionsDTO,
    content: UserContentCommandOptionsDTO,
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
  metadata: UserMetadataCommandOptionsDTO;

  @ApiProperty()
  @Expose({ name: 'content', toPlainOnly: true })
  @IsObject()
  content: UserContentCommandOptionsDTO;
}
