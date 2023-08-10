import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { TaskContentDTO } from 'src/scrum/task/dto/task-content.dto';
import { CommentDTO } from 'src/scrum/task/dto/comment.dto';
import { DocumentationLinkDTO } from 'src/scrum/task/dto/documentation-link.dto';
import { TaskDescriptionDTO } from 'src/scrum/task/dto/task-description.dto';
// import { Transform, Type } from 'class-transformer';

export class TaskContentCommandOptionsDTO extends TaskContentDTO {
  constructor(
    description: TaskDescriptionDTO,
    documentationLinks: DocumentationLinkDTO[],
    comments: CommentDTO[],
  ) {
    super(description, documentationLinks, comments);
  }
}
