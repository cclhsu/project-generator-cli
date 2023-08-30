import { Question, QuestionSet } from 'nest-commander';
import { validateEmail } from '../validation';

@QuestionSet({ name: 'email-questions' })
export class EmailQuestions {
  @Question({
    message: 'Enter email:',
    name: 'email',
    type: 'input',
    validate: validateEmail,
  })
  parseEmail(val: string): string {
    return val;
  }
}
