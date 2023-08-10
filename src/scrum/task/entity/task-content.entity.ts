import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsObject,
  IsString,
  MinLength,
  isObject,
} from 'class-validator';
import { Expose } from 'class-transformer';
import { CommentEntity } from './comment.entity';
import { DocumentationLinkEntity } from './documentation-link.entity';
import { TaskDescriptionEntity } from './task-description.entity';

export class TaskContentEntity {
  constructor(
    description: TaskDescriptionEntity,
    documentationLinks: DocumentationLinkEntity[],
    comments: CommentEntity[],
  ) {
    this.description = description;
    this.documentationLinks = documentationLinks;
    this.comments = comments;
  }

  description: TaskDescriptionEntity;
  documentationLinks?: DocumentationLinkEntity[];
  comments?: CommentEntity[];
}
