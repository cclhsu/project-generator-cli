import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';

export class SubtasksAnswerDTO {
  constructor(subtasks: string[]) {
    this.subtasks = subtasks;
  }
  @ApiProperty()
  @IsString()
  subtasks: string[];
}
