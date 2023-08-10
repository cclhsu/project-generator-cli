import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'completed-by-questions' })
export class CompletedByQuestions {
  @Question({
    message: 'Enter completed-by:',
    name: 'completedBy',
    type: 'input',
    validate: (val: string) => {
      if (val.trim() !== '' && val.trim().toLowerCase() !== 'n/a') {
        return true;
      } else {
        return 'completed-by is required';
      }
    },
  })
  parseCompletedBy(val: string): string {
    return val;
  }
}
