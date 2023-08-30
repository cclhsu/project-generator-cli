import { Answers } from 'inquirer';
import { PROJECT_ROLES_MSG, ProjectRolesAnswerDTO } from '../dto';
import { validateDto } from '../../../utils/validation/validation.utils';
import {
  PROJECT_ROLE_TYPES,
  PROJECT_ROLE_TYPE_ARRAY,
  isValidProjectRole,
} from '../../../common/constant';

export async function validateProjectRolesDTO(
  val: PROJECT_ROLE_TYPES[],
): Promise<boolean | string> {
  const dto = new ProjectRolesAnswerDTO(val);
  const errorMessage = await validateDto(dto);
  return errorMessage ?? true;
}

// export function isValidProjectRole(projectRole: string): boolean {
//   return PROJECT_ROLE_TYPE_ARRAY.includes(projectRole) && projectRole.trim() !== 'n/a';
// }

export function validateProjectRoles(
  val: string[] | string,
  answers?: Answers,
): boolean | string {
  if (typeof val === 'string' && val.trim() !== '') {
    if (val.trim().toLowerCase() === 'n/a') {
      return true;
    } else if (val.trim().toLowerCase().includes(',')) {
      const roles = val.trim().split(',');
      const invalidRoles = roles.filter((role) => !isValidProjectRole(role));
      if (invalidRoles.length === 0) {
        return true;
      }
    } else if (isValidProjectRole(val)) {
      return true;
    } else {
      return PROJECT_ROLES_MSG.errorMessage;
    }
  } else if (typeof val === 'string' && val.trim() === '') {
    return PROJECT_ROLES_MSG.requiredMessage;
  }

  if (val instanceof Array && val.length === 0) {
    return PROJECT_ROLES_MSG.requiredMessage;
  } else if (val instanceof Array && val.length > 0) {
    const invalidRoles = (val as string[]).filter(
      (role) => !isValidProjectRole(role),
    );
    if (invalidRoles.length === 0) {
      return true;
    }
  }

  return PROJECT_ROLES_MSG.errorMessage;
}
