import { Question, QuestionSet } from 'nest-commander';
import { DEFAULT_PROJECT_SUITE_ROOT_PATH } from '../../../common/constant';

@QuestionSet({ name: 'src-root-questions' })
export class SrcRootQuestions {
  @Question({
    message: 'Enter src-root:',
    name: 'srcRoot',
    type: 'input',
    default: DEFAULT_PROJECT_SUITE_ROOT_PATH,
    // validate: (val: string) => {
    //   if (val.trim() !== '' && val.trim().toLowerCase() !== 'n/a') {
    //     return true;
    //   } else {
    //     return 'src-root is required';
    //   }
    // },
  })
  parseSrcRoot(val: string): string {
    return val;
  }
}
