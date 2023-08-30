import { Answers } from 'inquirer';
import { ID_MSG, IdAnswerDTO } from '../dto';
import { validateDto } from '../../../utils/validation/validation.utils';

export async function validateIdDTO(val: string): Promise<boolean | string> {
  const dto = new IdAnswerDTO(val);
  const errorMessage = await validateDto(dto);
  return errorMessage ?? true;
}

export function isValidID(ID: string): boolean {
  const IDRegex = ID_MSG.regexp;
  return IDRegex.test(ID);
}

export function validateId(val: string, answers?: Answers): boolean | string {
  if (val.trim() !== '' && val.trim() !== 'n/a') {
    if (isValidID(val)) {
      return true;
    } else {
      return ID_MSG.errorMessage;
    }
  } else {
    return ID_MSG.requiredMessage;
  }
}

export function isValidIDs(IDs: string[]): boolean {
  return IDs.every((ID) => isValidID(ID));
}
