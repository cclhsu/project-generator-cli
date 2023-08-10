import { QuestionSet, Question } from 'nest-commander';
import { Injectable } from '@nestjs/common';

@QuestionSet({ name: 'start-date-questions' })
@Injectable()
export class StartDateQuestions {
  @Question({
    message: 'Enter start-date:',
    name: 'startDate',
    type: 'input',
  })
  parseStartDate(val: string): Date {
    return new Date(val);
  }
}
