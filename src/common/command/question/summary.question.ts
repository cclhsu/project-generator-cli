import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'summary-questions' })
export class SummaryQuestions {
  @Question({
    message: 'Enter summary:',
    name: 'summary',
    type: 'input',
    validate: (val: string) => {
      if (val.trim() !== '' && val.trim().toLowerCase() !== 'n/a') {
        return true;
      } else {
        return 'Summary is required';
      }
    },
  })
  parseSummary(val: string): string {
    return val;
  }
}
