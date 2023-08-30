import { QuestionSet, Question } from 'nest-commander';
import { Injectable } from '@nestjs/common';
import { isInstance } from 'class-validator';
import { validateEndDate } from '../validation';

@QuestionSet({ name: 'end-date-questions' })
@Injectable()
export class EndDateQuestions {
  @Question({
    message:
      'Enter end-date (YYYY/MM/DD, YYYY-MM-DD, MM/DD/YYYY, or a valid date string):',
    name: 'endDate',
    type: 'input',
    validate: validateEndDate,
  })
  parseEndDate(val: string): Date | undefined {
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
