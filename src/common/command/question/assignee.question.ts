import { Question, QuestionSet } from 'nest-commander';
import { validateUserId } from '../validation';

@QuestionSet({ name: 'assignee-questions' })
export class AssigneeQuestions {
  @Question({
    message: 'Enter assignee:',
    name: 'assignee',
    type: 'input',
    default: 'n/a',
    validate: validateUserId,
  })
  parseAssignee(val: string): string {
    return val;
  }
}
