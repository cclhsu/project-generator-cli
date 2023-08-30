import { Question, QuestionSet } from 'nest-commander';
import { validateDefinitionOfDone } from '../validation';

@QuestionSet({ name: 'definition-of-done-questions' })
export class DefinitionOfDoneQuestions {
  @Question({
    message: 'Enter definition-of-done:',
    name: 'definitionOfDone',
    type: 'input',
    default:
      'Given <some-context>, When <some-event>, Then <some-outcome> and <some-other-outcome>',
    validate: validateDefinitionOfDone,
  })
  parseDefinitionOfDone(val: string): string {
    return val;
  }
}
