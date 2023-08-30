import { Answers } from 'inquirer';
import { USER_FIRST_NAME_MSG, UserFirstNameAnswerDTO } from '../dto';
import { validateDto } from '../../../utils/validation/validation.utils';

export async function validateUserFirstNameDTO(
  val: string,
): Promise<boolean | string> {
  const dto = new UserFirstNameAnswerDTO(val);
  const errorMessage = await validateDto(dto);
  return errorMessage ?? true;
}

export function isValidUserFirstName(userFirstName: string): boolean {
  const userFirstNameRegex = USER_FIRST_NAME_MSG.regexp;
  return userFirstNameRegex.test(userFirstName);
}

export function validateUserFirstName(
  val: string,
  answers?: Answers,
): boolean | string {
  if (val.trim() !== '' && val.trim() !== 'n/a') {
    if (isValidUserFirstName(val)) {
      return true;
    } else {
      return USER_FIRST_NAME_MSG.errorMessage;
    }
  } else {
    return USER_FIRST_NAME_MSG.requiredMessage;
  }
}
