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

export class IterationStoryPointsAnswerDTO {
  constructor(iterationStoryPoints: string) {
    this.iterationStoryPoints = iterationStoryPoints;
  }

  @ApiProperty({
    description: 'The iteration story points',
    example: '50',
    type: Number,
  })
  @Expose({ name: 'iterationStoryPoints', toPlainOnly: true })
  @IsNumberString()
  iterationStoryPoints: string;
}
