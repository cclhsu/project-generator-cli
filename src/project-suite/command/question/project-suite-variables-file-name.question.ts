import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'project-suite-variables-file-name-questions' })
export class ProjectSuiteVariablesFileNameQuestions {
  @Question({
    message: 'Enter variables-file-name:',
    name: 'projectSuiteVariablesFileName',
    type: 'input',
    default: 'project-suite-variables.json',
  })
  parseProjectSuiteVariablesFileName(val: string): string {
    return val;
  }
}
