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
import { IdUuidDTO } from '../../../common/dto';

export class ProjectTeamIdUuidAnswerDTO {
  constructor(projectTeam: IdUuidDTO) {
    this.projectTeam = projectTeam;
  }

  @ApiProperty({
    description:
      'ID and UUID of the user who is the Project Team of the Project Team (UUID)',
    example: '{"ID":"jane.doe","UUID":"00000000-0000-0000-0000-000000000002"}',
  })
  @Expose({ name: 'projectTeam', toPlainOnly: true })
  @IsObject()
  projectTeam: IdUuidDTO;

  // @ApiProperty({
  //   description: 'IDs of team projectTeam in the Team Metadata (ID)',
  //   example: 'john.doe',
  //   type: String,
  // })
  // @Expose({ name: 'projectTeam', toPlainOnly: true })
  // @IsArray()
  // @IsString({ each: true, message: 'Invalid string format' })
  // projectmMster: string;

}
