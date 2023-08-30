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

export class AcceptanceCriterionAnswerDTO {
  constructor(acceptanceCriterion: string) {
    this.acceptanceCriterion = acceptanceCriterion;
  }

  @ApiProperty({
    description: 'Acceptance criterion for the task.',
    example: 'The user should be able to log in with valid credentials.',
  })
  @Expose({ name: 'acceptanceCriterion', toPlainOnly: true })
  @IsString({ message: 'Acceptance criterion must be a string' })
  @MaxLength(500, {
    message: 'Acceptance criterion cannot exceed 500 characters',
  })
  @Matches(/^Given .+, when .+( and .+)?, then .+( and .+)?\.$/i, {
    message:
      'Acceptance criterion should follow the format "Given <some-context>, When <some-event>, Then <some-outcome>".',
  })
  acceptanceCriterion: string;
}
