import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'uuid-questions' })
export class UuidQuestions {
  @Question({
    message: 'Enter UUID:',
    name: 'UUID',
    type: 'input',
  })
  parseUuid(val: string): string {
    return val;
  }
}
