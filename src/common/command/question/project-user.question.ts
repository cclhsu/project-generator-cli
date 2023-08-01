import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'project-user-questions' })
export class ProjectUserQuestions {
  @Question({
    message: 'Enter your project-user:',
    name: 'projectUser',
    type: 'input',
    validate: (val: string) => {
      if (val.trim() !== '' && val.trim().toLowerCase() !== 'n/a') {
        return true;
      } else {
        return 'project-user is required';
      }
    },
  })
  parseProjectUser(val: string): string {
    return val;
  }
}
