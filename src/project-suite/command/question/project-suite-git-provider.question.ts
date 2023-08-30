import { Question, QuestionSet } from 'nest-commander';
import {
  DEFAULT_GIT_PROVIDER,
  GIT_PROVIDER_TYPE_ARRAY,
  PROJECT_LANGUAGE_TYPE_ARRAY,
  PROJECT_TEMPLATE_TYPE_ARRAY,
} from '../../../common/constant';

@QuestionSet({ name: 'project-suite-git-provider-questions' })
export class ProjectSuiteGitProviderQuestions {
  @Question({
    message: 'Enter git-provider:',
    name: 'projectSuiteGitProvider',
    type: 'list',
    default: DEFAULT_GIT_PROVIDER,
    choices: GIT_PROVIDER_TYPE_ARRAY,
    // validate: (val: string) => {
    //   if (val.trim() !== '' && val.trim().toLowerCase() !== 'n/a') {
    //     return true;
    //   } else {
    //     return 'git-provider is required';
    //   }
    // },
  })
  parseProjectSuiteGitProvider(val: string): string {
    return val;
  }
}
