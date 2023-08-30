import { Question, QuestionSet } from 'nest-commander';
import { validateUserId } from '../validation';


@QuestionSet({ name: 'user-id-questions' })
export class UserIdQuestions {
  @Question({
    message: 'Enter ID:',
    name: 'ID',
    type: 'input',
    validate: validateUserId,
  })
  parseId(val: string): string {
    return val;
  }
}
