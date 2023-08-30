import { Question, QuestionSet } from 'nest-commander';
import { DEFAULT_VARIABLE_FILE_PATH } from '../../../common/constant';

@QuestionSet({ name: 'project-suite-variables-path-name-questions' })
export class ProjectSuiteVariablesFilePathQuestions {
  @Question({
    message: 'Enter variables-file-path:',
    name: 'projectSuiteVariablesFilePath',
    type: 'input',
    default: DEFAULT_VARIABLE_FILE_PATH,
  })
  parseProjectSuiteVariablesFilePath(val: string): string {
    return val;
  }
}
