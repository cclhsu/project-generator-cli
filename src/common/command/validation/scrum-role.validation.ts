import { Answers } from 'inquirer';
import { SCRUM_ROLE_MSG, ScrumRoleAnswerDTO } from '../dto';
import { validateDto } from '../../../utils/validation/validation.utils';
import {
  SCRUM_ROLE_TYPES,
  SCRUM_ROLE_TYPE_ARRAY,
  isValidScrumRole,
} from '../../../common/constant';

export async function validateScrumRoleDTO(
  val: SCRUM_ROLE_TYPES,
): Promise<boolean | string> {
  const dto = new ScrumRoleAnswerDTO(val);
  const errorMessage = await validateDto(dto);
  return errorMessage ?? true;
}

// export function isValidScrumRole(scrumRole: string): boolean {
//   return SCRUM_ROLE_TYPE_ARRAY.includes(scrumRole) && scrumRole.trim() !== 'n/a';
// }

export function validateScrumRole(
  val: string,
  answers?: Answers,
): boolean | string {
  if (val.trim() !== '' && val.trim() !== 'n/a') {
    if (isValidScrumRole(val)) {
      return true;
    } else {
      return SCRUM_ROLE_MSG.errorMessage;
    }
  } else {
    return SCRUM_ROLE_MSG.requiredMessage;
  }
}
