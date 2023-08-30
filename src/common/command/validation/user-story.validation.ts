// import { Logger } from '@nestjs/common';
import { Answers } from 'inquirer';
import { USER_STORY_MSG, UserStoryStringAnswerDTO } from '../dto';
import { validateDto } from '../../../utils/validation/validation.utils';

// const logger = new Logger('validateUserStoryDTO');

export async function validateUserStoryDTO(
  val: string,
): Promise<boolean | string> {
  // logger.verbose(`val: ${val}`);
  const dto = new UserStoryStringAnswerDTO(val);
  const errorMessage = await validateDto(dto);
  // logger.verbose(`errorMessage: ${errorMessage}`);
  return errorMessage ?? true;
}

export function isValidUserStory(userStory: string): boolean {
  const userStoryRegex = USER_STORY_MSG.regexp;
  return userStoryRegex.test(userStory);
}

export function validateUserStory(
  val: string,
  answers?: Answers,
): boolean | string {
  if (val.trim() !== '' && val.trim() !== 'n/a') {
    if (isValidUserStory(val)) {
      return true;
    } else {
      return USER_STORY_MSG.errorMessage;
    }
  } else {
    return USER_STORY_MSG.requiredMessage;
  }
}
