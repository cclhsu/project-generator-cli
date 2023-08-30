import { Question, QuestionSet } from 'nest-commander';
import { validateAcceptanceCriterion } from '../validation';

@QuestionSet({ name: 'acceptance-criterion-string-questions' })
export class AcceptanceCriterionStringQuestions {
  @Question({
    message: 'Enter acceptance-criterion-string:',
    name: 'acceptanceCriterionString',
    type: 'input',
    default: 'Given <some-context>, When <some-event>, Then <some-outcome>',
    validate: validateAcceptanceCriterion,
  })
  parseAcceptanceCriterionString(val: string): string {
    return val;
  }
}
