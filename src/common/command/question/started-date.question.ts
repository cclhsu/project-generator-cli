import { QuestionSet, Question } from 'nest-commander';
import { Injectable } from '@nestjs/common';
import { isInstance } from 'class-validator';
import { validateStartedAt } from '../validation';

@QuestionSet({ name: 'started-date-questions' })
@Injectable()
export class StartedAtQuestions {
  @Question({
    message:
      'Enter started-date (YYYY/MM/DD, YYYY-MM-DD, MM/DD/YYYY, or a valid date string):',
    name: 'startedAt',
    type: 'input',
    validate: validateStartedAt,
  })
  parseStartedAt(val: string): Date | undefined {
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
