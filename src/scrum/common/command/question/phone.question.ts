import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'phone-questions' })
export class PhoneQuestions {
  @Question({
    message: 'Enter phone number:',
    name: 'phone',
    type: 'input',
  })
  parsePhone(val: string): string {
    return val;
  }
}
