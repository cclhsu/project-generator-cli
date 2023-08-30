import { Answers } from 'inquirer';
import { PROJECT_ROLE_MSG, ProjectRoleAnswerDTO } from '../dto';
import { validateDto } from '../../../utils/validation/validation.utils';
import {
  PROJECT_ROLE_TYPES,
  PROJECT_ROLE_TYPE_ARRAY,
  isValidProjectRole,
} from '../../../common/constant';

export async function validateProjectRoleDTO(
  val: PROJECT_ROLE_TYPES,
): Promise<boolean | string> {
  const dto = new ProjectRoleAnswerDTO(val);
  const errorMessage = await validateDto(dto);
  return errorMessage ?? true;
}

// export function isValidProjectRole(projectRole: string): boolean {
//   return PROJECT_ROLE_TYPE_ARRAY.includes(projectRole) && projectRole.trim() !== 'n/a';
// }

export function validateProjectRole(
  val: string,
  answers?: Answers,
): boolean | string {
  if (val.trim() !== '' && val.trim() !== 'n/a') {
    if (isValidProjectRole(val)) {
      return true;
    } else {
      return PROJECT_ROLE_MSG.errorMessage;
    }
  } else {
    return PROJECT_ROLE_MSG.requiredMessage;
  }
}
