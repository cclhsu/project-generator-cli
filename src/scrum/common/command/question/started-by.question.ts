import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'started-by-questions' })
export class StartedByQuestions {
  @Question({
    message: 'Enter started-by:',
    name: 'startedBy',
    type: 'input',
    validate: (val: string) => {
      if (val.trim() !== '' && val.trim().toLowerCase() !== 'n/a') {
        return true;
      } else {
        return 'started-by is required';
      }
    },
  })
  parseStartedBy(val: string): string {
    return val;
  }
}
