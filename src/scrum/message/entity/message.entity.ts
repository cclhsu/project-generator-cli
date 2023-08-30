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
import { MessageMetadataEntity } from './message-metadata.entity';
import { MessageContentEntity } from './message-content.entity';
import { UUID_MSG } from '../../../common/command/dto/uuid-answer.dto';

export class MessageEntity {
  constructor(
    ID: string,
    UUID: string,
    metadata: MessageMetadataEntity,
    content: MessageContentEntity,
  ) {
    this.ID = ID;
    this.UUID = UUID;
    this.metadata = metadata;
    this.content = content;
  }

  @ApiProperty({
    description: 'ID is Unique identifier for ' + MessageEntity.name,
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
      MessageEntity.name,
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
    description: 'Message metadata.',
    type: MessageMetadataEntity,
  })
  @Expose({ name: 'metadata', toPlainOnly: true })
  @IsObject()
  @Type(() => MessageMetadataEntity)
  @ValidateNested({ each: true })
  metadata: MessageMetadataEntity;

  @ApiProperty({
    description: 'Message content.',
    type: MessageContentEntity,
  })
  @Expose({ name: 'content', toPlainOnly: true })
  @IsObject()
  @Type(() => MessageContentEntity)
  @ValidateNested({ each: true })
  content: MessageContentEntity;
}
