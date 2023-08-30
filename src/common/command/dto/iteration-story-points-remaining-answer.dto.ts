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

export class IterationStoryPointsRemainingAnswerDTO {
  constructor(iterationStoryPointsRemaining: string) {
    this.iterationStoryPointsRemaining = iterationStoryPointsRemaining;
  }

  @ApiProperty({
    description: 'The iteration story points',
    example: '50',
    type: Number,
  })
  @Expose({ name: 'iterationStoryPointsRemaining', toPlainOnly: true })
  @IsNumberString()
  iterationStoryPointsRemaining: string;
}
