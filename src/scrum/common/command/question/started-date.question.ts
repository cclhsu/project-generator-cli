import { QuestionSet, Question } from 'nest-commander';
import { Injectable } from '@nestjs/common';

@QuestionSet({ name: 'started-date-questions' })
@Injectable()
export class StartedDateQuestions {
  @Question({
    message: 'Enter started-date:',
    name: 'startedDate',
    type: 'input',
  })
  parseStartedDate(val: string): Date {
    return new Date(val);
  }
}
