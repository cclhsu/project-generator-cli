import { Answers } from 'inquirer';
import { PROJECT_ID_MSG, ProjectIdAnswerDTO } from '../dto';
import { validateDto } from '../../../utils/validation/validation.utils';

export async function validateProjectIdDTO(
  val: string,
): Promise<boolean | string> {
  const dto = new ProjectIdAnswerDTO(val);
  const errorMessage = await validateDto(dto);
  return errorMessage ?? true;
}

export function isValidProjectId(projectId: string): boolean {
  const projectIdRegex = PROJECT_ID_MSG.regexp;
  return projectIdRegex.test(projectId);
}

export function validateProjectId(
  val: string,
  answers?: Answers,
): boolean | string {
  if (val.trim() !== '' && val.trim() !== 'n/a') {
    if (isValidProjectId(val)) {
      return true;
    } else {
      return PROJECT_ID_MSG.errorMessage;
    }
  } else {
    return PROJECT_ID_MSG.requiredMessage;
  }
}
