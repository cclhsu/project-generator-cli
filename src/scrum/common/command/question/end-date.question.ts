import { QuestionSet, Question } from 'nest-commander';
import { Injectable } from '@nestjs/common';

@QuestionSet({ name: 'end-date-questions' })
@Injectable()
export class EndDateQuestions {
  @Question({
    message: 'Enter end-date:',
    name: 'endDate',
    type: 'input',
  })
  parseEndDate(val: string): Date {
    return new Date(val);
  }
}
