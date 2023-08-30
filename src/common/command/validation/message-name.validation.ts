import { Answers } from 'inquirer';
import { MESSAGE_NAME_MSG, MessageNameAnswerDTO } from '../dto';
import { validateDto } from '../../../utils/validation/validation.utils';

export async function validateMessageNameDTO(
  val: string,
): Promise<boolean | string> {
  const dto = new MessageNameAnswerDTO(val);
  const errorMessage = await validateDto(dto);
  return errorMessage ?? true;
}

export function isValidMessageName(messageName: string): boolean {
  const messageNameRegex = MESSAGE_NAME_MSG.regexp;
  return messageNameRegex.test(messageName);
}

export function validateMessageName(
  val: string,
  answers?: Answers,
): boolean | string {
  if (val.trim() !== '' && val.trim() !== 'n/a') {
    if (isValidMessageName(val)) {
      return true;
    } else {
      return MESSAGE_NAME_MSG.errorMessage;
    }
  } else {
    return MESSAGE_NAME_MSG.requiredMessage;
  }
}
