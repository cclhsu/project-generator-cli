import { Answers } from 'inquirer';
import { TASK_DEPENDENCY_MSG, TaskDependencyAnswerDTO } from '../dto';
import { validateDto } from '../../../utils/validation/validation.utils';
import {
  TASK_DEPENDENCY_TYPES,
  TASK_DEPENDENCY_TYPE_ARRAY,
} from '../../../common/constant';

export async function validateTaskDependencyDTO(
  val: TASK_DEPENDENCY_TYPES,
): Promise<boolean | string> {
  const dto = new TaskDependencyAnswerDTO(val);
  const errorMessage = await validateDto(dto);
  return errorMessage ?? true;
}

export function isValidTaskDependency(taskDependency: string): boolean {
  return (
    TASK_DEPENDENCY_TYPE_ARRAY.includes(taskDependency) &&
    taskDependency !== 'n/a'
  );
}

export function validateTaskDependency(
  val: string,
  answers?: Answers,
): boolean | string {
  if (val.trim() !== '' && val.trim() !== 'n/a') {
    if (isValidTaskDependency(val)) {
      return true;
    } else {
      return TASK_DEPENDENCY_MSG.errorMessage;
    }
  } else {
    return TASK_DEPENDENCY_MSG.requiredMessage;
  }
}
