import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsObject,
  IsString,
  MinLength,
  isObject,
} from 'class-validator';
import { Expose } from 'class-transformer';
// import { IterationTypes } from '../../enum/iteration.enum';
import { PROJECT_STATUS_TYPES } from '../../common/constant/project-status.constant';
import { TASK_PRIORITY_TYPES } from '../../common/constant/task-priority.constant';
import { TASK_RISK_TYPES } from '../../common/constant/task-risk.constant';
import { CommonDateDTO } from '../../common/dto/common-date.dto';

export class IterationMetadataDTO {
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
    this.ID = ID;
    this.name = name;
    this.status = status;
    this.priority = priority;
    this.risk = risk;
    this.tags = tags;
    this.dates = dates;
    // this.iterationType = iterationType;
    // this.storyPoints = storyPoints;
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
  @Expose({ name: 'status', toPlainOnly: true })
  @IsString()
  status: PROJECT_STATUS_TYPES;

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
  tags: string[];

  @ApiProperty()
  @Expose({ name: 'dates', toPlainOnly: true })
  @IsObject()
  dates: CommonDateDTO;

  // @ApiProperty()
  // @Expose({ name: 'iterationType', toPlainOnly: true })
  // @IsString()
  // iterationType: IterationTypes;

  // @ApiProperty()
  // @Expose({ name: 'storyPoints', toPlainOnly: true })
  // @IsObject()
  // storyPoints: {
  //   total: number;
  //   completed: number;
  //   remaining: number;
  // };
}
