import { Question, QuestionSet } from 'nest-commander';
import {
  DEFAULT_PROJECT_TEMPLATE_TYPE,
  PROJECT_TEMPLATE_TYPE_ARRAY,
} from '../../../common/constant';

@QuestionSet({ name: 'project-type-questions' })
export class ProjectTypeQuestions {
  @Question({
    message: 'Enter project-type:',
    name: 'projectType',
    type: 'list',
    default: DEFAULT_PROJECT_TEMPLATE_TYPE,
    choices: PROJECT_TEMPLATE_TYPE_ARRAY,
  })
  parseProjectType(val: string): string {
    return val;
  }
}
