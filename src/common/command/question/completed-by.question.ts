import { Question, QuestionSet } from 'nest-commander';
import { validateCompletedBy } from '../validation';

@QuestionSet({ name: 'completed-by-questions' })
export class CompletedByQuestions {
  @Question({
    message: 'Enter completed-by:',
    name: 'completedBy',
    type: 'input',
    validate: validateCompletedBy,
  })
  parseCompletedBy(val: string): string {
    return val;
  }
}
