import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'parent-questions' })
export class ParentQuestions {
  @Question({
    message: 'Enter parent:',
    name: 'parent',
    type: 'input',
    validate: (val: string) => {
      if (val.trim() !== '' && val.trim().toLowerCase() !== 'n/a') {
        return true;
      } else {
        return 'Parent is required';
      }
    },
  })
  parseParent(val: string): string {
    return val;
  }
}
