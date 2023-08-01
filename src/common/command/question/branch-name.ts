import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'branch-name-questions' })
export class BranchNameQuestions {
  @Question({
    message: 'Enter your branch-name:',
    name: 'branchName',
    type: 'input',
  })
  parseBranchName(val: string): string {
    return val;
  }
}