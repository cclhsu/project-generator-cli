import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'project-suite-name-questions' })
export class ProjectSuiteNameQuestions {
  @Question({
    message: 'Enter project-suite-name:',
    name: 'projectSuiteName',
    type: 'input',
    validate: (val: string) => {
      if (val.trim() !== '' && val.trim().toLowerCase() !== 'n/a') {
        return true;
      } else {
        return 'project-suite-name is required';
      }
    },
  })
  parseProjecSuitetName(val: string): string {
    return val;
  }
}
