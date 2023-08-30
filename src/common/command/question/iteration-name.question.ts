import { Question, QuestionSet } from 'nest-commander';
import { validateIterationName } from '../validation';

@QuestionSet({ name: 'iteration-name-questions' })
export class IterationNameQuestions {
  @Question({
    message: 'Enter iteration name:',
    name: 'iterationName',
    type: 'input',
    validate: validateIterationName,
  })
  parseIterationName(val: string): string {
    return val;
  }
}
