import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNumberString,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class GoalAnswerDTO {
  constructor(goal: string) {
    this.goal = goal;
  }

  @ApiProperty({
    description: 'Goal of the iteration content.',
    example: 'Complete all user stories.',
  })
  @Expose({ name: 'goal', toPlainOnly: true })
  @IsString({ message: 'Goal must be a string' })
  // @MinLength(1, { message: 'Goal should not be empty' })
  goal: string;
}
