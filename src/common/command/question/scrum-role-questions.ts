import { Question, QuestionSet } from 'nest-commander';
import {
  DEFAULT_SCRUM_ROLE,
  SCRUM_ROLE_TYPE_ARRAY,
  SCRUM_ROLE_TYPES,
} from '../../../common/constant';
import { validateScrumRoles } from '../validation';

@QuestionSet({ name: 'scrum-role-questions' })
export class ScrumRoleQuestions {
  @Question({
    message: 'Enter scrum-role:',
    name: 'scrumRole',
    type: 'list',
    default: DEFAULT_SCRUM_ROLE,
    choices: SCRUM_ROLE_TYPE_ARRAY,
  })
  parseScrumRole(val: string): SCRUM_ROLE_TYPES {
    const res = validateScrumRoles(val);
    if (res === true) {
      return val as SCRUM_ROLE_TYPES;
    }
    throw new Error(res + ': ' + val + '\n');
  }
}
