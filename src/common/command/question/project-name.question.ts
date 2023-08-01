import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'project-name-questions' })
export class ProjectNameQuestions {
  @Question({
    message: 'Enter your project-name:',
    name: 'projectName',
    type: 'input',
    validate: (val: string) => {
      if (val.trim() !== '' && val.trim().toLowerCase() !== 'n/a') {
        return true;
      } else {
        return 'project-name is required';
      }
    },
  })
  parseProjectName(val: string): string {
    return val;
  }
}
