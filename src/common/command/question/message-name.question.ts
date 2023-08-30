import { Question, QuestionSet } from 'nest-commander';
import { validateMessageName } from '../validation';

@QuestionSet({ name: 'message-name-questions' })
export class MessageNameQuestions {
  @Question({
    message: 'Enter message name:',
    name: 'name',
    type: 'input',
    validate: validateMessageName,
  })
  parseMessageName(val: string): string {
    return val;
  }
}
