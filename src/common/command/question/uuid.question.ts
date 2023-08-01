import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'uuid-questions' })
export class UuidQuestions {
  @Question({
    message: 'Enter your UUID:',
    name: 'uuid',
    type: 'input',
  })
  parseUuid(val: string): string {
    return val;
  }
}
