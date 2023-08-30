import { Question, QuestionSet } from 'nest-commander';
import { validateCreatedBy } from '../validation';

@QuestionSet({ name: 'created-by-questions' })
export class CreatedByQuestions {
  @Question({
    message: 'Enter created-by:',
    name: 'createdBy',
    type: 'input',
    validate: validateCreatedBy,
  })
  parseCreatedBy(val: string): string {
    return val;
  }
}
