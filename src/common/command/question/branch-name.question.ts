import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'branch-name-questions' })
export class BranchNameQuestions {
  @Question({
    message: 'Enter branch-name:',
    name: 'branchName',
    type: 'input',
    default: 'main',
    // validate: (val: string) => {
    //   if (val.trim() !== '' && val.trim().toLowerCase() !== 'n/a') {
    //     return true;
    //   } else {
    //     return 'BranchName is required';
    //   }
  })
  parseBranchName(val: string): string {
    return val;
  }
}
