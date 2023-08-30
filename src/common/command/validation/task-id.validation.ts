import { Answers } from 'inquirer';
import { TASK_ID_MSG, TaskIdAnswerDTO } from '../dto';
import { validateDto } from '../../../utils/validation/validation.utils';

export async function validateTaskIdDTO(
  val: string,
): Promise<boolean | string> {
  const dto = new TaskIdAnswerDTO(val);
  const errorMessage = await validateDto(dto);
  return errorMessage ?? true;
}

export function isValidTaskId(taskId: string): boolean {
  const taskIdRegex = TASK_ID_MSG.regexp;
  return taskIdRegex.test(taskId);
}

export function validateTaskId(
  val: string,
  answers?: Answers,
): boolean | string {
  if (val.trim() !== '' && val.trim() !== 'n/a') {
    if (isValidTaskId(val)) {
      return true;
    } else {
      return TASK_ID_MSG.errorMessage;
    }
  } else {
    return TASK_ID_MSG.requiredMessage;
  }
}
