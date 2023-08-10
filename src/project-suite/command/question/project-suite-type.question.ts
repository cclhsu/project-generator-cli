import { Question, QuestionSet } from 'nest-commander';
import {
  DEFAULT_PROJECT_SUITE_TYPE,
  PROJECT_SUITE_TYPES,
} from 'src/common/constant/project.constant';

@QuestionSet({ name: 'project-suite-type-questions' })
export class ProjectSuiteTypeQuestions {
  @Question({
    message: 'Enter project-suite-type:',
    name: 'projectSuiteType',
    type: 'list',
    default: DEFAULT_PROJECT_SUITE_TYPE,
    choices: PROJECT_SUITE_TYPES,
  })
  parseProjectSuiteType(val: string): string {
    return val;
  }
}
