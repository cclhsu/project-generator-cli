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

// AcceptanceTestScenario Entity
export class AcceptanceTestScenarioEntity {
  constructor(
    name: string,
    given: GherkinStepEntity[],
    when: GherkinStepEntity,
    then: GherkinStepEntity[],
  ) {
    this.name = name;
    this.given = given;
    this.when = when;
    this.then = then;
  }
  name: string;
  given: GherkinStepEntity[];
  when: GherkinStepEntity;
  then: GherkinStepEntity[];
}

// Example usage:
// const acceptanceTestScenario: AcceptanceTestScenarioEntity = {
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
