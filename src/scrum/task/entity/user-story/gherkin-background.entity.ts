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
import { GherkinStepEntity } from './gherkin-step.entity';

// GherkinBackground Entity
export class GherkinBackgroundEntity {
  constructor(name: string, steps: GherkinStepEntity[]) {
    this.name = name;
    this.steps = steps;
  }
  name: string;
  steps: GherkinStepEntity[];
}
