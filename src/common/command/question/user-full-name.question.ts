import { Question, QuestionSet } from 'nest-commander';
import { validateUserFullName } from '../validation';

@QuestionSet({ name: 'user-full-name-questions' })
export class UserFullNameQuestions {
  @Question({
    message: 'Enter full name:',
    name: 'fullName',
    type: 'input',
    validate: validateUserFullName,
  })
  parseUserFullName(val: string): string {
    return val;
  }
}
