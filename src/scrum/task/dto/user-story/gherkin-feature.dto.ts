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
import { GherkinBackgroundDTO } from './gherkin-background.dto';
import { GherkinScenarioDTO } from './gherkin-scenario.dto';
import { UserStoryDTO } from './user-story.dto';

// GherkinFeature DTO
export class GherkinFeatureDTO {
  constructor(
    feature: string,
    description: UserStoryDTO,
    scenarios: GherkinScenarioDTO[],
    background?: GherkinBackgroundDTO,
    tags?: string[],
  ) {
    this.feature = feature;
    this.description = description;
    this.background = background;
    this.scenarios = scenarios;
    this.tags = tags;
  }

  @ApiProperty({
    description: 'Name of the Gherkin feature.',
    example: 'Login feature',
  })
  @Expose({ name: 'feature', toPlainOnly: true })
  @IsString({ message: 'Feature must be a string' })
  feature: string;

  @ApiProperty({
    description: 'Description of the Gherkin feature.',
    type: UserStoryDTO,
  })
  @Expose({ name: 'description', toPlainOnly: true })
  @ValidateNested()
  @Type(() => UserStoryDTO)
  description: UserStoryDTO;

  @ApiProperty({
    description: 'Background steps for the Gherkin feature.',
    type: GherkinBackgroundDTO,
  })
  @Expose({ name: 'background', toPlainOnly: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => GherkinBackgroundDTO)
  background?: GherkinBackgroundDTO;

  @ApiProperty({
    description: 'Scenarios of the Gherkin feature.',
    type: [GherkinScenarioDTO],
  })
  @Expose({ name: 'scenarios', toPlainOnly: true })
  @ValidateNested({ each: true })
  @Type(() => GherkinScenarioDTO)
  scenarios: GherkinScenarioDTO[];

  @ApiProperty({
    description: 'Tags for the Gherkin feature.',
    example: ['@feature', '@login'],
  })
  @Expose({ name: 'tags', toPlainOnly: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}

// // Example usage:
// const loginFeature: IGherkinFeature = {
//   feature: 'Login',
//   description: {
//     role: 'registered user',
//     goal: 'log in to my account',
//     benefit: 'access personalized content and features',
//   },
//   scenarios: [loginScenario],
//   tags: ['authentication', 'login'],
// };

// // Function to print GherkinFeature
// function formatGherkinStep(step: GherkinStepDTO, index: number): string {
//   let formattedStep = `    ${index + 1}. ${step.description}\n`;
//   if (step.data) {
//     formattedStep += `       Data: ${step.data}\n`;
//   }
//   return formattedStep;
// }

// // Function to print GherkinScenario as a string
// function formatGherkinScenario(
//   scenario: GherkinScenarioDTO,
//   index: number,
// ): string {
//   let formattedScenario = `  Scenario ${index + 1}: ${scenario.name}\n`;

//   scenario.steps.forEach((step, stepIndex) => {
//     formattedScenario += formatGherkinStep(step, stepIndex);
//   });

//   if (scenario.tags) {
//     formattedScenario += `    Tags: ${scenario.tags.join(', ')}\n`;
//   }

//   if (scenario.examples && scenario.examples.length > 0) {
//     formattedScenario += '    Examples:\n';
//     scenario.examples.forEach((example, exampleIndex) => {
//       formattedScenario += `      Example ${exampleIndex + 1}:\n`;
//       example.forEach((step, stepIndex) => {
//         formattedScenario += formatGherkinStep(step, stepIndex);
//       });
//     });
//   }

//   return formattedScenario;
// }

// // Function to print GherkinFeature as a string
// function printGherkinFeature(feature: GherkinFeature): string {
//   let formattedFeature = `Feature: ${feature.feature}\n\n`;

//   formattedFeature += 'Description:\n';
//   formattedFeature += `  ${printUserStory(feature.description)}\n\n`;

//   if (feature.background) {
//     formattedFeature += 'Background:\n';
//     feature.background.forEach((step, index) => {
//       formattedFeature += formatGherkinStep(step, index);
//     });
//     formattedFeature += '\n';
//   }

//   if (feature.tags && feature.tags.length > 0) {
//     formattedFeature += `Tags: ${feature.tags.join(', ')}\n\n`;
//   }

//   formattedFeature += 'Scenarios:\n';
//   feature.scenarios.forEach((scenario, index) => {
//     formattedFeature += formatGherkinScenario(scenario, index);
//   });

//   return formattedFeature;
// }

// // Example usage:
// const feature: GherkinFeature = {
//   feature: 'Login Feature',
//   description: {
//     role: 'registered user',
//     goal: 'log in to my account',
//     benefit: 'access personalized content and features',
//   },
//   background: [
//     { description: 'Given the user is on the login page' },
//     { description: 'And the user has an existing account' },
//   ],
//   scenarios: [
//     // Scenarios here...
//   ],
//   tags: ['login', 'authentication'],
// };

// console.log(printGherkinFeature(feature));
