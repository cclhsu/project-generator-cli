import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNumberString,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { ProjectMetadataEntity } from './project-metadata.entity';
import { ProjectContentEntity } from './project-content.entity';
import { UUID_MSG } from '../../../common/command/dto/uuid-answer.dto';

export class ProjectEntity {
  constructor(
    ID: string,
    UUID: string,
    metadata: ProjectMetadataEntity,
    content: ProjectContentEntity,
  ) {
    this.ID = ID;
    this.UUID = UUID;
    this.metadata = metadata;
    this.content = content;
  }

  @ApiProperty({
    description: 'ID is Unique identifier for ' + ProjectEntity.name,
    example: 'john.doe',
  })
  @Expose({ name: 'ID', toPlainOnly: true })
  @IsNotEmpty({ message: 'ID cannot be empty' })
  @IsString({ message: 'ID must be a string' })
  ID: string;

  @ApiProperty({
    description:
      'UUID is Unique identifier in the format "00000000-0000-0000-0000-000000000000"' +
      ' for  ' +
      ProjectEntity.name,
    example: 'e.g. 00000000-0000-0000-0000-000000000000',
  })
  @Expose({ name: 'UUID', toPlainOnly: true })
  @IsNotEmpty({ message: 'Please enter an UUID' })
  @IsString({ message: 'UUID must be a string' })
  @IsUUID('all', {
    message:
      'Please enter a valid UUID format (e.g. 00000000-0000-0000-0000-000000000000)',
  })
  UUID: string;

  @ApiProperty({
    description: 'Project metadata.',
    type: ProjectMetadataEntity,
  })
  @Expose({ name: 'metadata', toPlainOnly: true })
  @IsObject()
  @Type(() => ProjectMetadataEntity)
  @ValidateNested({ each: true })
  metadata: ProjectMetadataEntity;

  @ApiProperty({
    description: 'Project content.',
    type: ProjectContentEntity,
  })
  @Expose({ name: 'content', toPlainOnly: true })
  @IsObject()
  @Type(() => ProjectContentEntity)
  @ValidateNested({ each: true })
  content: ProjectContentEntity;
}
