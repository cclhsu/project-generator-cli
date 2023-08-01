import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'confirm-update-questions' })
export class ConfirmUpdateQuestions {
  @Question({
    message: 'Confirm update config:',
    name: 'confirmUpdate',
    type: 'confirm',
    default: false,
  })
  parseConfigPath(val: string): string {
    return val;
  }
}
