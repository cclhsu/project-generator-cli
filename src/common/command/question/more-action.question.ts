import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'more-action-questions' })
export class MoreActionQuestions {
  @Question({
    message: 'More Action:',
    name: 'moreAction',
    type: 'confirm',
    default: false,
    validate: (val: boolean) => {
      if (typeof val === 'boolean') {
        return true;
      } else {
        return 'MoreAction is required';
      }
    },
  })
  parseMoreAction(val: string): string {
    return val;
  }
}
