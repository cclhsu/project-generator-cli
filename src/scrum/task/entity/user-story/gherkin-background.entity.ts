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
import { GherkinStepEntity } from './gherkin-step.entity';

// GherkinBackground Entity
export class GherkinBackgroundEntity {
  constructor(name: string, steps: GherkinStepEntity[]) {
    this.name = name;
    this.steps = steps;
  }

  @ApiProperty({
    description: 'Name of the Gherkin background.',
    example: 'Background scenario',
  })
  @Expose({ name: 'name', toPlainOnly: true })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @ApiProperty({
    description: 'Steps of the Gherkin background.',
    type: [GherkinStepEntity],
  })
  @Expose({ name: 'steps', toPlainOnly: true })
  @ValidateNested({ each: true })
  @Type(() => GherkinStepEntity)
  steps: GherkinStepEntity[];
}
