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

export class UserStoryEntity {
  constructor(role: string, goal: string, benefit: string) {
    this.role = role;
    this.goal = goal;
    this.benefit = benefit;
  }

  @ApiProperty({
    description: 'Role of the user or persona for the user story.',
    example: 'registered user',
  })
  @Expose({ name: 'role', toPlainOnly: true })
  @IsString({ message: 'Role must be a string' })
  @MinLength(1, { message: 'Role should not be empty' })
  role: string;

  @ApiProperty({
    description: 'Goal or action that the user wants to achieve.',
    example: 'log in to my account',
  })
  @Expose({ name: 'goal', toPlainOnly: true })
  @IsString({ message: 'Goal must be a string' })
  @MinLength(1, { message: 'Goal should not be empty' })
  goal: string;

  @ApiProperty({
    description: 'Benefit or outcome the user expects from achieving the goal.',
    example: 'access personalized content and features',
  })
  @Expose({ name: 'benefit', toPlainOnly: true })
  @IsString({ message: 'Benefit must be a string' })
  @MinLength(1, { message: 'Benefit should not be empty' })
  benefit: string;
}

// Function to print UserStory as a sentence
export function printUserStory(userStory: UserStoryEntity): string {
  return `As a ${userStory.role}, I want to ${userStory.goal}, so that I can ${userStory.benefit}.`;
}

// Example usage:
// const userStory: UserStoryEntity = {
//   role: "registered user",
//   goal: "log in to my account",
//   benefit: "access personalized content and features"
// };
