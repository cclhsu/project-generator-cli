import { Question, QuestionSet } from 'nest-commander';
import { validateAcceptanceCriterion } from '../validation';

@QuestionSet({ name: 'acceptance-criterion-questions' })
export class AcceptanceCriterionQuestions {
  @Question({
    message: 'Enter acceptance-criterion:',
    name: 'acceptanceCriterion',
    type: 'input',
    default: 'Given <some-context>, When <some-event>, Then <some-outcome>',
    validate: validateAcceptanceCriterion,
  })
  parseAcceptanceCriterionString(val: string): string {
    return val;
  }
}
