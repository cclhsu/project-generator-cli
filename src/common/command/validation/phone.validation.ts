import { Answers } from 'inquirer';
import { PHONE_MSG, PhoneAnswerDTO } from '../dto';
import { validateDto } from '../../../utils/validation/validation.utils';

export async function validatePhoneDTO(val: string): Promise<boolean | string> {
  const dto = new PhoneAnswerDTO(val);
  const errorMessage = await validateDto(dto);
  return errorMessage ?? true;
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = PHONE_MSG.regexp;
  return phoneRegex.test(phone);
}

export function validatePhone(val: string, answers?: Answers): boolean | string {
  if (val.trim() !== '' && val.trim() !== 'n/a') {
    if (isValidPhone(val)) {
      return true;
    } else {
      return PHONE_MSG.errorMessage;
    }
  } else {
    return PHONE_MSG.requiredMessage;
  }
}
