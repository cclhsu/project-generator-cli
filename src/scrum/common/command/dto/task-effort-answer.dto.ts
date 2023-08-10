import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';

export class TaskEffortAnswerDTO {
  constructor(taskEffort: string) {
    this.taskEffort = taskEffort;
  }
  @ApiProperty()
  @IsString()
  taskEffort: string;
}
