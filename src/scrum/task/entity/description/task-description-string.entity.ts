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
import { NameUrlDTO } from '../../../../common/dto';

export class TaskDescriptionEntity {
  constructor(
    summary: string,
    details: string,
    userStories: string[],
    acceptanceCriteria: string[],
    definitionOfDone: string[],
    link: NameUrlDTO,
  ) {
    this.summary = summary;
    this.details = details;
    this.userStories = userStories;
    this.acceptanceCriteria = acceptanceCriteria;
    this.definitionOfDone = definitionOfDone;
    this.link = link;
  }

  @ApiProperty({
    description: 'Summary of the task description.',
  })
  @Expose({ name: 'summary', toPlainOnly: true })
  @IsString()
  summary: string;

  @ApiProperty({
    description: 'Detailed description of the task.',
  })
  @Expose({ name: 'details', toPlainOnly: true })
  @IsString()
  details: string;

  @ApiProperty({
    description: 'User stories associated with the task.',
    type: [String],
  })
  @Expose({ name: 'userStories', toPlainOnly: true })
  @IsArray({ each: true })
  userStories: string[];

  @ApiProperty({
    description: 'Acceptance criteria for the task.',
    type: [String],
  })
  @Expose({ name: 'acceptanceCriteria', toPlainOnly: true })
  @IsArray({ each: true })
  acceptanceCriteria: string[];

  @ApiProperty({
    description: 'Definition of done for the task.',
  })
  @Expose({ name: 'definitionOfDone', toPlainOnly: true })
  @IsString()
  definitionOfDone: string[];

  @ApiProperty({
    description: 'Link to documentation related to the task.',
  })
  @Expose({ name: 'link', toPlainOnly: true })
  @ValidateNested()
  link: NameUrlDTO;
}
