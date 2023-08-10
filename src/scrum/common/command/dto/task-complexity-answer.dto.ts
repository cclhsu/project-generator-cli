import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';

export class TaskComplexityAnswerDTO {
  constructor(taskComplexity: string) {
    this.taskComplexity = taskComplexity;
  }
  @ApiProperty()
  @IsString()
  taskComplexity: string;
}
