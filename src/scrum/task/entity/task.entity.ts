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
import { TaskMetadataEntity } from './task-metadata.entity';
import { TaskContentEntity } from './task-content.entity';
import { UUID_MSG } from '../../../common/command/dto/uuid-answer.dto';

export class TaskEntity {
  constructor(
    ID: string,
    UUID: string,
    metadata: TaskMetadataEntity,
    content: TaskContentEntity,
  ) {
    this.ID = ID;
    this.UUID = UUID;
    this.metadata = metadata;
    this.content = content;
  }

  @ApiProperty({
    description: 'ID is Unique identifier for ' + TaskEntity.name,
    example: 'PPP-0001',
  })
  @Expose({ name: 'ID', toPlainOnly: true })
  @IsNotEmpty({ message: 'ID cannot be empty' })
  @IsString({ message: 'ID must be a string' })
  @Matches(/^[A-Z]{3}-\d{4}$/, {
    message: 'Ticket number should follow the format "PPP-XXXX".',
  })
  ID: string;

  @ApiProperty({
    description:
      'UUID is Unique identifier in the format "00000000-0000-0000-0000-000000000000"' +
      ' for  ' +
      TaskEntity.name,
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
    description: 'Task metadata.',
    type: TaskMetadataEntity,
  })
  @Expose({ name: 'metadata', toPlainOnly: true })
  @IsObject()
  @Type(() => TaskMetadataEntity)
  @ValidateNested({ each: true })
  metadata: TaskMetadataEntity;

  @ApiProperty({
    description: 'Task content.',
    type: TaskContentEntity,
  })
  @Expose({ name: 'content', toPlainOnly: true })
  @IsObject()
  @Type(() => TaskContentEntity)
  @ValidateNested({ each: true })
  content: TaskContentEntity;
}
