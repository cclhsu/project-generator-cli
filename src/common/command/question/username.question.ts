import { Question, QuestionSet } from 'nest-commander';
import { validateUserId } from '../validation';

@QuestionSet({ name: 'username-questions' })
export class UserNameQuestions {
  @Question({
    message: 'Enter username:',
    name: 'username',
    type: 'input',
    validate: validateUserId,
  })
  parseUsername(val: string): string {
    return val;
  }
}
