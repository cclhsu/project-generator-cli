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
import { GherkinStepDTO, StepType } from './gherkin-step.dto';

// GherkinScenario DTO
export class GherkinScenarioDTO {
  constructor(
    name: string,
    steps: GherkinStepDTO[],
    tags?: string[],
    examples?: GherkinStepDTO[][],
  ) {
    this.name = name;
    this.steps = steps;
    this.tags = tags;
    this.examples = examples;
  }
  name: string;
  steps: GherkinStepDTO[];
  tags?: string[]; // Scenario tags
  examples?: GherkinStepDTO[][]; // Scenario outline examples
}

// Example usage:
// const loginScenario: GherkinScenarioDTO = {
//   name: 'Successful login',
//   steps: [
//     { type: StepType.Given, description: 'Given I am on the login page' },
//     {
//       type: StepType.When,
//       description:
//         'When I enter my valid username and password and click the login button',
//     },
//     {
//       type: StepType.Then,
//       description: 'Then I should be redirected to the dashboard',
//     },
//   ],
// };
