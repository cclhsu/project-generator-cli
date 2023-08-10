import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'email-questions' })
export class EmailQuestions {
  @Question({
    message: 'Enter email:',
    name: 'email',
    type: 'input',
  })
  parseEmail(val: string): string {
    return val;
  }
}
