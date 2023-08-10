import { QuestionSet, Question } from 'nest-commander';
import { Injectable } from '@nestjs/common';

@QuestionSet({ name: 'created-date-questions' })
@Injectable()
export class CreatedDateQuestions {
  @Question({
    message: 'Enter created-date:',
    name: 'createdDate',
    type: 'input',
  })
  parseCreatedDate(val: string): Date {
    return new Date(val);
  }
}
