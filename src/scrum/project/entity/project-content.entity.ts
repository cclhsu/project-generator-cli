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
import { IterationEntity } from '../../iteration/entity/iteration.entity';
import { TaskEntity } from '../../task/entity/task.entity';
import { TeamEntity } from '../../team/entity/team.entity';

export class ProjectContentEntity {
  constructor(
    description: string,
    sprints: IterationEntity[],
    backlog: TaskEntity[],
    iterations: { [ID: string]: IterationEntity },
    team: TeamEntity,
  ) {
    this.description = description;
    this.sprints = sprints;
    this.backlog = backlog;
    this.iterations = iterations;
    this.team = team;
  }

  @ApiProperty()
  @Expose({ name: 'description', toPlainOnly: true })
  @IsString()
  description: string; // Description of the Scrum Project

  @ApiProperty()
  @Expose({ name: 'sprints', toPlainOnly: true })
  @IsArray()
  sprints: IterationEntity[]; // Array of Sprints associated with the Scrum Project

  @ApiProperty()
  @Expose({ name: 'backlog', toPlainOnly: true })
  @IsArray()
  backlog: TaskEntity[]; // List of tasks in the project backlog

  @ApiProperty()
  @Expose({ name: 'iterations', toPlainOnly: true })
  @IsObject()
  iterations: {
    [ID: string]: IterationEntity; // Mapping of iid to ISprintBoardMetadata for different iterations in the project
  };

  @ApiProperty()
  @Expose({ name: 'team', toPlainOnly: true })
  @IsObject()
  team: TeamEntity;
}
