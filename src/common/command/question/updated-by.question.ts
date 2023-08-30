import { Question, QuestionSet } from 'nest-commander';
import { validateUserIdBy } from '../validation';

@QuestionSet({ name: 'updated-by-questions' })
export class UpdatedByQuestions {
  @Question({
    message: 'Enter updated-by:',
    name: 'updatedBy',
    type: 'input',
    validate: validateUserIdBy,
  })
  parseUpdatedBy(val: string): string {
    return val;
  }
}
