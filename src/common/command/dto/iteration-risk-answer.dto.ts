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
  DEFAULT_TASK_RISK,
  TASK_RISK_TYPES,
  TASK_RISK_TYPE_ARRAY,
} from '../../../common/constant';

export class IterationRiskAnswerDTO {
  constructor(iterationRisk: TASK_RISK_TYPES = DEFAULT_TASK_RISK) {
    this.iterationRisk = iterationRisk;
  }

  @ApiProperty({
    description: 'Iteration Risk',
    example: TASK_RISK_TYPE_ARRAY,
    type: [String],
    default: DEFAULT_TASK_RISK,
  })
  @Expose({ name: 'iterationRisk', toPlainOnly: true })
  @IsEnum(TASK_RISK_TYPE_ARRAY, {
    message:
      'Invalid iteration risk type. Allowed values: ' +
      TASK_RISK_TYPE_ARRAY.join(', '),
    context: {
      reason: 'iterationRisk',
    },
  })
  iterationRisk: TASK_RISK_TYPES;
}
