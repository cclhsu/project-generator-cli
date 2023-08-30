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
  DEFAULT_TASK_COMPLEXITY,
  DEFAULT_TASK_DEPENDENCY,
  DEFAULT_TASK_EFFORT,
  DEFAULT_TASK_UNCERTAINTY,
  TASK_COMPLEXITY_TYPE_ARRAY,
  TASK_COMPLEXITY_TYPES,
  TASK_DEPENDENCY_TYPE_ARRAY,
  TASK_DEPENDENCY_TYPES,
  TASK_EFFORT_TYPE_ARRAY,
  TASK_EFFORT_TYPES,
  TASK_UNCERTAINTY_TYPE_ARRAY,
  TASK_UNCERTAINTY_TYPES,
} from '../../../../common/constant';

export class TaskStoryPointsDTO {
  constructor(
    complexity: TASK_COMPLEXITY_TYPES,
    uncertainty: TASK_UNCERTAINTY_TYPES,
    dependency: TASK_DEPENDENCY_TYPES,
    effort: TASK_EFFORT_TYPES,
    total: number,
  ) {
    this.complexity = complexity;
    this.uncertainty = uncertainty;
    this.dependency = dependency;
    this.effort = effort;
    this.total = total;
  }

  @ApiProperty({
    description: 'Task Complexity',
    example: TASK_COMPLEXITY_TYPE_ARRAY,
    type: [String],
    default: DEFAULT_TASK_COMPLEXITY,
  })
  @Expose({ name: 'taskComplexity', toPlainOnly: true })
  @IsEnum(TASK_COMPLEXITY_TYPE_ARRAY, {
    message:
      'Invalid task complexity type. Allowed values: ' +
      TASK_COMPLEXITY_TYPE_ARRAY.join(', '),
    context: {
      reason: 'taskComplexity',
    },
  })
  complexity: TASK_COMPLEXITY_TYPES;

  @ApiProperty({
    description: 'Task Uncertainty',
    example: TASK_UNCERTAINTY_TYPE_ARRAY,
    type: [String],
    default: DEFAULT_TASK_UNCERTAINTY,
  })
  @Expose({ name: 'taskUncertainty', toPlainOnly: true })
  @IsEnum(TASK_UNCERTAINTY_TYPE_ARRAY, {
    message:
      'Invalid task uncertainty type. Allowed values: ' +
      TASK_UNCERTAINTY_TYPE_ARRAY.join(', '),
    context: {
      reason: 'taskUncertainty',
    },
  })
  uncertainty: TASK_UNCERTAINTY_TYPES;

  @ApiProperty({
    description: 'Task Dependency',
    example: TASK_DEPENDENCY_TYPE_ARRAY,
    type: [String],
    default: DEFAULT_TASK_DEPENDENCY,
  })
  @Expose({ name: 'taskDependency', toPlainOnly: true })
  @IsEnum(TASK_DEPENDENCY_TYPE_ARRAY, {
    message:
      'Invalid task dependency type. Allowed values: ' +
      TASK_DEPENDENCY_TYPE_ARRAY.join(', '),
    context: {
      reason: 'taskDependency',
    },
  })
  dependency: TASK_DEPENDENCY_TYPES;

  @ApiProperty({
    description: 'Task Effort',
    example: TASK_EFFORT_TYPE_ARRAY,
    type: [String],
    default: DEFAULT_TASK_EFFORT,
  })
  @Expose({ name: 'taskEffort', toPlainOnly: true })
  @IsEnum(TASK_EFFORT_TYPE_ARRAY, {
    message:
      'Invalid task effort type. Allowed values: ' +
      TASK_EFFORT_TYPE_ARRAY.join(', '),
    context: {
      reason: 'taskEffort',
    },
  })
  effort: TASK_EFFORT_TYPES;

  @ApiProperty()
  @Expose({ name: 'total', toPlainOnly: true })
  @IsString()
  total: number;
}
