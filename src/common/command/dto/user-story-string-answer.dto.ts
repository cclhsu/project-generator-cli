import { ApiProperty } from '@nestjs/swagger';
import { Answers } from 'inquirer';
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

export const USER_STORY_MSG: Answers = {
  regexp: /^As a .+, I want to .+( and .+)?, so that .+( and .+)?\.$/i,
  message: 'Gherkin User Story',
  example: 'e.g. As a user, I want to login, so that I can access my account.',
  typeMessage: 'User story must be a string',
  requiredMessage: 'Please enter an user story',
  invalidMessage: 'Please enter a valid user story',
  errorMessage:
    'User Story should follow the format "As a <some-user>, I want to <some-action>, so that <some-reason>.".',
  MinLengthMessage: 'User Story should be at least 10 characters',
  MaxLengthMessage: 'User Story cannot exceed 500 characters',
};

export class UserStoryStringAnswerDTO {
  constructor(userStoryString: string) {
    this.userStoryString = userStoryString;
  }

  @ApiProperty({
    description: USER_STORY_MSG.message,
    example: USER_STORY_MSG.example,
  })
  @Expose({ name: 'userStoryString', toPlainOnly: true })
  @IsNotEmpty({ message: USER_STORY_MSG.requiredMessage })
  @IsString({ message: USER_STORY_MSG.typeMessage })
  @MaxLength(500, {
    message: USER_STORY_MSG.MaxLengthMessage,
  })
  @Matches(USER_STORY_MSG.regexp, {
    message: USER_STORY_MSG.errorMessage,
  })
  userStoryString: string;
}
