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
import { IterationMetadataDTO } from './iteration-metadata.dto';
import { IterationContentDTO } from './iteration-content.dto';
import { UUID_MSG } from '../../../common/command/dto/uuid-answer.dto';

export class CreateIterationRequestDTO {
  constructor(
    ID: string,
    UUID: string,
    metadata: IterationMetadataDTO,
    content: IterationContentDTO,
  ) {
    this.ID = ID;
    this.UUID = UUID;
    this.metadata = metadata;
    this.content = content;
  }

  @ApiProperty({
    description: 'ID is Unique identifier for ' + CreateIterationRequestDTO.name,
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
      CreateIterationRequestDTO.name,
    // example: 'e.g. 00000000-0000-0000-0000-000000000000',
    example: UUID_MSG.example,
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
    description: 'Metadata of the iteration.',
  })
  @Expose({ name: 'metadata', toPlainOnly: true })
  @IsObject()
  @Type(() => IterationMetadataDTO)
  @ValidateNested({ each: true })
  readonly metadata: IterationMetadataDTO;

  @ApiProperty({
    description: 'Content of the iteration.',
  })
  @Expose({ name: 'content', toPlainOnly: true })
  @IsObject()
  @Type(() => IterationContentDTO)
  @ValidateNested({ each: true })
  content: IterationContentDTO;
}
