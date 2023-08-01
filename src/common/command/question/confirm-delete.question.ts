import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'confirm-delete-questions' })
export class ConfirmDeleteQuestions {
  @Question({
    message: 'Confirm delete config:',
    name: 'confirmDelete',
    type: 'confirm',
    default: false,
  })
  parseConfigPath(val: string): string {
    return val;
  }
}
