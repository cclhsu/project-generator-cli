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

export const TEAM_NAME_MSG: Answers = {
  regexp: /^[A-Z][A-Za-z]+(: [A-Z][a-z]+)? Team$/,
  message: 'Team name is Unique identifier in the format "XYZ Team".',
  example: 'e.g. XYZ Team',
  typeMessage: 'Team name must be a string',
  requiredMessage: 'Please enter an team name',
  invalidMessage: 'Please enter a valid team name',
  MinLengthMessage: 'Team name must have at least 2 characters',
  MaxLengthMessage: 'Team name cannot exceed 100 characters',
  errorMessage: 'Please enter a valid team name format (e.g. XYZ Team)',
};

export class TeamNameAnswerDTO {
  constructor(teamName: string) {
    this.teamName = teamName;
  }

  @ApiProperty({
    description: TEAM_NAME_MSG.message,
    example: TEAM_NAME_MSG.example,
  })
  @Expose({ name: 'teamName', toPlainOnly: true })
  @IsNotEmpty({ message: TEAM_NAME_MSG.requiredMessage })
  @IsString({ message: TEAM_NAME_MSG.typeMessage })
  @MinLength(2, { message: TEAM_NAME_MSG.MinLengthMessage })
  @MaxLength(100, { message: TEAM_NAME_MSG.MaxLengthMessage })
  @Matches(TEAM_NAME_MSG.regexp, {
    message: TEAM_NAME_MSG.errorMessage,
  })
  teamName: string;
}
