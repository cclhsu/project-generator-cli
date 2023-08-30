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

export class DefinitionOfDoneAnswerDTO {
  constructor(definitionOfDone: string) {
    this.definitionOfDone = definitionOfDone;
  }

  @ApiProperty({
    description: 'Definition Of Done for the task.',
    example: 'The user should be able to log in with valid credentials.',
  })
  @Expose({ name: 'definitionOfDone', toPlainOnly: true })
  @IsString({ message: 'Definition Of Done must be a string' })
  @MaxLength(500, {
    message: 'Definition Of Done cannot exceed 500 characters',
  })
  @Matches(/^Given .+, when .+( and .+)?, then .+( and .+)?\.$/i, {
    message:
      'Acceptance criterion should follow the format "Given <some-context>, When <some-event>, Then <some-outcome>".',
  })
  definitionOfDone: string;
}
