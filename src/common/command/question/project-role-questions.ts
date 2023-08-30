import { Question, QuestionSet } from 'nest-commander';
import {
  DEFAULT_PROJECT_ROLE,
  PROJECT_ROLE_TYPE_ARRAY,
  PROJECT_ROLE_TYPES,
} from '../../../common/constant';
import { validateProjectRole } from '../validation';

@QuestionSet({ name: 'project-role-questions' })
export class ProjectRoleQuestions {
  @Question({
    message: 'Enter project-role:',
    name: 'projectRole',
    type: 'list',
    default: DEFAULT_PROJECT_ROLE,
    choices: PROJECT_ROLE_TYPE_ARRAY,
  })
  parseProjectRole(val: string): PROJECT_ROLE_TYPES {
    const res = validateProjectRole(val);
    if (res === true) {
      return val as PROJECT_ROLE_TYPES;
    }
    throw new Error(res + ': ' + val + '\n');
  }
}
