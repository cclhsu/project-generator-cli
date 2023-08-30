import { Answers } from 'inquirer';
import { TASK_UNCERTAINTY_MSG, TaskUncertaintyAnswerDTO } from '../dto';
import { validateDto } from '../../../utils/validation/validation.utils';
import {
  TASK_UNCERTAINTY_TYPES,
  TASK_UNCERTAINTY_TYPE_ARRAY,
} from '../../../common/constant';

export async function validateTaskUncertaintyDTO(
  val: TASK_UNCERTAINTY_TYPES,
): Promise<boolean | string> {
  const dto = new TaskUncertaintyAnswerDTO(val);
  const errorMessage = await validateDto(dto);
  return errorMessage ?? true;
}

export function isValidTaskUncertainty(taskUncertainty: string): boolean {
  return (
    TASK_UNCERTAINTY_TYPE_ARRAY.includes(taskUncertainty) &&
    taskUncertainty !== 'n/a'
  );
}

export function validateTaskUncertainty(
  val: string,
  answers?: Answers,
): boolean | string {
  if (val.trim() !== '' && val.trim() !== 'n/a') {
    if (isValidTaskUncertainty(val)) {
      return true;
    } else {
      return TASK_UNCERTAINTY_MSG.errorMessage;
    }
  } else {
    return TASK_UNCERTAINTY_MSG.requiredMessage;
  }
}
