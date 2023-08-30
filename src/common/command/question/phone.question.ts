import { Question, QuestionSet } from 'nest-commander';
import { validatePhone } from '../validation';

@QuestionSet({ name: 'phone-questions' })
export class PhoneQuestions {
  @Question({
    message: 'Enter phone number:',
    name: 'phone',
    type: 'input',
    validate: validatePhone,
  })
  parsePhone(val: string): string {
    return val;
  }
}
