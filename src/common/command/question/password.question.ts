import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'password-questions' })
export class PasswordQuestions {
  @Question({
    message: 'Enter password:',
    name: 'password',
    type: 'password',
  })
  parsePassword(val: string): string {
    return val;
  }
}
