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

  @ApiProperty({
    description: 'Name of the acceptance test scenario.',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Given steps of the acceptance test scenario.',
    type: [GherkinStepEntity],
  })
  @Expose({ name: 'given', toPlainOnly: true })
  @ValidateNested({ each: true })
  @Type(() => GherkinStepEntity)
  given: GherkinStepEntity[];

  @ApiProperty({
    description: 'When step of the acceptance test scenario.',
    type: GherkinStepEntity,
  })
  @Expose({ name: 'when', toPlainOnly: true })
  @ValidateNested()
  @Type(() => GherkinStepEntity)
  when: GherkinStepEntity;

  @ApiProperty({
    description: 'Then steps of the acceptance test scenario.',
    type: [GherkinStepEntity],
  })
  @Expose({ name: 'then', toPlainOnly: true })
  @ValidateNested({ each: true })
  @Type(() => GherkinStepEntity)
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
