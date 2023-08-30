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

export class ProjectTeamAnswerDTO {
  constructor(projectTeam: string) {
    this.projectTeam = projectTeam;
  }

  @ApiProperty({
    description:
      'Project Team ID is Unique identifier in the format "xyz.team".',
    example: 'xyz.team',
  })
  @Expose({ name: 'projectTeam', toPlainOnly: true })
  @IsString({ message: 'Project Team ID must be a string.' })
  @Matches(/^[a-z]+.[a-z]+\.team$/, {
    message: 'Project Team ID should follow the format "xyz.team".',
  })
  projectTeam: string;
}
