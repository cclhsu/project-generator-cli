import { Question, QuestionSet } from 'nest-commander';
import {
  DEFAULT_PROJECT_STATUS,
  PROJECT_STATUS_TYPES,
} from '../../constant/project-status.constant';

@QuestionSet({ name: 'project-status-questions' })
export class ProjectStatusQuestions {
  @Question({
    message: 'Enter project-status:',
    name: 'projectStatus',
    type: 'list',
    default: DEFAULT_PROJECT_STATUS,
    choices: PROJECT_STATUS_TYPES,
  })
  parseProjectStatus(val: string): string {
    return val;
  }
}
