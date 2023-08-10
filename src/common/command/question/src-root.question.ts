import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'src-root-questions' })
export class SrcRootQuestions {
  @Question({
    message: 'Enter src-root:',
    name: 'srcRoot',
    type: 'input',
    default: '${HOME}/src',
    validate: (val: string) => {
      if (val.trim() !== '' && val.trim().toLowerCase() !== 'n/a') {
        return true;
      } else {
        return 'src-root is required';
      }
    },
  })
  parseSrcRoot(val: string): string {
    return val;
  }
}
