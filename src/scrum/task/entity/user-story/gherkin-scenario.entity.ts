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
import { GherkinStepEntity, StepType } from './gherkin-step.entity';

// GherkinScenario Entity
export class GherkinScenarioEntity {
  constructor(
    name: string,
    steps: GherkinStepEntity[],
    tags?: string[],
    examples?: GherkinStepEntity[][],
  ) {
    this.name = name;
    this.steps = steps;
    this.tags = tags;
    this.examples = examples;
  }
  name: string;
  steps: GherkinStepEntity[];
  tags?: string[]; // Scenario tags
  examples?: GherkinStepEntity[][]; // Scenario outline examples
}

// Example usage:
// const loginScenario: GherkinScenarioEntity = {
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
