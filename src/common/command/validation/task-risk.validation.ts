import { Answers } from 'inquirer';
import { TASK_RISK_MSG, TaskRiskAnswerDTO } from '../dto';
import { validateDto } from '../../../utils/validation/validation.utils';
import {
  TASK_RISK_TYPES,
  TASK_RISK_TYPE_ARRAY,
} from '../../../common/constant';

export async function validateTaskRiskDTO(
  val: TASK_RISK_TYPES,
): Promise<boolean | string> {
  const dto = new TaskRiskAnswerDTO(val);
  const errorMessage = await validateDto(dto);
  return errorMessage ?? true;
}

export function isValidTaskRisk(taskRisk: string): boolean {
  return TASK_RISK_TYPE_ARRAY.includes(taskRisk) && taskRisk !== 'n/a';
}

export function validateTaskRisk(
  val: string,
  answers?: Answers,
): boolean | string {
  if (val.trim() !== '' && val.trim() !== 'n/a') {
    if (isValidTaskRisk(val)) {
      return true;
    } else {
      return TASK_RISK_MSG.errorMessage;
    }
  } else {
    return TASK_RISK_MSG.requiredMessage;
  }
}
