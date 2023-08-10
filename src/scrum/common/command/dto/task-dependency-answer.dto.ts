import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';

export class TaskDependencyAnswerDTO {
  constructor(taskDependency: string) {
    this.taskDependency = taskDependency;
  }
  @ApiProperty()
  @IsString()
  taskDependency: string;
}
