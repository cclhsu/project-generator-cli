import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'assignee-questions' })
export class AssigneeQuestions {
  @Question({
    message: 'Enter assignee:',
    name: 'assignee',
    type: 'input',
    validate: (val: string) => {
      if (val.trim() !== '' && val.trim().toLowerCase() !== 'n/a') {
        return true;
      } else {
        return 'Assignee is required';
      }
    },
  })
  parseAssignee(val: string): string {
    return val;
  }
}
