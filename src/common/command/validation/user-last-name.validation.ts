import { Answers } from 'inquirer';
import { USER_LAST_NAME_MSG, UserLastNameAnswerDTO } from '../dto';
import { validateDto } from '../../../utils/validation/validation.utils';

export async function validateUserLastNameDTO(
  val: string,
): Promise<boolean | string> {
  const dto = new UserLastNameAnswerDTO(val);
  const errorMessage = await validateDto(dto);
  return errorMessage ?? true;
}

export function isValidUserLastName(userLastName: string): boolean {
  const userLastNameRegex = USER_LAST_NAME_MSG.regexp;
  return userLastNameRegex.test(userLastName);
}

export function validateUserLastName(
  val: string,
  answers?: Answers,
): boolean | string {
  if (val.trim() !== '' && val.trim() !== 'n/a') {
    if (isValidUserLastName(val)) {
      return true;
    } else {
      return USER_LAST_NAME_MSG.errorMessage;
    }
  } else {
    return USER_LAST_NAME_MSG.requiredMessage;
  }
}
