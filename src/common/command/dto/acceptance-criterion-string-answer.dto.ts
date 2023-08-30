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

export const ACCEPTANCE_CRITERION_MSG: Answers = {
  regexp: /^Given .+, when .+( and .+)?, then .+( and .+)?\.$/i,
  message: 'Gherkin Acceptance Criterion',
  example:
    'e.g. Given a user is logged in, when the user clicks on the logout button, then the user is logged out.',
  typeMessage: 'Acceptance Criterion must be a string',
  requiredMessage: 'Please enter an acceptance criterion',
  invalidMessage: 'Please enter a valid acceptance criterion',
  errorMessage:
    'Acceptance Criterion should follow the format "Given <some-context>, When <some-event>, then <some-outcome>".',
  MinLengthMessage: 'Acceptance Criterion should be at least 10 characters',
  MaxLengthMessage: 'Acceptance Criterion cannot exceed 500 characters',
};

export class AcceptanceCriterionStringAnswerDTO {
  constructor(acceptanceCriterionString: string) {
    this.acceptanceCriterionString = acceptanceCriterionString;
  }

  @ApiProperty({
    description: ACCEPTANCE_CRITERION_MSG.message,
    example: ACCEPTANCE_CRITERION_MSG.example,
  })
  @Expose({ name: 'acceptanceCriterionString', toPlainOnly: true })
  @IsNotEmpty({ message: ACCEPTANCE_CRITERION_MSG.requiredMessage })
  @IsString({ message: ACCEPTANCE_CRITERION_MSG.typeMessage })
  @MaxLength(500, {
    message: ACCEPTANCE_CRITERION_MSG.MaxLengthMessage,
  })
  @Matches(ACCEPTANCE_CRITERION_MSG.regexp, {
    message: ACCEPTANCE_CRITERION_MSG.errorMessage,
  })
  acceptanceCriterionString: string;
}
