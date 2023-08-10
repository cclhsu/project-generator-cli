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

// AcceptanceTestScenario DTO
export class AcceptanceTestScenarioDTO {
  constructor(
    name: string,
    given: GherkinStepDTO[],
    when: GherkinStepDTO,
    then: GherkinStepDTO[],
  ) {
    this.name = name;
    this.given = given;
    this.when = when;
    this.then = then;
  }
  name: string;
  given: GherkinStepDTO[];
  when: GherkinStepDTO;
  then: GherkinStepDTO[];
}

// Example usage:
// const acceptanceTestScenario: AcceptanceTestScenarioDTO = {
//   name: 'Successful login scenario',
//   given: [
//     { type: StepType.Given, description: 'Given I am on the login page' },
//     { type: StepType.Given, description: 'And I have a registered account' },
//   ],
//   when: {
//     type: StepType.When,
//     description:
//       'When I enter my valid username and password and click the login button',
//   },
//   then: [
//     {
//       type: StepType.Then,
//       description: 'Then I should be redirected to the dashboard',
//     },
//   ],
// };
