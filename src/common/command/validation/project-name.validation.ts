import { Answers } from 'inquirer';
import { PROJECT_NAME_MSG, ProjectNameAnswerDTO } from '../dto';
import { validateDto } from '../../../utils/validation/validation.utils';

export async function validateProjectNameDTO(
  val: string,
): Promise<boolean | string> {
  const dto = new ProjectNameAnswerDTO(val);
  const errorMessage = await validateDto(dto);
  return errorMessage ?? true;
}

export function isValidProjectName(projectName: string): boolean {
  const projectNameRegex = PROJECT_NAME_MSG.regexp;
  return projectNameRegex.test(projectName);
}

export function validateProjectName(
  val: string,
  answers?: Answers,
): boolean | string {
  if (val.trim() !== '' && val.trim() !== 'n/a') {
    if (isValidProjectName(val)) {
      return true;
    } else {
      return PROJECT_NAME_MSG.errorMessage;
    }
  } else {
    return PROJECT_NAME_MSG.requiredMessage;
  }
}
