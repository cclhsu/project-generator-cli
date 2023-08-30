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
import { ProjectMetadataDTO } from './project-metadata.dto';
import { ProjectContentDTO } from './project-content.dto';
import { UUID_MSG } from '../../../common/command/dto/uuid-answer.dto';

export class UpdateProjectRequestDTO {
  constructor(
    UUID: string,
    metadata: ProjectMetadataDTO,
    content: ProjectContentDTO,
  ) {
    this.UUID = UUID;
    this.metadata = metadata;
    this.content = content;
  }

  @ApiProperty({
    description:
      'UUID is Unique identifier in the format "00000000-0000-0000-0000-000000000000"' +
      ' for  ' +
      UpdateProjectRequestDTO.name,
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

  @ApiProperty()
  @Expose({ name: 'metadata', toPlainOnly: true })
  @IsObject()
  @Type(() => ProjectMetadataDTO)
  @ValidateNested({ each: true })
  metadata: ProjectMetadataDTO;

  @ApiProperty()
  @Expose({ name: 'content', toPlainOnly: true })
  @IsObject()
  @Type(() => ProjectContentDTO)
  @ValidateNested({ each: true })
  content: ProjectContentDTO;
}
