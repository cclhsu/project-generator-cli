import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { TaskMetadataDTO } from 'src/scrum/task/dto/task-metadata.dto';
import { IterationInfoDTO } from 'src/scrum/iteration/dto/iteration-info.dto';
import { TaskRelationsDTO } from 'src/scrum/task/dto/task-relations.dto';
import { TaskStoryPointsDTO } from 'src/scrum/task/dto/task-story-points.dto';
import {
  TASK_TYPES,
  TASK_STATUS_TYPES,
  TASK_PRIORITY_TYPES,
  TASK_RISK_TYPES,
} from '../../../common/constant';
import { CommonDateDTO } from '../../../common/dto/common-date.dto';
// import { Transform, Type } from 'class-transformer';

export class TaskMetadataCommandOptionsDTO extends TaskMetadataDTO {
  constructor(
    ID: string,
    name: string,
    taskType: TASK_TYPES,
    assignee: string,
    status: TASK_STATUS_TYPES,
    priority: TASK_PRIORITY_TYPES,
    risk: TASK_RISK_TYPES,
    tags: string[],
    dates: CommonDateDTO,
    storyPoint: TaskStoryPointsDTO,
    sprints: IterationInfoDTO[],
    relations: TaskRelationsDTO[],
  ) {
    super(
      ID,
      name,
      taskType,
      assignee,
      status,
      priority,
      risk,
      tags,
      dates,
      storyPoint,
      sprints,
      relations,
    );
  }
}
