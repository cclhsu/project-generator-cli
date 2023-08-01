import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'commit-message-questions' })
export class CommitMessageQuestions {
  @Question({
    message: 'Enter your commit-message:',
    name: 'commitMessage',
    type: 'input',
  })
  parseCommitMessage(val: string): string {
    return val;
  }
}
