/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Logger } from '@nestjs/common';
import { InquirerService } from 'nest-commander';
import { CREATE_ACTION_TYPE } from '../../../../common/constant';
import { getUserStoryStringDTO } from './user-story-string-command.utils';
import { MoreUserStoryAnswerDTO } from '../../../../common/command/dto';

const logger = new Logger('getUserStoriesStringDTO');

export async function getUserStoriesStringDTO(
  inquirer: InquirerService,
  options: Record<string, any> | undefined,
  action: string = CREATE_ACTION_TYPE,
): Promise<string[]> {
  const userStories: string[] = options?.userStories ?? [];

  let moreUserStory: boolean = false;
  do {
    moreUserStory = (
      await inquirer.ask<MoreUserStoryAnswerDTO>(
        'more-user-story-questions',
        options,
      )
    ).moreUserStory;

    if (moreUserStory) {
      const userStory: string = await getUserStoryStringDTO(
        inquirer,
        options,
        action,
      );
      userStories.push(userStory);
    }
  } while (moreUserStory);

  logger.verbose(JSON.stringify(userStories));

  return userStories;
}
