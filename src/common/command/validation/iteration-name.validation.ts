import { Answers } from 'inquirer';
import { ITERATION_NAME_MSG, IterationNameAnswerDTO } from '../dto';
import { validateDto } from '../../../utils/validation/validation.utils';

export async function validateIterationNameDTO(
  val: string,
): Promise<boolean | string> {
  const dto = new IterationNameAnswerDTO(val);
  const errorMessage = await validateDto(dto);
  return errorMessage ?? true;
}

export function isValidIterationName(iterationName: string): boolean {
  const iterationNameRegex = ITERATION_NAME_MSG.regexp;
  return iterationNameRegex.test(iterationName);
}

export function validateIterationName(
  val: string,
  answers?: Answers,
): boolean | string {
  if (val.trim() !== '' && val.trim() !== 'n/a') {
    if (isValidIterationName(val)) {
      return true;
    } else {
      return ITERATION_NAME_MSG.errorMessage;
    }
  } else {
    return ITERATION_NAME_MSG.requiredMessage;
  }
}
