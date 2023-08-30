import { Answers } from 'inquirer';
import { TASK_NAME_MSG, TaskNameAnswerDTO } from '../dto';
import { validateDto } from '../../../utils/validation/validation.utils';

export async function validateTaskNameDTO(
  val: string,
): Promise<boolean | string> {
  const dto = new TaskNameAnswerDTO(val);
  const errorMessage = await validateDto(dto);
  return errorMessage ?? true;
}

export function isValidTaskName(taskName: string): boolean {
  const taskNameRegex = TASK_NAME_MSG.regexp;
  return taskNameRegex.test(taskName);
}

export function validateTaskName(
  val: string,
  answers?: Answers,
): boolean | string {
  if (val.trim() !== '' && val.trim() !== 'n/a') {
    if (isValidTaskName(val)) {
      return true;
    } else {
      return TASK_NAME_MSG.errorMessage;
    }
  } else {
    return TASK_NAME_MSG.requiredMessage;
  }
}
