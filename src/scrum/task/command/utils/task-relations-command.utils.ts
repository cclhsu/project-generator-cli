import { Logger } from '@nestjs/common';
import { InquirerService } from 'nest-commander';
import { CREATE_ACTION_TYPE } from '../../../../common/constant';
import { TaskRelationsDTO } from '../../dto/relation';
import { IdUuidStatusDTO } from '../../../../common/dto';

const logger = new Logger('getTaskRelationsDTO');

export async function getTaskRelationsDTO(
  inquirer: InquirerService,
  options: Record<string, any> | undefined,
  action: string = CREATE_ACTION_TYPE,
): Promise<TaskRelationsDTO> {
  const taskRelationsDTO: TaskRelationsDTO = {
    parent: options?.parent ?? '',
    subtasks: options?.subtasks ?? [],
    predecessors: options?.predecessors ?? [],
    successors: options?.successors ?? [],
    relatedTasks: options?.relatedTasks ?? [],
    blockedTasks: options?.blockedTasks ?? [],
    // ...options,
  };

  while (!taskRelationsDTO.parent) {
    taskRelationsDTO.parent = (
      await inquirer.ask<{ parent: string }>('task-parent-questions', options)
    ).parent;
  }

  while (!taskRelationsDTO.subtasks) {
    taskRelationsDTO.subtasks = (
      await inquirer.ask<{ subtasks: IdUuidStatusDTO[] }>(
        'task-subtasks-questions',
        options,
      )
    ).subtasks;

    // if (taskRelationsDTO.subtasks.length === 0) {
    //   taskRelationsDTO.subtasks = undefined;
    // }
  }

  while (!taskRelationsDTO.predecessors) {
    taskRelationsDTO.predecessors = (
      await inquirer.ask<{ predecessors: IdUuidStatusDTO[] }>(
        'task-predecessors-questions',
        options,
      )
    ).predecessors;

    // if (taskRelationsDTO.predecessors.length === 0) {
    //   taskRelationsDTO.predecessors = undefined;
    // }
  }

  while (!taskRelationsDTO.successors) {
    taskRelationsDTO.successors = (
      await inquirer.ask<{ successors: IdUuidStatusDTO[] }>(
        'task-successors-questions',
        options,
      )
    ).successors;

    // if (taskRelationsDTO.successors.length === 0) {
    //   taskRelationsDTO.successors = undefined;
    // }
  }

  while (!taskRelationsDTO.relatedTasks) {
    taskRelationsDTO.relatedTasks = (
      await inquirer.ask<{ relatedTasks: IdUuidStatusDTO[] }>(
        'task-related-tasks-questions',
        options,
      )
    ).relatedTasks;

    // if (taskRelationsDTO.relatedTasks.length === 0) {
    //   taskRelationsDTO.relatedTasks = undefined;
    // }
  }

  while (!taskRelationsDTO.blockedTasks) {
    taskRelationsDTO.blockedTasks = (
      await inquirer.ask<{ blockedTasks: IdUuidStatusDTO[] }>(
        'task-blocked-tasks-questions',
        options,
      )
    ).blockedTasks;

    // if (taskRelationsDTO.blockedTasks.length === 0) {
    //   taskRelationsDTO.blockedTasks = undefined;
    // }
  }

  logger.verbose(JSON.stringify(taskRelationsDTO));

  return taskRelationsDTO;
}
