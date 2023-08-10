import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';

export class TaskTypeAnswerDTO {
  constructor(taskType: string) {
    this.taskType = taskType;
  }
  @ApiProperty()
  @IsString()
  taskType: string;
}
