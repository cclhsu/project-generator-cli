import { Question, QuestionSet } from 'nest-commander';
import { validateStartedBy } from '../validation';

@QuestionSet({ name: 'started-by-questions' })
export class StartedByQuestions {
  @Question({
    message: 'Enter started-by:',
    name: 'startedBy',
    type: 'input',
    validate: validateStartedBy,
  })
  parseStartedBy(val: string): string {
    return val;
  }
}
