import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'created-by-questions' })
export class CreatedByQuestions {
  @Question({
    message: 'Enter created-by:',
    name: 'createdBy',
    type: 'input',
    validate: (val: string) => {
      if (val.trim() !== '' && val.trim().toLowerCase() !== 'n/a') {
        return true;
      } else {
        return 'created-by is required';
      }
    },
  })
  parseCreatedBy(val: string): string {
    return val;
  }
}
