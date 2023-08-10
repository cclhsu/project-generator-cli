import { QuestionSet, Question } from 'nest-commander';
import { Injectable } from '@nestjs/common';

@QuestionSet({ name: 'completed-date-questions' })
@Injectable()
export class CompletedDateQuestions {
  @Question({
    message: 'Enter completed-date:',
    name: 'completedDate',
    type: 'input',
  })
  parseCompletedDate(val: string): Date {
    return new Date(val);
  }
}
