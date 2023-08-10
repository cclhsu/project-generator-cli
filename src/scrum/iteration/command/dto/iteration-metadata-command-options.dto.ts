import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IterationMetadataDTO } from '../../dto/iteration-metadata.dto';
import {
  PROJECT_STATUS_TYPES,
  TASK_PRIORITY_TYPES,
  TASK_RISK_TYPES,
} from '../../../common/constant';
import { CommonDateDTO } from '../../../common/dto/common-date.dto';
// import { Transform, Type } from 'class-transformer';

export class IterationMetadataCommandOptionsDTO extends IterationMetadataDTO {
  constructor(
    ID: string,
    name: string,
    status: PROJECT_STATUS_TYPES,
    priority: TASK_PRIORITY_TYPES,
    risk: TASK_RISK_TYPES,
    tags: string[],
    dates: CommonDateDTO,
    // iterationType: IterationTypes,
    // storyPoints: {
    //   total: number;
    //   completed: number;
    //   remaining: number;
    // },
  ) {
    super(ID, name, status, priority, risk, tags, dates);
  }
}
