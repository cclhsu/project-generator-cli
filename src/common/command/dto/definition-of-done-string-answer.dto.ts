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

export const DEFINITION_OF_DONE_MSG: Answers = {
  regexp: /^Given .+, when .+( and .+)?, then .+( and .+)?\.$/i,
  message: 'Gherkin Definition of done',
  example: 'e.g. Given a user is logged in, when the user clicks on the logout button, then the user is logged out.',
  typeMessage: 'Definition of done must be a string',
  requiredMessage: 'Please enter an definition of done',
  invalidMessage: 'Please enter a valid definition of done',
  errorMessage:
    'Definition of done should follow the format "Given <some-context>, When <some-event>, then <some-outcome>".',
  MinLengthMessage: 'Definition of done should be at least 10 characters',
  MaxLengthMessage: 'Definition of done cannot exceed 500 characters',
};

export class DefinitionOfDoneStringAnswerDTO {
  constructor(definitionOfDoneString: string) {
    this.definitionOfDoneString = definitionOfDoneString;
  }

  @ApiProperty({
    description: DEFINITION_OF_DONE_MSG.message,
    example: DEFINITION_OF_DONE_MSG.example,
  })
  @Expose({ name: 'definitionOfDoneString', toPlainOnly: true })
  @IsNotEmpty({ message: DEFINITION_OF_DONE_MSG.requiredMessage })
  @IsString({ message: DEFINITION_OF_DONE_MSG.typeMessage })
  @MaxLength(500, {
    message: DEFINITION_OF_DONE_MSG.MaxLengthMessage,
  })
  @Matches(DEFINITION_OF_DONE_MSG.regexp, {
    message: DEFINITION_OF_DONE_MSG.errorMessage,
  })
  definitionOfDoneString: string;
}
