import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'module-name-questions' })
export class ModuleNameQuestions {
  @Question({
    message: 'Enter your module-name:',
    name: 'moduleName',
    type: 'input',
  })
  parseModuleName(val: string): string {
    return val;
  }
}
