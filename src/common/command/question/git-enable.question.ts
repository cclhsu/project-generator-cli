import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'git-enable-questions' })
export class GitEnableQuestions {
  @Question({
    message: 'Enter git-enable:',
    name: 'gitEnable',
    type: 'list',
    default: true,
    choices: ['true', 'false'],
  })
  parseGitEnable(val: string): boolean {
    return Boolean(val);
  }
}
