import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'confirm-delete-questions' })
export class ConfirmDeleteQuestions {
  @Question({
    message: 'Confirm delete config:',
    name: 'confirmDelete',
    type: 'confirm',
    default: false,
    validate: (val: boolean) => {
      if (typeof val === 'boolean') {
        return true;
      } else {
        return 'ConfirmDelete is required';
      }
    },
  })
  parseConfirmDelete(val: string): string {
    return val;
  }
}
