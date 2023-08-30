import { Question, QuestionSet } from 'nest-commander';
import {
  convertStringToProjectRoles,
  DEFAULT_PROJECT_ROLE,
  PROJECT_ROLE_TYPE_ARRAY,
  PROJECT_ROLE_TYPES,
} from '../../../common/constant';
import { validateProjectRoles } from '../validation';

@QuestionSet({ name: 'project-roles-questions' })
export class ProjectRolesQuestions {
  @Question({
    message: 'Enter project-role:',
    name: 'projectRoles',
    type: 'list',
    default: DEFAULT_PROJECT_ROLE,
    choices: PROJECT_ROLE_TYPE_ARRAY,
  })
  parseProjectRoles(val: string): PROJECT_ROLE_TYPES[] {
    const res = validateProjectRoles(val);
    if (res === true) {
      return convertStringToProjectRoles(val);
    }
    throw new Error(res + ': ' + val + '\n');
  }
}
