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

export const COMMIT_MSG_MSG: Answers = {
  regexp:
    /^\[[A-Z]{3}-\d{4}\] (fix|feat|BREAKING CHANGE|chore|docs|style|refactor|perf|test): .+$/,
  message: 'Commit message is Unique identifier in the format "PPP-XXXX".',
  example:
    'e.g. [PPP-1234] feat: implemented new feature: user authentication.',
  typeMessage: 'Commit message must be a string',
  requiredMessage: 'Please enter an commit message',
  invalidMessage: 'Please enter a valid commit message',
  errorMessage:
    'Please enter a valid commit message format (e.g. [PPP-1234] feat: implemented new feature: user authentication.)',
};

export class CommitMessageAnswerDTO {
  constructor(commitMessage: string) {
    this.commitMessage = commitMessage;
  }

  @ApiProperty({
    description: COMMIT_MSG_MSG.message,
    example: COMMIT_MSG_MSG.example,
  })
  @Expose({ name: 'commitMessage', toPlainOnly: true })
  @IsNotEmpty({ message: COMMIT_MSG_MSG.requiredMessage })
  @IsString({ message: COMMIT_MSG_MSG.typeMessage })
  @Matches(COMMIT_MSG_MSG.regexp, {
    message: COMMIT_MSG_MSG.errorMessage,
  })
  commitMessage: string;
}
