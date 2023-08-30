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

export class CreateProjectRequestDTO {
  constructor(
    ID: string,
    UUID: string,
    metadata: ProjectMetadataDTO,
    content: ProjectContentDTO,
  ) {
    this.ID = ID;
    this.UUID = UUID;
    this.metadata = metadata;
    this.content = content;
  }

  @ApiProperty({
    description: 'ID is Unique identifier for ' + CreateProjectRequestDTO.name,
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
      CreateProjectRequestDTO.name,
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
    description: 'Metadata of the project.',
  })
  @Expose({ name: 'metadata', toPlainOnly: true })
  @IsObject()
  @Type(() => ProjectMetadataDTO)
  @ValidateNested({ each: true })
  readonly metadata: ProjectMetadataDTO;

  @ApiProperty({
    description: 'Content of the project.',
  })
  @Expose({ name: 'content', toPlainOnly: true })
  @IsObject()
  @Type(() => ProjectContentDTO)
  @ValidateNested({ each: true })
  content: ProjectContentDTO;
}
