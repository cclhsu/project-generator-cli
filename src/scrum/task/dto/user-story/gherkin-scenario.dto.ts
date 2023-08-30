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

  @ApiProperty({
    description: 'Name of the Gherkin scenario.',
    example: 'Successful login',
  })
  @Expose({ name: 'name', toPlainOnly: true })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @ApiProperty({
    description: 'Steps of the Gherkin scenario.',
    type: [GherkinStepDTO],
  })
  @Expose({ name: 'steps', toPlainOnly: true })
  @ValidateNested({ each: true })
  @Type(() => GherkinStepDTO)
  steps: GherkinStepDTO[];

  @ApiProperty({
    description: 'Tags for the Gherkin scenario.',
    example: ['@smoke', '@login'],
  })
  @Expose({ name: 'tags', toPlainOnly: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiProperty({
    description: 'Examples for the Gherkin scenario outline.',
    type: [[GherkinStepDTO]],
  })
  @Expose({ name: 'examples', toPlainOnly: true })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GherkinStepDTO)
  examples?: GherkinStepDTO[][];
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
