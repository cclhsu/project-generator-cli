import { Answers } from 'inquirer';
import { TASK_TYPE_MSG, TaskTypeAnswerDTO } from '../dto';
import { validateDto } from '../../../utils/validation/validation.utils';
import { TASK_TYPES, TASK_TYPE_ARRAY } from '../../../common/constant';

export async function validateTaskTypeDTO(
  val: TASK_TYPES,
): Promise<boolean | string> {
  const dto = new TaskTypeAnswerDTO(val);
  const errorMessage = await validateDto(dto);
  return errorMessage ?? true;
}

export function isValidTaskType(taskType: string): boolean {
  return TASK_TYPE_ARRAY.includes(taskType) && taskType !== 'n/a';
}

export function validateTaskType(
  val: string,
  answers?: Answers,
): boolean | string {
  if (val.trim() !== '' && val.trim() !== 'n/a') {
    if (isValidTaskType(val)) {
      return true;
    } else {
      return TASK_TYPE_MSG.errorMessage;
    }
  } else {
    return TASK_TYPE_MSG.requiredMessage;
  }
}
