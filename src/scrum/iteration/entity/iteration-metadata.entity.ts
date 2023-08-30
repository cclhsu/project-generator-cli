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
  DEFAULT_ITERATION_TYPE,
  DEFAULT_PROJECT_STATUS,
  DEFAULT_TASK_PRIORITY,
  DEFAULT_TASK_RISK,
  ITERATION_TYPE_ARRAY,
  ITERATION_TYPES,
  PROJECT_STATUS_TYPE_ARRAY,
  PROJECT_STATUS_TYPES,
  TASK_PRIORITY_TYPE_ARRAY,
  TASK_PRIORITY_TYPES,
  TASK_RISK_TYPE_ARRAY,
  TASK_RISK_TYPES,
} from '../../../common/constant';
import { CommonDateEntity } from '../../../common/entity/common-date.entity';
import { IdUuidStatusEntity } from '../../../common/entity';

export class IterationMetadataEntity {
  constructor(
    name: string,
    status: PROJECT_STATUS_TYPES,
    priority: TASK_PRIORITY_TYPES,
    risk: TASK_RISK_TYPES,
    tags: string[],
    dates: CommonDateEntity,
    iterationType: ITERATION_TYPES,
    // storyPoints: {
    //   total: number;
    //   remaining: number;
    // },
  ) {
    this.name = name;
    this.status = status;
    this.priority = priority;
    this.risk = risk;
    this.tags = tags;
    this.dates = dates;
    this.iterationType = iterationType;
    // this.storyPoints = storyPoints;
  }

  @ApiProperty({
    description: 'Name of the Iteration Metadata.',
    example: 'John Doe',
  })
  @Expose({ name: 'name', toPlainOnly: true })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @ApiProperty({
    description:
      'The status of the project (PLANNED, IN_PROGRESS, or COMPLETED).',
    enum: PROJECT_STATUS_TYPE_ARRAY,
    example: DEFAULT_PROJECT_STATUS,
    nullable: false,
    type: 'string',
  })
  @IsString()
  @IsIn(PROJECT_STATUS_TYPE_ARRAY, {
    message: `Invalid project status. Possible values: ${PROJECT_STATUS_TYPE_ARRAY.join(
      ', ',
    )}`,
  })
  status: PROJECT_STATUS_TYPES;

  @ApiProperty({
    description:
      'The priority of the project (PLANNED, IN_PROGRESS, or COMPLETED).',
    enum: TASK_PRIORITY_TYPE_ARRAY,
    example: DEFAULT_TASK_PRIORITY,
    nullable: false,
    type: 'string',
  })
  @IsString()
  @IsIn(TASK_PRIORITY_TYPE_ARRAY, {
    message: `Invalid project priority. Possible values: ${TASK_PRIORITY_TYPE_ARRAY.join(
      ', ',
    )}`,
  })
  priority: TASK_PRIORITY_TYPES;

  @ApiProperty({
    description:
      'The risk of the project (PLANNED, IN_PROGRESS, or COMPLETED).',
    enum: TASK_RISK_TYPE_ARRAY,
    example: DEFAULT_TASK_RISK,
    nullable: false,
    type: 'string',
  })
  @IsString()
  @IsIn(TASK_RISK_TYPE_ARRAY, {
    message: `Invalid project risk. Possible values: ${TASK_RISK_TYPE_ARRAY.join(
      ', ',
    )}`,
  })
  risk: TASK_RISK_TYPES;

  @ApiProperty({
    description: 'Tags associated with the Iteration Metadata.',
    type: [String],
  })
  @Expose({ name: 'tags', toPlainOnly: true })
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @ApiProperty({
    description: 'Dates related to the Iteration Metadata.',
    type: CommonDateEntity,
  })
  @Expose({ name: 'dates', toPlainOnly: true })
  @ValidateNested({ each: true })
  dates: CommonDateEntity;

  @ApiProperty({
    description: 'Iteration Type',
    example: ITERATION_TYPE_ARRAY,
    type: [String],
    default: DEFAULT_ITERATION_TYPE,
  })
  @Expose({ name: 'iterationType', toPlainOnly: true })
  @IsEnum(ITERATION_TYPE_ARRAY, {
    message:
      'Invalid iteration type type. Allowed values: ' +
      ITERATION_TYPE_ARRAY.join(', '),
    context: {
      reason: 'iterationType',
    },
  })
  @IsOptional()
  iterationType: ITERATION_TYPES;

  // @ApiProperty()
  // @Expose({ name: 'storyPoints', toPlainOnly: true })
  // @IsObject()
  // @Type(() => IterationContentEntity)
  // storyPoints: {
  //   total: number;
  //   completed: number;
  //   remaining: number;
  // };
}
