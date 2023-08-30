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
import { IterationContentEntity } from './iteration-content.entity';
import { IterationMetadataEntity } from './iteration-metadata.entity';
import { UUID_MSG } from '../../../common/command/dto/uuid-answer.dto';

export class IterationEntity {
  constructor(
    ID: string,
    UUID: string,
    metadata: IterationMetadataEntity,
    content: IterationContentEntity,
  ) {
    this.ID = ID;
    this.UUID = UUID;
    this.metadata = metadata;
    this.content = content;
  }

  @ApiProperty({
    description: 'ID is Unique identifier for ' + IterationEntity.name,
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
      IterationEntity.name,
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
    description: 'Iteration metadata.',
    type: IterationMetadataEntity,
  })
  @Expose({ name: 'metadata', toPlainOnly: true })
  @IsObject()
  @Type(() => IterationMetadataEntity)
  @ValidateNested({ each: true })
  metadata: IterationMetadataEntity;

  @ApiProperty({
    description: 'Iteration content.',
    type: IterationContentEntity,
  })
  @Expose({ name: 'content', toPlainOnly: true })
  @IsObject()
  @Type(() => IterationContentEntity)
  @ValidateNested({ each: true })
  content: IterationContentEntity;
}
