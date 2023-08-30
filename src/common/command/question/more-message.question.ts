import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'more-message-questions' })
export class MoreMessageQuestions {
  @Question({
    message: 'More Message:',
    name: 'moreMessage',
    type: 'confirm',
    default: false,
    validate: (val: boolean) => {
      if (typeof val === 'boolean') {
        return true;
      } else {
        return 'MoreMessage is required';
      }
    },
  })
  parseMoreMessage(val: string): string {
    return val;
  }
}
