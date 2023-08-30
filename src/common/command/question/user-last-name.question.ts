import { validate } from 'class-validator';
import { Question, QuestionSet } from 'nest-commander';
import { validateUserLastName } from '../validation';

@QuestionSet({ name: 'user-last-name-questions' })
export class UserLastNameQuestions {
  @Question({
    message: 'Enter last name:',
    name: 'lastName',
    type: 'input',
    validate: validateUserLastName,
  })
  parseUserLastName(val: string): string {
    return val;
  }
}
