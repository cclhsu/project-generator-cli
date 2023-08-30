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
import { IterationDTO } from '../../../scrum/iteration/dto';

export class IterationsAnswerDTO {
  constructor(iterations: IterationDTO[]) {
    this.iterations = iterations;
  }

  @ApiProperty({
    description: 'An array of iteration DTOs.',
    type: () => IterationDTO,
    isArray: true,
  })
  @Expose({ name: 'iterations', toPlainOnly: true })
  @IsArray({ message: 'Iterations must be an array' })
  @ValidateNested({ each: true })
  iterations: IterationDTO[];
}
