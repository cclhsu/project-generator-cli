import { Answers } from 'inquirer';
import { TASK_PRIORITY_MSG, TaskPriorityAnswerDTO } from '../dto';
import { validateDto } from '../../../utils/validation/validation.utils';
import {
  TASK_PRIORITY_TYPES,
  TASK_PRIORITY_TYPE_ARRAY,
} from '../../../common/constant';

export async function validateTaskPriorityDTO(
  val: TASK_PRIORITY_TYPES,
): Promise<boolean | string> {
  const dto = new TaskPriorityAnswerDTO(val);
  const errorMessage = await validateDto(dto);
  return errorMessage ?? true;
}

export function isValidTaskPriority(taskPriority: string): boolean {
  return TASK_PRIORITY_TYPE_ARRAY.includes(taskPriority) && taskPriority !== 'n/a';
}

export function validateTaskPriority(
  val: string,
  answers?: Answers,
): boolean | string {
  if (val.trim() !== '' && val.trim() !== 'n/a') {
    if (isValidTaskPriority(val)) {
      return true;
    } else {
      return TASK_PRIORITY_MSG.errorMessage;
    }
  } else {
    return TASK_PRIORITY_MSG.requiredMessage;
  }
}
