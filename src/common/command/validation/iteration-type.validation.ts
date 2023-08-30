import { Answers } from 'inquirer';
import { ITERATION_TYPE_MSG, IterationTypeAnswerDTO } from '../dto';
import { validateDto } from '../../../utils/validation/validation.utils';
import { ITERATION_TYPES, ITERATION_TYPE_ARRAY } from '../../../common/constant';

export async function validateIterationTypeDTO(
  val: ITERATION_TYPES,
): Promise<boolean | string> {
  const dto = new IterationTypeAnswerDTO(val);
  const errorMessage = await validateDto(dto);
  return errorMessage ?? true;
}

export function isValidIterationType(iterationType: string): boolean {
  return ITERATION_TYPE_ARRAY.includes(iterationType) && iterationType !== 'n/a';
}

export function validateIterationType(
  val: string,
  answers?: Answers,
): boolean | string {
  if (val.trim() !== '' && val.trim() !== 'n/a') {
    if (isValidIterationType(val)) {
      return true;
    } else {
      return ITERATION_TYPE_MSG.errorMessage;
    }
  } else {
    return ITERATION_TYPE_MSG.requiredMessage;
  }
}
