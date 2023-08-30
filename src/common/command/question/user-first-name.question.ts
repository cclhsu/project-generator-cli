import { Question, QuestionSet } from 'nest-commander';
import { validateUserFirstName } from '../validation';

@QuestionSet({ name: 'user-first-name-questions' })
export class UserFirstNameQuestions {
  @Question({
    message: 'Enter first name:',
    name: 'firstName',
    type: 'input',
    validate: validateUserFirstName,
  })
  parseUserFirstName(val: string): string {
    return val;
  }
}
