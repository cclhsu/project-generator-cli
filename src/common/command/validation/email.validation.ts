import { Answers } from 'inquirer';
import { EMAIL_MSG, EmailAnswerDTO } from '../dto';
import { validateDto } from '../../../utils/validation/validation.utils';

export async function validateEmailDTO(val: string): Promise<boolean | string> {
  const dto = new EmailAnswerDTO(val);
  const errorMessage = await validateDto(dto);
  return errorMessage ?? true;
}

export function isValidEmail(email: string): boolean {
  const emailRegex = EMAIL_MSG.regexp;
  return emailRegex.test(email);
}

export function validateEmail(val: string, answers?: Answers): boolean | string {
  if (val.trim() !== '' && val.trim() !== 'n/a') {
    if (isValidEmail(val)) {
      return true;
    } else {
      return EMAIL_MSG.errorMessage;
    }
  } else {
    return EMAIL_MSG.requiredMessage;
  }
}
