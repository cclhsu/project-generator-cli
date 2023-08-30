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
import {
  UserStoryDTO,
  AcceptanceTestScenarioDTO,
  DefinitionOfDoneDTO,
  GherkinFeatureDTO,
} from '../user-story';
import { NameUrlDTO } from '../../../../common/dto';

export class TaskDescriptionGherkinDTO {
  constructor(
    summary: string,
    details: string,
    userStories: UserStoryDTO[],
    acceptanceCriteria: AcceptanceTestScenarioDTO[],
    definitionOfDone: DefinitionOfDoneDTO[],
    link: NameUrlDTO,
    testPlan: GherkinFeatureDTO[],
  ) {
    this.summary = summary;
    this.details = details;
    this.userStories = userStories;
    this.acceptanceCriteria = acceptanceCriteria;
    this.definitionOfDone = definitionOfDone;
    this.link = link;
    this.testPlan = testPlan;
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
    type: [Object],
  })
  @Expose({ name: 'userStories', toPlainOnly: true })
  @IsArray({ each: true })
  @ValidateNested({ each: true })
  @Type(() => UserStoryDTO) // You should replace with the appropriate class
  userStories: UserStoryDTO[];

  @ApiProperty({
    description: 'Acceptance criteria for the task.',
    type: [Object],
  })
  @Expose({ name: 'acceptanceCriteria', toPlainOnly: true })
  @IsArray({ each: true })
  @ValidateNested({ each: true })
  @Type(() => AcceptanceTestScenarioDTO) // You should replace with the appropriate class
  acceptanceCriteria: AcceptanceTestScenarioDTO[];

  @ApiProperty({
    description: 'Definition of Done for the task.',
    type: [Object],
  })
  @Expose({ name: 'definitionOfDone', toPlainOnly: true })
  @IsArray({ each: true })
  @ValidateNested({ each: true })
  @Type(() => DefinitionOfDoneDTO) // You should replace with the appropriate class
  definitionOfDone: DefinitionOfDoneDTO[];

  @ApiProperty({
    description: 'Link to documentation related to the task.',
  })
  @Expose({ name: 'link', toPlainOnly: true })
  @ValidateNested()
  link: NameUrlDTO;

  @ApiProperty({
    description: 'Test Plan for the task.',
    type: [Object],
  })
  @Expose({ name: 'testPlan', toPlainOnly: true })
  @IsArray({ each: true })
  @ValidateNested({ each: true })
  @Type(() => GherkinFeatureDTO) // You should replace with the appropriate class
  testPlan: GherkinFeatureDTO[];
}
