import { QuestionSet, Question } from 'nest-commander';
import { Injectable } from '@nestjs/common';
import { isInstance } from 'class-validator';
import { validateCompletedAt } from '../validation';

@QuestionSet({ name: 'completed-date-questions' })
@Injectable()
export class CompletedAtQuestions {
  @Question({
    message:
      'Enter completed-date (YYYY/MM/DD, YYYY-MM-DD, MM/DD/YYYY, or a valid date string):',
    name: 'completedAt',
    type: 'input',
    validate: validateCompletedAt,
  })
  parseCompletedAt(val: string): Date | undefined {
    try {
      const parsedDate = new Date(val);
      if (isNaN(parsedDate.getTime())) {
        console.error('\nInvalid date format');
        return undefined;
      }
      return parsedDate;
    } catch (error: any) {
      console.error('\nInvalid date:', error.message);
      return undefined;
    }
  }
}
