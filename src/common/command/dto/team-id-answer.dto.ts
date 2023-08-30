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

export const TEAM_ID_MSG: Answers = {
  regexp: /^[a-z]+.[a-z]+\.team$/,
  message: 'Team ID is Unique identifier in the format "xyz.team".',
  example: 'e.g. xyz.team',
  typeMessage: 'Team ID must be a string',
  requiredMessage: 'Please enter an team ID',
  invalidMessage: 'Please enter a valid team ID',
  errorMessage: 'Please enter a valid team ID format (e.g. xyz.team)',
};

export class TeamIdAnswerDTO {
  constructor(ID: string) {
    this.ID = ID;
  }

  @ApiProperty({
    description: TEAM_ID_MSG.message,
    example: TEAM_ID_MSG.example,
  })
  @Expose({ name: 'ID', toPlainOnly: true })
  @IsNotEmpty({ message: TEAM_ID_MSG.requiredMessage })
  @IsString({ message: TEAM_ID_MSG.typeMessage })
  @Matches(TEAM_ID_MSG.regexp, {
    message: TEAM_ID_MSG.errorMessage,
  })
  ID: string;
}
