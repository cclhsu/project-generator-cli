import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsEmail,
  IsObject,
  IsString,
  MinLength,
  isObject,
} from 'class-validator';
import { Expose } from 'class-transformer';
export class UserStoryEntity {
  constructor(role: string, goal: string, benefit: string) {
    this.role = role;
    this.goal = goal;
    this.benefit = benefit;
  }
  role: string;
  goal: string;
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
