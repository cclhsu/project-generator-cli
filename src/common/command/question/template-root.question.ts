import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'template-root-questions' })
export class TemplateRootQuestions {
  @Question({
    message: 'Enter your template-root:',
    name: 'templateRoot',
    type: 'input',
    default: './template',
  })
  parseTemplateRoot(val: string): string {
    return val;
  }
}
