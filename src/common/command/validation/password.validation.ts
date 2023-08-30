import { Answers } from 'inquirer';
import { PASSWORD_MSG, PasswordAnswerDTO } from '../dto';
import { validateDto } from '../../../utils/validation/validation.utils';

export async function validatePasswordDTO(
  val: string,
): Promise<boolean | string> {
  const dto = new PasswordAnswerDTO(val);
  const errorMessage = await validateDto(dto);
  return errorMessage ?? true;
}

export function isValidPassword(password: string): boolean {
  const passwordRegex = PASSWORD_MSG.regexp;
  return passwordRegex.test(password);
}

export function validatePassword(
  val: string,
  answers?: Answers,
): boolean | string {
  if (val.trim() !== '' && val.trim() !== 'n/a') {
    if (isValidPassword(val)) {
      return true;
    } else {
      return PASSWORD_MSG.errorMessage;
    }
  } else {
    return PASSWORD_MSG.requiredMessage;
  }
}
