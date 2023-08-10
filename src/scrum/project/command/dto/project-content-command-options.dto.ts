import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { ProjectContentDTO } from '../../dto/project-content.dto';
import { IterationDTO } from '../../../iteration/dto/iteration.dto';
import { TaskDTO } from '../../../task/dto/task.dto';
import { TeamDTO } from '../../../team/dto/team.dto';
// import { Transform, Type } from 'class-transformer';

export class ProjectContentCommandOptionsDTO extends ProjectContentDTO {
  constructor(
    description: string,
    sprints: IterationDTO[],
    backlog: TaskDTO[],
    iterations: { [ID: string]: IterationDTO },
    team: TeamDTO,
  ) {
    super(description, sprints, backlog, iterations, team);
  }
}
