import { Question, QuestionSet } from 'nest-commander';
import {
  DEFAULT_PROJECT_STATUS,
  PROJECT_STATUS_TYPES,
  PROJECT_STATUS_TYPE_ARRAY,
} from '../../constant/project-status.constant';
import { validateProjectStatus } from '../validation';

@QuestionSet({ name: 'project-status-questions' })
export class ProjectStatusQuestions {
  @Question({
    message: 'Enter project-status:',
    name: 'projectStatus',
    type: 'list',
    default: DEFAULT_PROJECT_STATUS,
    choices: PROJECT_STATUS_TYPE_ARRAY,
  })
  parseProjectStatus(val: string): PROJECT_STATUS_TYPES {
    const res = validateProjectStatus(val);
    if (res === true) {
      return val as PROJECT_STATUS_TYPES;
    }
    throw new Error(res + ': ' + val + '\n');
  }
}
