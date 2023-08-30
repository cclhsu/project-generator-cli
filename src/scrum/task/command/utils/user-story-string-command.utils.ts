import { Logger } from '@nestjs/common';
import { InquirerService } from 'nest-commander';
import { UserStoryStringAnswerDTO } from '../../../../common/command/dto';
import { CREATE_ACTION_TYPE } from '../../../../common/constant';

const logger = new Logger('getUserStoryDTO');

export async function getUserStoryStringDTO(
  inquirer: InquirerService,
  options: Record<string, any> | undefined,
  action: string = CREATE_ACTION_TYPE,
): Promise<string> {
  const userStory = (
    await inquirer.ask<UserStoryStringAnswerDTO>(
      'user-story-string-questions',
      options,
    )
  ).userStoryString;

  logger.verbose(JSON.stringify(userStory));

  return userStory;
}
