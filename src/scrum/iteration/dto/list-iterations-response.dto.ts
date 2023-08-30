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
import { IterationResponseDTO } from './iteration-response.dto';

export class ListIterationResponseDTO {
  constructor(iterations: IterationResponseDTO[]) {
    this.iterations = iterations;
  }

  @ApiProperty({
    description: 'An array of iteration DTOs.',
    type: () => IterationResponseDTO,
    isArray: true,
  })
  @Expose({ name: 'iterations', toPlainOnly: true })
  @IsArray({ message: 'Iterations must be an array' })
  @ValidateNested({ each: true })
  iterations: IterationResponseDTO[];
}
