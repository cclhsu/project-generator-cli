import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'context-questions' })
export class ContextQuestions {
  @Question({
    message: 'Enter context:',
    name: 'context',
    type: 'input',
    validate: (val: string) => {
      if (val.trim() !== '' && val.trim().toLowerCase() !== 'n/a') {
        return true;
      } else {
        return 'Context is required';
      }
    },
  })
  parseContext(val: string): string {
    return val;
  }
}
