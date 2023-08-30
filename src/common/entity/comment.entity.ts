import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsString,
  IsUUID,
  MinLength,
  isArray,
  isObject,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class CommentEntity {
  constructor(
    ID: string,
    UUID: string,
    content: string,
    updatedBy: string,
    updatedAt: Date,
  ) {
    this.ID = ID;
    this.UUID = UUID;
    this.content = content;
    this.updatedBy = updatedBy;
    this.updatedAt = updatedAt;
  }

  @ApiProperty({
    description: 'ID is Unique identifier for ' + CommentEntity.name,
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
      CommentEntity.name,
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
    description: 'Content of the message.',
    example: 'This is a helpful message.',
  })
  @Expose({ name: 'content', toPlainOnly: true })
  @IsString({ message: 'Content must be a string' })
  content: string;

  @ApiProperty({
    description: 'The name of the user who updated the task.',
    example: 'john.doe',
  })
  @Expose({ name: 'updatedBy', toPlainOnly: true })
  @IsString({ message: 'Updated by must be a string' })
  updatedBy: string;

  @ApiProperty({
    description: 'The date when the task was updated.',
    example: '2023-08-15T12:00:00Z',
  })
  @Expose({ name: 'updatedAt', toPlainOnly: true })
  @IsDateString()
  updatedAt: Date;
}
