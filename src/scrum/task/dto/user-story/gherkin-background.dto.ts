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
import { GherkinStepDTO } from './gherkin-step.dto';

// GherkinBackground DTO
export class GherkinBackgroundDTO {
  constructor(name: string, steps: GherkinStepDTO[]) {
    this.name = name;
    this.steps = steps;
  }
  name: string;
  steps: GherkinStepDTO[];
}
