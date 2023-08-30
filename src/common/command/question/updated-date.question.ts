import { QuestionSet, Question } from 'nest-commander';
import { Injectable } from '@nestjs/common';
import { isInstance } from 'class-validator';
import { validateUpdatedAt } from '../validation';

@QuestionSet({ name: 'updated-date-questions' })
@Injectable()
export class UpdatedAtQuestions {
  @Question({
    message:
      'Enter updated-date (YYYY/MM/DD, YYYY-MM-DD, MM/DD/YYYY, or a valid date string):',
    name: 'updatedAt',
    type: 'input',
    validate: validateUpdatedAt,
  })
  parseUpdatedAt(val: string): Date | undefined {
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
