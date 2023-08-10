import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'id-questions' })
export class IdQuestions {
  @Question({
    message: 'Enter ID:',
    name: 'ID',
    type: 'input',
  })
  parseId(val: string): string {
    return val;
  }
}
