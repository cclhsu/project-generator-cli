import { Question, QuestionSet } from 'nest-commander';
import { validateCommitMsg } from '../validation';

@QuestionSet({ name: 'commit-message-questions' })
export class CommitMessageQuestions {
  @Question({
    message: 'Enter commit-message:',
    name: 'commitMessage',
    type: 'input',
    default: '[PPP-XXXX] feat: <some-feature>',
    validate: validateCommitMsg,
  })
  parseCommitMessage(val: string): string {
    return val;
  }
}
