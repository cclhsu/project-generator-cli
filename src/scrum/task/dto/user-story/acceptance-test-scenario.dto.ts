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

  @ApiProperty({
    description: 'Name of the acceptance test scenario.',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Given steps of the acceptance test scenario.',
    type: [GherkinStepDTO],
  })
  @Expose({ name: 'given', toPlainOnly: true })
  @ValidateNested({ each: true })
  @Type(() => GherkinStepDTO)
  given: GherkinStepDTO[];

  @ApiProperty({
    description: 'When step of the acceptance test scenario.',
    type: GherkinStepDTO,
  })
  @Expose({ name: 'when', toPlainOnly: true })
  @ValidateNested()
  @Type(() => GherkinStepDTO)
  when: GherkinStepDTO;

  @ApiProperty({
    description: 'Then steps of the acceptance test scenario.',
    type: [GherkinStepDTO],
  })
  @Expose({ name: 'then', toPlainOnly: true })
  @ValidateNested({ each: true })
  @Type(() => GherkinStepDTO)
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
