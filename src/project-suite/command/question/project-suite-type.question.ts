import { Question, QuestionSet } from 'nest-commander';
import {
  DEFAULT_PROJECT_SUITE_TYPE,
  PROJECT_SUITE_TYPE_ARRAY,
} from '../../../common/constant';

@QuestionSet({ name: 'project-suite-type-questions' })
export class ProjectSuiteTypeQuestions {
  @Question({
    message: 'Enter project-suite-type:',
    name: 'projectSuiteType',
    type: 'list',
    default: DEFAULT_PROJECT_SUITE_TYPE,
    choices: PROJECT_SUITE_TYPE_ARRAY,
  })
  parseProjectSuiteType(val: string): string {
    return val;
  }
}
