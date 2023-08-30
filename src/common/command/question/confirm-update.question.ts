import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'confirm-update-questions' })
export class ConfirmUpdateQuestions {
  @Question({
    message: 'Confirm update config:',
    name: 'confirmUpdate',
    type: 'confirm',
    default: false,
    validate: (val: boolean) => {
      if (typeof val === 'boolean') {
        return true;
      } else {
        return 'ConfirmUpdate is required';
      }
    },
  })
  parseConfirmUpdate(val: string): string {
    return val;
  }
}
