import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'name-questions' })
export class NameQuestions {
  @Question({
    message: 'Enter name:',
    name: 'name',
    type: 'input',
    validate: (val: string) => {
      if (val.trim() !== '' && val.trim().toLowerCase() !== 'n/a') {
        return true;
      } else {
        return 'Name is required';
      }
    },
  })
  parseName(val: string): string {
    return val;
  }
}
