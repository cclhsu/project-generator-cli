import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'more-item-questions' })
export class MoreItemQuestions {
  @Question({
    message: 'More Item:',
    name: 'moreItem',
    type: 'confirm',
    default: false,
    validate: (val: boolean) => {
      if (typeof val === 'boolean') {
        return true;
      } else {
        return 'MoreItem is required';
      }
    },
  })
  parseMoreItem(val: string): string {
    return val;
  }
}
