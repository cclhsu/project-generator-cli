import { QuestionSet, Question } from 'nest-commander';
import { Injectable } from '@nestjs/common';

@QuestionSet({ name: 'updated-date-questions' })
@Injectable()
export class UpdatedDateQuestions {
  @Question({
    message: 'Enter updated-date:',
    name: 'updatedDate',
    type: 'input',
  })
  parseUpdatedDate(val: string): Date {
    return new Date(val);
  }
}
