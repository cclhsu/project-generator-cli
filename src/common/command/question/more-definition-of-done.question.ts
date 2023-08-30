import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'more-definition-of-done-questions' })
export class MoreDefinitionOfDoneQuestions {
  @Question({
    message: 'More DefinitionOfDone:',
    name: 'moreDefinitionOfDone',
    type: 'confirm',
    default: false,
    validate: (val: boolean) => {
      if (typeof val === 'boolean') {
        return true;
      } else {
        return 'MoreDefinitionOfDone is required';
      }
    },
  })
  parseMoreDefinitionOfDone(val: string): string {
    return val;
  }
}
