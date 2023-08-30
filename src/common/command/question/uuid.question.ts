import { Question, QuestionSet } from 'nest-commander';
import { validateUuid } from '../validation';

@QuestionSet({ name: 'uuid-questions' })
export class UuidQuestions {
  @Question({
    message: 'Enter UUID:',
    name: 'UUID',
    type: 'input',
    validate: validateUuid,
  })
  parseUuid(val: string): string {
    return val;
  }
}
