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
import { TeamResponseDTO } from './team-response.dto';

export class ListTeamResponseDTO {
  constructor(teams: TeamResponseDTO[]) {
    this.teams = teams;
  }

  @ApiProperty({ type: () => TeamResponseDTO, isArray: true })
  @Expose({ name: 'teams', toPlainOnly: true })
  @IsArray()
  @ValidateNested({ each: true })
  teams: TeamResponseDTO[];
}
