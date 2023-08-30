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
import {
  DEFAULT_PROJECT_STATUS,
  PROJECT_STATUS_TYPES,
  PROJECT_STATUS_TYPE_ARRAY,
} from '../../../common/constant';

export class IterationStatusAnswerDTO {
  constructor(iterationStatus: PROJECT_STATUS_TYPES = DEFAULT_PROJECT_STATUS) {
    this.iterationStatus = iterationStatus;
  }

  @ApiProperty({
    description: 'Iteration Status',
    example: PROJECT_STATUS_TYPE_ARRAY,
    type: [String],
    default: DEFAULT_PROJECT_STATUS,
  })
  @Expose({ name: 'iterationStatus', toPlainOnly: true })
  @IsEnum(PROJECT_STATUS_TYPE_ARRAY, {
    message:
      'Invalid iteration status type. Allowed values: ' +
      PROJECT_STATUS_TYPE_ARRAY.join(', '),
    context: {
      reason: 'iterationStatus',
    },
  })
  iterationStatus: PROJECT_STATUS_TYPES;
}
