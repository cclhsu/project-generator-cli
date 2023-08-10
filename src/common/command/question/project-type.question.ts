import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'project-type-questions' })
export class ProjectTypeQuestions {
  @Question({
    message: 'Enter project-type:',
    name: 'projectType',
    type: 'list',
    default: 'algorithm',
    choices: [
      'service',
      'cli',
      'vscode-extension',
      'web-app',
      'browser-extension',
      'mobile-app',
      'desktop-app',
      'algorithm',
    ],
  })
  parseProjectType(val: string): string {
    return val;
  }
}
