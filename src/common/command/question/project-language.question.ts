import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'project-language-questions' })
export class ProjectLanguageQuestions {
  @Question({
    message: 'Enter project-language:',
    name: 'projectLanguage',
    type: 'list',
    default: 'typescript',
    choices: ['go', 'python3', 'rust', 'typescript'],
  })
  parseProjectLanguage(val: string): string {
    return val;
  }
}
