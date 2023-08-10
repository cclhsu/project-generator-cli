import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';

export class GoalAnswerDTO {
  constructor(Goal: string) {
    this.Goal = Goal;
  }
  @ApiProperty()
  @IsString()
  Goal: string;
}
