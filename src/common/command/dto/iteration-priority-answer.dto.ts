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
  DEFAULT_TASK_PRIORITY,
  TASK_PRIORITY_TYPES,
  TASK_PRIORITY_TYPE_ARRAY,
} from '../../../common/constant';

export class IterationPriorityAnswerDTO {
  constructor(iterationPriority: TASK_PRIORITY_TYPES = DEFAULT_TASK_PRIORITY) {
    this.iterationPriority = iterationPriority;
  }

  @ApiProperty({
    description: 'Iteration Priority',
    example: TASK_PRIORITY_TYPE_ARRAY,
    type: [String],
    default: DEFAULT_TASK_PRIORITY,
  })
  @Expose({ name: 'iterationPriority', toPlainOnly: true })
  @IsEnum(TASK_PRIORITY_TYPE_ARRAY, {
    message:
      'Invalid iteration priority type. Allowed values: ' +
      TASK_PRIORITY_TYPE_ARRAY.join(', '),
    context: {
      reason: 'iterationPriority',
    },
  })
  iterationPriority: TASK_PRIORITY_TYPES;
}
