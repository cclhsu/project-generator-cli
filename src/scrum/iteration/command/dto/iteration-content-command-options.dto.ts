import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { IterationContentDTO } from '../../dto/iteration-content.dto';
import { ColumnDTO } from 'src/scrum/iteration/dto/column.dto';
import { TaskMetadataDTO } from 'src/scrum/task/dto/task-metadata.dto';
// import { Transform, Type } from 'class-transformer';

export class IterationContentCommandOptionsDTO extends IterationContentDTO {
  constructor(
    description: string,
    goal: string,
    // tasks: string[],
    columns: ColumnDTO<TaskMetadataDTO>[],
  ) {
    super(description, goal, columns);
  }
}
