import { Answers } from 'inquirer';
import { PROJECT_STATUS_MSG, ProjectStatusAnswerDTO } from '../dto';
import { validateDto } from '../../../utils/validation/validation.utils';
import {
  PROJECT_STATUS_TYPES,
  PROJECT_STATUS_TYPE_ARRAY,
} from '../../../common/constant';

export async function validateProjectStatusDTO(
  val: PROJECT_STATUS_TYPES,
): Promise<boolean | string> {
  const dto = new ProjectStatusAnswerDTO(val);
  const errorMessage = await validateDto(dto);
  return errorMessage ?? true;
}

export function isValidProjectStatus(projectStatus: string): boolean {
  return (
    PROJECT_STATUS_TYPE_ARRAY.includes(projectStatus) && projectStatus !== 'n/a'
  );
}

export function validateProjectStatus(
  val: string,
  answers?: Answers,
): boolean | string {
  if (val.trim() !== '' && val.trim() !== 'n/a') {
    if (isValidProjectStatus(val)) {
      return true;
    } else {
      return PROJECT_STATUS_MSG.errorMessage;
    }
  } else {
    return PROJECT_STATUS_MSG.requiredMessage;
  }
}
