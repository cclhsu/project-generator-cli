import { Answers } from 'inquirer';
import { TASK_COMPLEXITY_MSG, TaskComplexityAnswerDTO } from '../dto';
import { validateDto } from '../../../utils/validation/validation.utils';
import {
  TASK_COMPLEXITY_TYPES,
  TASK_COMPLEXITY_TYPE_ARRAY,
} from '../../../common/constant';

export async function validateTaskComplexityDTO(
  val: TASK_COMPLEXITY_TYPES,
): Promise<boolean | string> {
  const dto = new TaskComplexityAnswerDTO(val);
  const errorMessage = await validateDto(dto);
  return errorMessage ?? true;
}

export function isValidTaskComplexity(taskComplexity: string): boolean {
  return (
    TASK_COMPLEXITY_TYPE_ARRAY.includes(taskComplexity) &&
    taskComplexity !== 'n/a'
  );
}

export function validateTaskComplexity(
  val: string,
  answers?: Answers,
): boolean | string {
  if (val.trim() !== '' && val.trim() !== 'n/a') {
    if (isValidTaskComplexity(val)) {
      return true;
    } else {
      return TASK_COMPLEXITY_MSG.errorMessage;
    }
  } else {
    return TASK_COMPLEXITY_MSG.requiredMessage;
  }
}
