import { Answers } from 'inquirer';
import { USER_ID_MSG, UserIdAnswerDTO } from '../dto';
import { validateDto } from '../../../utils/validation/validation.utils';

export async function validateUserIdDTO(
  val: string,
): Promise<boolean | string> {
  const dto = new UserIdAnswerDTO(val);
  const errorMessage = await validateDto(dto);
  return errorMessage ?? true;
}

export function isValidUserId(userId: string): boolean {
  const userIdRegex = USER_ID_MSG.regexp;
  return userIdRegex.test(userId);
}

export function validateUserId(
  val: string,
  answers?: Answers,
): boolean | string {
  if (val.trim() !== '' && val.trim() !== 'n/a') {
    if (isValidUserId(val)) {
      return true;
    } else {
      return USER_ID_MSG.errorMessage;
    }
  } else {
    return USER_ID_MSG.requiredMessage;
  }
}

export function isValidUserIds(userIds: string[]): boolean {
  return userIds.every((userId) => isValidUserId(userId));
}

export function validateUserIdBy(
  val: string | undefined,
  answers?: Answers,
  undefinedAllowed = false,
): boolean | string {
  if (!val && !undefinedAllowed) {
    return USER_ID_MSG.requiredMessage;
  } else if (!val && undefinedAllowed) {
    return true;
  }

  if (val && val.trim() !== 'n/a') {
    if (isValidUserId(val)) {
      return true;
    } else {
      return USER_ID_MSG.errorMessage;
    }
  } else {
    return USER_ID_MSG.requiredMessage;
  }
}

export function validateCreatedBy(
  val: string,
  answers?: Answers,
): boolean | string {
  return validateUserIdBy(val, answers);
}

export function validateStartedBy(
  val: string,
  answers?: Answers,
): boolean | string {
  return validateUserIdBy(val, answers, true);
}

export function validateUpdatedBy(
  val: string,
  answers?: Answers,
): boolean | string {
  return validateUserIdBy(val, answers);
}

export function validateCompletedBy(
  val: string,
  answers?: Answers,
): boolean | string {
  return validateUserIdBy(val, answers, true);
}
