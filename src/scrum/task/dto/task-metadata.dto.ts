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
import { CommonDateDTO } from '../../../common/dto/common-date.dto';
import { TaskRelationsDTO } from './relation/task-relations.dto';
import { TaskStoryPointsDTO } from './story-points/task-story-points.dto';
import {
  TASK_TYPES,
  TASK_STATUS_TYPES,
  TASK_PRIORITY_TYPES,
  TASK_RISK_TYPES,
  TASK_TYPE_ARRAY,
  DEFAULT_TASK_TYPE,
  TASK_STATUS_TYPE_ARRAY,
  DEFAULT_TASK_STATUS,
  TASK_PRIORITY_TYPE_ARRAY,
  DEFAULT_TASK_PRIORITY,
  TASK_RISK_TYPE_ARRAY,
  DEFAULT_TASK_RISK,
} from '../../../common/constant';
import { IdUuidStatusDTO } from '../../../common/dto';

export class TaskMetadataDTO {
  constructor(
    name: string,
    taskType: TASK_TYPES,
    assignee: string,
    status: TASK_STATUS_TYPES,
    priority: TASK_PRIORITY_TYPES,
    risk: TASK_RISK_TYPES,
    tags: string[],
    dates: CommonDateDTO,
    storyPoint: TaskStoryPointsDTO,
    iterations?: IdUuidStatusDTO[],
    relations?: TaskRelationsDTO[],
  ) {
    this.name = name;
    this.taskType = taskType;
    this.assignee = assignee;
    this.status = status;
    this.priority = priority;
    this.risk = risk;
    this.tags = tags;
    this.dates = dates;
    this.storyPoint = storyPoint;
    this.iterations = iterations;
    this.relations = relations;
  }

  @ApiProperty({
    description: 'Name of the Task Metadata.',
    example: 'John Doe',
  })
  @Expose({ name: 'name', toPlainOnly: true })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @ApiProperty({
    description: 'Task Type',
    example: TASK_TYPE_ARRAY,
    type: [String],
    default: DEFAULT_TASK_TYPE,
  })
  @Expose({ name: 'taskType', toPlainOnly: true })
  @IsEnum(TASK_TYPE_ARRAY, {
    message:
      'Invalid task type type. Allowed values: ' + TASK_TYPE_ARRAY.join(', '),
    context: {
      reason: 'taskType',
    },
  })
  taskType: TASK_TYPES;

  @ApiProperty({
    description: "The assignee's name.",
    minLength: 2, // Minimum length constraint
    maxLength: 50, // Maximum length constraint
    example: 'John Doe',
  })
  @Expose({ name: 'assignee', toPlainOnly: true })
  @IsString()
  @Length(2, 50, {
    message:
      'Assignee name must be between $constraint1 and $constraint2 characters.',
  })
  assignee: string;

  @ApiProperty({
    description: 'Task Status',
    example: TASK_STATUS_TYPE_ARRAY,
    type: [String],
    default: DEFAULT_TASK_STATUS,
  })
  @Expose({ name: 'taskStatus', toPlainOnly: true })
  @IsEnum(TASK_STATUS_TYPE_ARRAY, {
    message:
      'Invalid task status type. Allowed values: ' +
      TASK_STATUS_TYPE_ARRAY.join(', '),
    context: {
      reason: 'taskStatus',
    },
  })
  status: TASK_STATUS_TYPES;

  @ApiProperty({
    description: 'Task Priority',
    example: TASK_PRIORITY_TYPE_ARRAY,
    type: [String],
    default: DEFAULT_TASK_PRIORITY,
  })
  @Expose({ name: 'taskPriority', toPlainOnly: true })
  @IsEnum(TASK_PRIORITY_TYPE_ARRAY, {
    message:
      'Invalid task priority type. Allowed values: ' +
      TASK_PRIORITY_TYPE_ARRAY.join(', '),
    context: {
      reason: 'taskPriority',
    },
  })
  priority: TASK_PRIORITY_TYPES;

  @ApiProperty({
    description: 'Task Risk',
    example: TASK_RISK_TYPE_ARRAY,
    type: [String],
    default: DEFAULT_TASK_RISK,
  })
  @Expose({ name: 'taskRisk', toPlainOnly: true })
  @IsEnum(TASK_RISK_TYPE_ARRAY, {
    message:
      'Invalid task risk type. Allowed values: ' +
      TASK_RISK_TYPE_ARRAY.join(', '),
    context: {
      reason: 'taskRisk',
    },
  })
  risk: TASK_RISK_TYPES;

  @ApiProperty({
    description: 'Tags associated with the task.',
  })
  @Expose({ name: 'tags', toPlainOnly: true })
  @IsString({ each: true })
  @IsArray()
  tags: string[];

  @ApiProperty({
    description: 'Dates related to the task.',
    type: CommonDateDTO,
  })
  @Expose({ name: 'dates', toPlainOnly: true })
  @ValidateNested({ each: true })
  dates: CommonDateDTO;

  @ApiProperty({
    description: 'Story points of the task.',
  })
  @Expose({ name: 'storyPoint', toPlainOnly: true })
  @IsObject()
  @Type(() => TaskStoryPointsDTO)
  @ValidateNested({ each: true })
  storyPoint: TaskStoryPointsDTO;

  @ApiProperty({
    description: 'Sprints associated with the task.',
    type: () => IdUuidStatusDTO,
    isArray: true,
  })
  @Expose({ name: 'iterations', toPlainOnly: true })
  @IsArray({ message: 'Iterations must be an array' })
  @IsOptional()
  @ValidateNested({ each: true })
  iterations?: IdUuidStatusDTO[];

  @ApiProperty({
    description: 'Relations of the task with other tasks.',
  })
  @Expose({ name: 'relations', toPlainOnly: true })
  @IsObject()
  @IsOptional()
  @ValidateNested({ each: true })
  relations?: TaskRelationsDTO[];
}
