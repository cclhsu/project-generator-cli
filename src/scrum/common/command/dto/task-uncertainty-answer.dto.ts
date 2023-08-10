import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';

export class TaskUncertaintyAnswerDTO {
  constructor(taskUncertainty: string) {
    this.taskUncertainty = taskUncertainty;
  }
  @ApiProperty()
  @IsString()
  taskUncertainty: string;
}
