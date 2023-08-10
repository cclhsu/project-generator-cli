import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsEmail,
  IsObject,
  IsString,
  MinLength,
  isObject,
} from 'class-validator';
import { Expose } from 'class-transformer';
import { TASK_PRIORITY_TYPES } from '../../common/constant/task-priority.constant';
import { TASK_RISK_TYPES } from '../../common/constant/task-risk.constant';
import { TASK_STATUS_TYPES } from '../../common/constant/task-status.constant';
import { CommonDateEntity } from '../../common/entity/common-date.entity';
import { IterationInfoEntity } from '../../iteration/entity/iteration-info.entity';
import { TaskRelationsEntity } from './task-relations.entity';
import { TaskStoryPointsEntity } from './task-story-points.entity';
import { TASK_TYPES } from '../../common/constant/task-types.constant';

export class TaskMetadataEntity {
  constructor(
    ID: string,
    name: string,
    taskType: TASK_TYPES,
    assignee: string,
    status: TASK_STATUS_TYPES,
    priority: TASK_PRIORITY_TYPES,
    risk: TASK_RISK_TYPES,
    tags: string[],
    dates: CommonDateEntity,
    storyPoint: TaskStoryPointsEntity,
    sprints: IterationInfoEntity[],
    relations: TaskRelationsEntity[],
  ) {
    this.ID = ID;
    this.name = name;
    this.taskType = taskType;
    this.assignee = assignee;
    this.status = status;
    this.priority = priority;
    this.risk = risk;
    this.tags = tags;
    this.dates = dates;
    this.storyPoint = storyPoint;
    this.sprints = sprints;
    this.relations = relations;
  }

  @ApiProperty()
  @Expose({ name: 'ID', toPlainOnly: true })
  @IsString()
  ID: string;

  @ApiProperty()
  @Expose({ name: 'name', toPlainOnly: true })
  @IsString()
  name: string;

  @ApiProperty()
  @Expose({ name: 'taskType', toPlainOnly: true })
  @IsString()
  taskType: TASK_TYPES;

  @ApiProperty()
  @Expose({ name: 'assignee', toPlainOnly: true })
  @IsString()
  assignee: string;

  @ApiProperty()
  @Expose({ name: 'status', toPlainOnly: true })
  @IsString()
  status: TASK_STATUS_TYPES;

  @ApiProperty()
  @Expose({ name: 'priority', toPlainOnly: true })
  @IsString()
  priority: TASK_PRIORITY_TYPES;

  @ApiProperty()
  @Expose({ name: 'risk', toPlainOnly: true })
  @IsString()
  risk: TASK_RISK_TYPES;

  @ApiProperty()
  @Expose({ name: 'tags', toPlainOnly: true })
  @IsString({ each: true })
  @IsArray()
  tags: string[];

  @ApiProperty()
  @Expose({ name: 'dates', toPlainOnly: true })
  @IsObject()
  dates: CommonDateEntity;

  @ApiProperty()
  @Expose({ name: 'storyPoint', toPlainOnly: true })
  @IsObject()
  storyPoint: TaskStoryPointsEntity;

  @ApiProperty()
  @Expose({ name: 'sprints', toPlainOnly: true })
  @IsArray()
  sprints?: IterationInfoEntity[];

  @ApiProperty()
  @Expose({ name: 'relations', toPlainOnly: true })
  @IsObject()
  relations?: TaskRelationsEntity[];
}
