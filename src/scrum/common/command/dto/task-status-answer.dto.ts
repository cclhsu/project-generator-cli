import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';

export class TaskStatusAnswerDTO {
  constructor(taskStatus: string) {
    this.taskStatus = taskStatus;
  }
  @ApiProperty()
  @IsString()
  taskStatus: string;
}
