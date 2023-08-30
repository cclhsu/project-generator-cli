import { Question, QuestionSet } from 'nest-commander';
import {
  convertStringToScrumRoles,
  DEFAULT_SCRUM_ROLE,
  SCRUM_ROLE_TYPE_ARRAY,
  SCRUM_ROLE_TYPES,
} from '../../../common/constant';
import { validateScrumRoles } from '../validation';

@QuestionSet({ name: 'scrum-roles-questions' })
export class ScrumRolesQuestions {
  @Question({
    message: 'Enter scrum-role:',
    name: 'scrumRoles',
    type: 'list',
    default: DEFAULT_SCRUM_ROLE,
    choices: SCRUM_ROLE_TYPE_ARRAY,
  })
  parseScrumRoles(val: string): SCRUM_ROLE_TYPES[] {
    const res = validateScrumRoles(val);
    if (res === true) {
      return convertStringToScrumRoles(val);
    }
    throw new Error(res + ': ' + val + '\n');
  }
}
