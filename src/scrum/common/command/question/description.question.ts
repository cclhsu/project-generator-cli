import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'description-questions' })
export class DescriptionQuestions {
  @Question({
    message: 'Enter description:',
    name: 'description',
    type: 'input',
    validate: (val: string) => {
      if (val.trim() !== '' && val.trim().toLowerCase() !== 'n/a') {
        return true;
      } else {
        return 'Description is required';
      }
    },
  })
  parseDescription(val: string): string {
    return val;
  }
}
