import { Question, QuestionSet } from 'nest-commander';
import { DEFAULT_PROJECT_SUITE_ROOT_PATH } from 'src/common/constant/project.constant';

@QuestionSet({ name: 'project-suite-root-path-questions' })
export class ProjectSuiteRootPathQuestions {
  @Question({
    message: 'Enter project-suite-path:',
    name: 'ProjectSuiteRootPath',
    type: 'input',
    default: DEFAULT_PROJECT_SUITE_ROOT_PATH,
    validate: (val: string) => {
      if (val.trim() !== '' && val.trim().toLowerCase() !== 'n/a') {
        return true;
      } else {
        return 'project-suite-path is required';
      }
    },
  })
  parseProjecSuitetPath(val: string): string {
    return val;
  }
}
