import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsEmail,
  IsObject,
  IsString,
  MinLength,
  isObject,
} from 'class-validator';
import { Expose } from 'class-transformer';
import { CommentDTO } from './comment.dto';
import { DocumentationLinkDTO } from './documentation-link.dto';
import { TaskDescriptionDTO } from './task-description.dto';

export class TaskContentDTO {
  constructor(
    description: TaskDescriptionDTO,
    documentationLinks: DocumentationLinkDTO[],
    comments: CommentDTO[],
  ) {
    this.description = description;
    this.documentationLinks = documentationLinks;
    this.comments = comments;
  }

  @ApiProperty()
  @Expose({ name: 'description', toPlainOnly: true })
  @IsObject()
  description: TaskDescriptionDTO;

  @ApiProperty()
  @Expose({ name: 'documentationLinks', toPlainOnly: true })
  @IsArray()
  documentationLinks?: DocumentationLinkDTO[];

  @ApiProperty()
  @Expose({ name: 'comments', toPlainOnly: true })
  @IsArray()
  comments?: CommentDTO[];
}
