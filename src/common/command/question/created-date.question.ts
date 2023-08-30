import { QuestionSet, Question } from 'nest-commander';
import { Injectable } from '@nestjs/common';
import { isInstance } from 'class-validator';
import { validateCreatedAt } from '../validation';

@QuestionSet({ name: 'created-date-questions' })
@Injectable()
export class CreatedAtQuestions {
  @Question({
    message:
      'Enter created-date (YYYY/MM/DD, YYYY-MM-DD, MM/DD/YYYY, or a valid date string):',
    name: 'createdAt',
    type: 'input',
    validate: validateCreatedAt,
  })
  parseCreatedAt(val: string): Date | undefined {
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
