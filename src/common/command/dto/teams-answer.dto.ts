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
import { TeamDTO } from '../../../scrum/team/dto';

export class TeamsAnswerDTO {
  constructor(teams: TeamDTO[]) {
    this.teams = teams;
  }

  @ApiProperty({
    description: 'An array of team DTOs.',
    type: () => TeamDTO,
    isArray: true,
  })
  @Expose({ name: 'teams', toPlainOnly: true })
  @IsArray({ message: 'Teams must be an array' })
  @ValidateNested({ each: true })
  teams: TeamDTO[];
}
