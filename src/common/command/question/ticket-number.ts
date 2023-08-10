import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'ticket-number-questions' })
export class TicketNumberQuestions {
  @Question({
    message: 'Enter ticket-number:',
    name: 'ticketNumber',
    type: 'input',
  })
  parseTicketNumber(val: string): string {
    return val;
  }
}
