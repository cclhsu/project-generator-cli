import { QuestionSet, Question } from 'nest-commander';
import { Injectable } from '@nestjs/common';
import { isInstance } from 'class-validator';
import { validateStartDate } from '../validation';

@QuestionSet({ name: 'start-date-questions' })
@Injectable()
export class StartDateQuestions {
  @Question({
    message:
      'Enter start-date (YYYY/MM/DD, YYYY-MM-DD, MM/DD/YYYY, or a valid date string):',
    name: 'startDate',
    type: 'input',
    validate: validateStartDate,
  })
  parseStartDate(val: string): Date | undefined {
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
