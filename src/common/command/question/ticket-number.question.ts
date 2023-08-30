import { Question, QuestionSet } from 'nest-commander';
import { validateTaskId } from '../validation';

@QuestionSet({ name: 'ticket-number-questions' })
export class TicketNumberQuestions {
  @Question({
    message: 'Enter ticket-number:',
    name: 'ticketNumber',
    type: 'input',
    default: 'PPP-XXXX',
    validate: validateTaskId,
  })
  parseTicketNumber(val: string): string {
    return val;
  }
}
