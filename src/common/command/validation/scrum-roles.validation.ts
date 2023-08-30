import { Answers } from 'inquirer';
import { SCRUM_ROLES_MSG, ScrumRolesAnswerDTO } from '../dto';
import { validateDto } from '../../../utils/validation/validation.utils';
import {
  SCRUM_ROLE_TYPES,
  SCRUM_ROLE_TYPE_ARRAY,
  isValidScrumRole,
} from '../../../common/constant';

export async function validateScrumRolesDTO(
  val: SCRUM_ROLE_TYPES[],
): Promise<boolean | string> {
  const dto = new ScrumRolesAnswerDTO(val);
  const errorMessage = await validateDto(dto);
  return errorMessage ?? true;
}

// export function isValidScrumRole(scrumRole: string): boolean {
//   return SCRUM_ROLE_TYPE_ARRAY.includes(scrumRole) && scrumRole.trim() !== 'n/a';
// }

export function validateScrumRoles(
  val: string[] | string,
  answers?: Answers,
): boolean | string {
  if (typeof val === 'string' && val.trim() !== '') {
    if (val.trim().toLowerCase() === 'n/a') {
      return true;
    } else if (val.trim().toLowerCase().includes(',')) {
      const roles = val.trim().split(',');
      const invalidRoles = roles.filter((role) => !isValidScrumRole(role));
      if (invalidRoles.length === 0) {
        return true;
      }
    } else if (isValidScrumRole(val)) {
      return true;
    } else {
      return SCRUM_ROLES_MSG.errorMessage;
    }
  } else if (typeof val === 'string' && val.trim() === '') {
    return SCRUM_ROLES_MSG.requiredMessage;
  }

  if (val instanceof Array && val.length === 0) {
    return SCRUM_ROLES_MSG.requiredMessage;
  } else if (val instanceof Array && val.length > 0) {
    const invalidRoles = (val as string[]).filter(
      (role) => !isValidScrumRole(role),
    );
    if (invalidRoles.length === 0) {
      return true;
    }
  }

  return SCRUM_ROLES_MSG.errorMessage;
}