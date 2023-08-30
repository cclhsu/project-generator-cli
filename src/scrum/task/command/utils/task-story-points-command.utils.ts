import { Logger } from '@nestjs/common';
import { InquirerService } from 'nest-commander';
// import { ConfigService } from '../../../../config/config.service';
import {
  CREATE_ACTION_TYPE,
  DEFAULT_STORY_POINTS_CALCULATION_METHOD,
  DEFAULT_TASK_COMPLEXITY,
  DEFAULT_TASK_DEPENDENCY,
  DEFAULT_TASK_EFFORT,
  DEFAULT_TASK_UNCERTAINTY,
  UPDATE_ACTION_TYPE,
} from '../../../../common/constant';
import { TaskStoryPointsDTO } from '../../dto/story-points';
import { calculateTaskStoryPoints } from '../../utils/story-points-calculation.utils';
import {
  TaskComplexityAnswerDTO,
  TaskDependencyAnswerDTO,
  TaskEffortAnswerDTO,
  TaskUncertaintyAnswerDTO,
} from '../../../../common/command/dto';

const logger = new Logger('getTaskStoryPointsDTO');

export async function getTaskStoryPointsDTO(
  // configService: ConfigService,
  inquirer: InquirerService,
  options: Record<string, any> | undefined,
  action: string = CREATE_ACTION_TYPE,
): Promise<TaskStoryPointsDTO> {
  const taskStoryPointsDTO: TaskStoryPointsDTO = {
    complexity: options?.complexity ?? DEFAULT_TASK_COMPLEXITY,
    uncertainty: options?.uncertainty ?? DEFAULT_TASK_UNCERTAINTY,
    dependency: options?.dependency ?? DEFAULT_TASK_DEPENDENCY,
    effort: options?.effort ?? DEFAULT_TASK_EFFORT,
    total: options?.total ?? 0,
    // ...options,
  };

  if (taskStoryPointsDTO.total === 0 || action === UPDATE_ACTION_TYPE) {
    taskStoryPointsDTO.complexity = (
      await inquirer.ask<TaskComplexityAnswerDTO>(
        'task-complexity-questions',
        options,
      )
    ).taskComplexity;
  }

  if (taskStoryPointsDTO.total === 0 || action === UPDATE_ACTION_TYPE) {
    taskStoryPointsDTO.uncertainty = (
      await inquirer.ask<TaskUncertaintyAnswerDTO>(
        'task-uncertainty-questions',
        options,
      )
    ).taskUncertainty;
  }

  if (taskStoryPointsDTO.total === 0 || action === UPDATE_ACTION_TYPE) {
    taskStoryPointsDTO.dependency = (
      await inquirer.ask<TaskDependencyAnswerDTO>(
        'task-dependency-questions',
        options,
      )
    ).taskDependency;
  }

  if (taskStoryPointsDTO.total === 0 || action === UPDATE_ACTION_TYPE) {
    taskStoryPointsDTO.effort = (
      await inquirer.ask<TaskEffortAnswerDTO>('task-effort-questions', options)
    ).taskEffort;
  }

  taskStoryPointsDTO.total = calculateTaskStoryPoints(
    taskStoryPointsDTO.complexity,
    taskStoryPointsDTO.uncertainty,
    taskStoryPointsDTO.dependency,
    taskStoryPointsDTO.effort,
    DEFAULT_STORY_POINTS_CALCULATION_METHOD,
  );

  logger.verbose(JSON.stringify(taskStoryPointsDTO));

  return taskStoryPointsDTO;
}
