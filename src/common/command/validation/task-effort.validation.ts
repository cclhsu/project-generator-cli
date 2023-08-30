import { Answers } from 'inquirer';
import { TASK_EFFORT_MSG, TaskEffortAnswerDTO } from '../dto';
import { validateDto } from '../../../utils/validation/validation.utils';
import {
  TASK_EFFORT_TYPES,
  TASK_EFFORT_TYPE_ARRAY,
} from '../../../common/constant';

export async function validateTaskEffortDTO(
  val: TASK_EFFORT_TYPES,
): Promise<boolean | string> {
  const dto = new TaskEffortAnswerDTO(val);
  const errorMessage = await validateDto(dto);
  return errorMessage ?? true;
}

export function isValidTaskEffort(taskEffort: string): boolean {
  return TASK_EFFORT_TYPE_ARRAY.includes(taskEffort) && taskEffort !== 'n/a';
}

export function validateTaskEffort(
  val: string,
  answers?: Answers,
): boolean | string {
  if (val.trim() !== '' && val.trim() !== 'n/a') {
    if (isValidTaskEffort(val)) {
      return true;
    } else {
      return TASK_EFFORT_MSG.errorMessage;
    }
  } else {
    return TASK_EFFORT_MSG.requiredMessage;
  }
}
