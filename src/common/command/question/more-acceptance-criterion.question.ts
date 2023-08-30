import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'more-acceptance-criterion-questions' })
export class MoreAcceptanceCriterionQuestions {
  @Question({
    message: 'More AcceptanceCriterion:',
    name: 'moreAcceptanceCriterion',
    type: 'confirm',
    default: false,
    validate: (val: boolean) => {
      if (typeof val === 'boolean') {
        return true;
      } else {
        return 'MoreAcceptanceCriterion is required';
      }
    },
  })
  parseMoreAcceptanceCriterion(val: string): string {
    return val;
  }
}
