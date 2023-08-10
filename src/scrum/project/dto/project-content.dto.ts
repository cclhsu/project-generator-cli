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
import { IterationDTO } from '../../iteration/dto/iteration.dto';
import { TaskDTO } from '../../task/dto/task.dto';
import { TeamDTO } from '../../team/dto/team.dto';

export class ProjectContentDTO {
  constructor(
    description: string,
    sprints: IterationDTO[],
    backlog: TaskDTO[],
    iterations: { [ID: string]: IterationDTO },
    team: TeamDTO,
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
  sprints: IterationDTO[]; // Array of Sprints associated with the Scrum Project

  @ApiProperty()
  @Expose({ name: 'backlog', toPlainOnly: true })
  @IsArray()
  backlog: TaskDTO[]; // List of tasks in the project backlog

  @ApiProperty()
  @Expose({ name: 'iterations', toPlainOnly: true })
  @IsObject()
  iterations: {
    [ID: string]: IterationDTO; // Mapping of iid to ISprintBoard for different iterations in the project
  };

  @ApiProperty()
  @Expose({ name: 'team', toPlainOnly: true })
  @IsObject()
  team: TeamDTO; // Scrum Project Team associated with the Scrum Project
}
