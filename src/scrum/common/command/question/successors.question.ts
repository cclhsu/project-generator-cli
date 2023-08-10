import { Question, QuestionSet } from 'nest-commander';
import { Injectable } from '@nestjs/common';

@QuestionSet({ name: 'successors-questions' })
@Injectable()
export class SuccessorsQuestions {
  @Question({
    message: 'Enter successors:',
    name: 'successors',
    type: 'input',
    validate: (val: string) => {
      if (val.trim() !== '' && val.trim().toLowerCase() !== 'n/a') {
        return true;
      } else {
        return 'Successors are required';
      }
    },
  })
  parseSuccessors(val: string): string[] {
    return val.split(',').map((successor) => successor.trim());
  }
}
