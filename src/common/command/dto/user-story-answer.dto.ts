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

export class UserStoryAnswerDTO {
  constructor(userStory: string) {
    this.userStory = userStory;
  }

  @ApiProperty({
    description: 'User Story for the task.',
    example: 'The user should be able to log in with valid credentials.',
  })
  @Expose({ name: 'userStory', toPlainOnly: true })
  @IsString({ message: 'User Story must be a string' })
  @MaxLength(500, {
    message: 'User Story cannot exceed 500 characters',
  })
  @Matches(/^As a .+, I want to .+( and .+)?, so that .+( and .+)?\.$/i, {
    message:
      'User Story should follow the format "As a <some-user>, I want to <some-action>, so that <some-reason>.".',
  })
  userStory: string;
}
