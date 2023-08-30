import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'more-link-questions' })
export class MoreLinkQuestions {
  @Question({
    message: 'More Link:',
    name: 'moreLink',
    type: 'confirm',
    default: false,
    validate: (val: boolean) => {
      if (typeof val === 'boolean') {
        return true;
      } else {
        return 'MoreLink is required';
      }
    },
  })
  parseMoreLink(val: string): string {
    return val;
  }
}
