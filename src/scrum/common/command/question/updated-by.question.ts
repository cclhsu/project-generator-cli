import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'updated-by-questions' })
export class UpdatedByQuestions {
  @Question({
    message: 'Enter updated-by:',
    name: 'updatedBy',
    type: 'input',
    validate: (val: string) => {
      if (val.trim() !== '' && val.trim().toLowerCase() !== 'n/a') {
        return true;
      } else {
        return 'updated-by is required';
      }
    },
  })
  parseUpdatedBy(val: string): string {
    return val;
  }
}
