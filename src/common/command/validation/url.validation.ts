import { Answers } from 'inquirer';
import { URL_MSG, UrlAnswerDTO } from '../dto';
import { validateDto } from '../../../utils/validation/validation.utils';

export async function validateUrlDTO(val: string): Promise<boolean | string> {
  const dto = new UrlAnswerDTO(val);
  const errorMessage = await validateDto(dto);
  return errorMessage ?? true;
}

export function isValidUrl(url: string): boolean {
  const urlRegex = URL_MSG.regexp;
  return urlRegex.test(url);
}

export function validateUrl(val: string, answers?: Answers): boolean | string {
  if (val.trim() !== '' && val.trim() !== 'n/a') {
    if (isValidUrl(val)) {
      return true;
    } else {
      return URL_MSG.errorMessage;
    }
  } else {
    return URL_MSG.requiredMessage;
  }
}
