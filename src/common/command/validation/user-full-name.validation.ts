import { Answers } from 'inquirer';
import { USER_FULL_NAME_MSG, UserFullNameAnswerDTO } from '../dto';
import { validateDto } from '../../../utils/validation/validation.utils';

export async function validateUserFullNameDTO(
  val: string,
): Promise<boolean | string> {
  const dto = new UserFullNameAnswerDTO(val);
  const errorMessage = await validateDto(dto);
  return errorMessage ?? true;
}

export function isValidUserFullName(userFullName: string): boolean {
  const userFullNameRegex = USER_FULL_NAME_MSG.regexp;
  return userFullNameRegex.test(userFullName);
}

export function validateUserFullName(
  val: string,
  answers?: Answers,
): boolean | string {
  if (val.trim() !== '' && val.trim() !== 'n/a') {
    if (isValidUserFullName(val)) {
      return true;
    } else {
      return USER_FULL_NAME_MSG.errorMessage;
    }
  } else {
    return USER_FULL_NAME_MSG.requiredMessage;
  }
}
