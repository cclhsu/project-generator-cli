import { Question, QuestionSet } from 'nest-commander';
import {
  DEFAULT_GIT_PROVIDER,
  GIT_PROVIDER_TYPES,
} from 'src/common/constant/git.constant';

@QuestionSet({ name: 'git-provider-questions' })
export class GitProviderQuestions {
  @Question({
    message: 'Enter git-provider:',
    name: 'gitProvider',
    type: 'list',
    default: DEFAULT_GIT_PROVIDER,
    choices: GIT_PROVIDER_TYPES,
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
