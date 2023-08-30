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

export class ScrumMasterAnswerDTO {
  constructor(scrumMaster: IdUuidDTO) {
    this.scrumMaster = scrumMaster;
  }

  @ApiProperty({
    description:
      'ID and UUID of the user who is the Scrum Master of the Scrum Team (UUID)',
    example: '{"ID":"jane.doe","UUID":"00000000-0000-0000-0000-000000000002"}',
  })
  @Expose({ name: 'scrumMaster', toPlainOnly: true })
  @IsObject()
  scrumMaster: IdUuidDTO;

  // @ApiProperty({
  //   description: 'IDs of team scrumMaster in the Team Metadata (ID)',
  //   example: 'john.doe',
  //   type: String,
  // })
  // @Expose({ name: 'scrumMaster', toPlainOnly: true })
  // @IsArray()
  // @IsString({ each: true, message: 'Invalid string format' })
  // scrummMster: string;
}
