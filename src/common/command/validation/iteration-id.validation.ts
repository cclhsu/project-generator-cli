import { Answers } from 'inquirer';
import { ITERATION_ID_MSG, IterationIdAnswerDTO } from '../dto';
import { validateDto } from '../../../utils/validation/validation.utils';

export async function validateIterationIdDTO(
  val: string,
): Promise<boolean | string> {
  const dto = new IterationIdAnswerDTO(val);
  const errorMessage = await validateDto(dto);
  return errorMessage ?? true;
}

export function isValidIterationId(iterationId: string): boolean {
  const iterationIdRegex = ITERATION_ID_MSG.regexp;
  return iterationIdRegex.test(iterationId);
}

export function validateIterationId(
  val: string,
  answers?: Answers,
): boolean | string {
  if (val.trim() !== '' && val.trim() !== 'n/a') {
    if (isValidIterationId(val)) {
      return true;
    } else {
      return ITERATION_ID_MSG.errorMessage;
    }
  } else {
    return ITERATION_ID_MSG.requiredMessage;
  }
}
