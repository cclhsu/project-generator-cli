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
import { TaskMetadataCommandOptionsDTO } from './task-metadata-command-options.dto';
import { TaskContentCommandOptionsDTO } from './task-content-command-options.dto';

export class TaskCommandOptionsDTO {
  constructor(
    UUID: string,
    metadata: TaskMetadataCommandOptionsDTO,
    content: TaskContentCommandOptionsDTO,
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
  metadata: TaskMetadataCommandOptionsDTO;

  @ApiProperty()
  @Expose({ name: 'content', toPlainOnly: true })
  @IsObject()
  content: TaskContentCommandOptionsDTO;
}
