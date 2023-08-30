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
import { TeamMetadataDTO } from './team-metadata.dto';
import { TeamContentDTO } from './team-content.dto';
import { UUID_MSG } from '../../../common/command/dto/uuid-answer.dto';

export class TeamMetadataResponseDTO {
  constructor(ID: string, UUID: string, metadata: TeamMetadataDTO) {
    this.ID = ID;
    this.UUID = UUID;
    this.metadata = metadata;
  }

  @ApiProperty({
    description: 'ID is Unique identifier for ' + TeamMetadataResponseDTO.name,
    example: 'extension.team',
  })
  @Expose({ name: 'ID', toPlainOnly: true })
  @IsNotEmpty({ message: 'ID cannot be empty' })
  @IsString({ message: 'ID must be a string' })
  ID: string;

  @ApiProperty({
    description:
      'UUID is Unique identifier in the format "00000000-0000-0000-0000-000000000000"' +
      ' for  ' +
      TeamMetadataResponseDTO.name,
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
  @Type(() => TeamMetadataDTO)
  @ValidateNested({ each: true })
  metadata: TeamMetadataDTO;
}
