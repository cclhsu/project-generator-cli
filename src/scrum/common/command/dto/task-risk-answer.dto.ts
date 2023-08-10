import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';

export class TaskRiskAnswerDTO {
  constructor(taskRisk: string) {
    this.taskRisk = taskRisk;
  }
  @ApiProperty()
  @IsString()
  taskRisk: string;
}
