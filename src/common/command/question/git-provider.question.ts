import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'git-provider-questions' })
export class GitProviderQuestions {
  @Question({
    message: 'Enter your git-provider:',
    name: 'gitProvider',
    type: 'list',
    default: 'github.com',
    choices: ['github.com', 'gitlab.com', 'bitbucket.org', 'mypProject'],
    validate: (val: string) => {
      if (val.trim() !== '' && val.trim().toLowerCase() !== 'n/a') {
        return true;
      } else {
        return 'git-provider is required';
      }
    },
  })
  parseGitProvider(val: string): string {
    return val;
  }
}
