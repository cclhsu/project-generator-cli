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

  @ApiProperty({
    description: 'Type of the Gherkin step (Given, When, Then).',
    enum: StepType,
  })
  @Expose({ name: 'type', toPlainOnly: true })
  @IsEnum(StepType, { message: 'Invalid step type' })
  type: StepType;

  @ApiProperty({
    description: 'Description of the Gherkin step.',
    example: 'The user navigates to the login page.',
  })
  @Expose({ name: 'description', toPlainOnly: true })
  @IsString({ message: 'Description must be a string' })
  description: string;

  @ApiProperty({
    description: 'Optional data for the step, if applicable.',
    example: { username: 'john.doe', password: 'secret' },
  })
  @Expose({ name: 'data', toPlainOnly: true })
  @IsOptional()
  data?: any; // Optional data for the step, if applicable
}
