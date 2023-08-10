import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsEmail,
  IsObject,
  IsString,
  MinLength,
  isObject,
} from 'class-validator';
import { Expose } from 'class-transformer';

export class TaskDescriptionDTO {
  constructor(
    summary: string,
    details: string,
    userStories: string[],
    acceptanceCriteria: string[],
    definitionOfDone: string,
    documentationLink: string,
  ) {
    this.summary = summary;
    this.details = details;
    this.userStories = userStories;
    this.acceptanceCriteria = acceptanceCriteria;
    this.definitionOfDone = definitionOfDone;
    this.documentationLink = documentationLink;
  }

  @ApiProperty()
  @Expose({ name: 'summary', toPlainOnly: true })
  @IsString()
  summary: string;

  @ApiProperty()
  @Expose({ name: 'details', toPlainOnly: true })
  @IsString()
  details: string;

  @ApiProperty()
  @Expose({ name: 'userStories', toPlainOnly: true })
  @IsArray()
  userStories: string[];

  @ApiProperty()
  @Expose({ name: 'acceptanceCriteria', toPlainOnly: true })
  @IsArray()
  acceptanceCriteria: string[];

  @ApiProperty()
  @Expose({ name: 'definitionOfDone', toPlainOnly: true })
  @IsString()
  definitionOfDone: string;

  @ApiProperty()
  @Expose({ name: 'documentationLink', toPlainOnly: true })
  @IsString()
  documentationLink: string;
}

// import { ITaskDescription } from '../interface/task-description.interface';
// import { IUserStory } from 'src/scrum/utils/user-story/interface/user-story.interface';
// import { IAcceptanceTestScenario } from 'src/scrum/utils/user-story/interface/acceptance-test-scenario.interface';
// import { IDefinitionOfDone } from 'src/scrum/utils/user-story/interface/definition-of-done.interface';
// import { IGherkinFeature } from 'src/scrum/utils/user-story/interface/gherkin-feature.interface';

// export class TaskDescriptionDTO implements ITaskDescription {
//   constructor(
//     summary: string,
//     details: string,
//     userStories: IUserStory[],
//     acceptanceCriteria: IAcceptanceTestScenario[],
//     definitionOfDone: IDefinitionOfDone[],
//     documentationLink: string,
//     testPlan: IGherkinFeature[],
//   ) {
//     this.summary = summary;
//     this.details = details;
//     this.userStories = userStories;
//     this.acceptanceCriteria = acceptanceCriteria;
//     this.definitionOfDone = definitionOfDone;
//     this.documentationLink = documentationLink;
//     this.testPlan = testPlan;
//   }

//   summary: string;
//   details: string;
//   userStories: IUserStory[];
//   acceptanceCriteria: IAcceptanceTestScenario[];
//   definitionOfDone: IDefinitionOfDone[];
//   documentationLink: string;
//   testPlan: IGherkinFeature[];
// }
