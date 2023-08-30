import { Question, QuestionSet } from 'nest-commander';
import { validateDefinitionOfDone } from '../validation';

@QuestionSet({ name: 'definition-of-done-string-questions' })
export class DefinitionOfDoneStringQuestions {
  @Question({
    message: 'Enter definition-of-done-string:',
    name: 'definitionOfDoneString',
    type: 'input',
    default:
      'Given <some-context>, When <some-event>, Then <some-outcome> and <some-other-outcome>',
    validate: validateDefinitionOfDone,
  })
  parseDefinitionOfDoneString(val: string): string {
    return val;
  }
}
