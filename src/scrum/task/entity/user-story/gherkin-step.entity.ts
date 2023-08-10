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

// Step Type Enum
export enum StepType {
  Given = 'Given',
  When = 'When',
  Then = 'Then',
}

// GherkinStep Entity
export class GherkinStepEntity {
  constructor(type: StepType, description: string, data?: any) {
    this.type = type;
    this.description = description;
    this.data = data;
  }
  type: StepType;
  description: string;
  data?: any; // Optional data for the step, if applicable
}
