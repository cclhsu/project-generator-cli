import { Logger } from '@nestjs/common';
import { InquirerService } from 'nest-commander';
import { CREATE_ACTION_TYPE } from '../../../../common/constant';
import { TaskDescriptionStringDTO as TaskDescriptionDTO } from '../../dto/description';
import {
  DetailsAnswerDTO,
  SummaryAnswerDTO,
} from '../../../../common/command/dto';
import {
  getAcceptanceCriteriaStringDTO,
  getDefinitionsOfDoneStringDTO,
  getNameUrlDTO,
  getUserStoriesStringDTO,
} from '.';

const logger = new Logger('getTaskDescriptionDTO');

export async function getTaskDescriptionDTO(
  inquirer: InquirerService,
  options: Record<string, any> | undefined,
  action: string = CREATE_ACTION_TYPE,
): Promise<TaskDescriptionDTO> {
  const taskDescriptionDTO: TaskDescriptionDTO = {
    summary: options?.summary ?? '',
    details: options?.details ?? '',
    userStories: options?.userStories ?? '',
    acceptanceCriteria: options?.acceptanceCriteria ?? '',
    definitionOfDone: options?.definitionOfDone ?? '',
    link: options?.link ?? '',
    // ...options,
  };

  while (!taskDescriptionDTO.summary) {
    taskDescriptionDTO.summary = (
      await inquirer.ask<SummaryAnswerDTO>('summary-questions', options)
    ).summary;
  }

  if (!taskDescriptionDTO.details) {
    taskDescriptionDTO.details = (
      await inquirer.ask<DetailsAnswerDTO>('details-questions', options)
    ).details;
  }

  if (!taskDescriptionDTO.userStories) {
    taskDescriptionDTO.userStories = await getUserStoriesStringDTO(
      inquirer,
      options,
    );
  }

  if (!taskDescriptionDTO.acceptanceCriteria) {
    taskDescriptionDTO.acceptanceCriteria =
      await getAcceptanceCriteriaStringDTO(inquirer, options);
  }

  if (!taskDescriptionDTO.definitionOfDone) {
    taskDescriptionDTO.definitionOfDone = await getDefinitionsOfDoneStringDTO(
      inquirer,
      options,
    );
  }

  if (!taskDescriptionDTO.link) {
    taskDescriptionDTO.link = await getNameUrlDTO(inquirer, options, action);
  }

  logger.verbose(JSON.stringify(taskDescriptionDTO));

  return taskDescriptionDTO;
}
