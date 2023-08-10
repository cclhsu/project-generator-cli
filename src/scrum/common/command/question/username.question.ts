import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'username-questions' })
export class UserNameQuestions {
  @Question({
    message: 'Enter username:',
    name: 'username',
    type: 'input',
  })
  parseUsername(val: string): string {
    return val;
  }
}
