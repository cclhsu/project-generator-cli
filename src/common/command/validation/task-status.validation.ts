import { Answers } from 'inquirer';
import { TASK_STATUS_MSG, TaskStatusAnswerDTO } from '../dto';
import { validateDto } from '../../../utils/validation/validation.utils';
import {
  TASK_STATUS_TYPES,
  TASK_STATUS_TYPE_ARRAY,
} from '../../../common/constant';

export async function validateTaskStatusDTO(
  val: TASK_STATUS_TYPES,
): Promise<boolean | string> {
  const dto = new TaskStatusAnswerDTO(val);
  const errorMessage = await validateDto(dto);
  return errorMessage ?? true;
}

export function isValidTaskStatus(taskStatus: string): boolean {
  return TASK_STATUS_TYPE_ARRAY.includes(taskStatus) && taskStatus !== 'n/a';
}

export function validateTaskStatus(
  val: string,
  answers?: Answers,
): boolean | string {
  if (val.trim() !== '' && val.trim() !== 'n/a') {
    if (isValidTaskStatus(val)) {
      return true;
    } else {
      return TASK_STATUS_MSG.errorMessage;
    }
  } else {
    return TASK_STATUS_MSG.requiredMessage;
  }
}
