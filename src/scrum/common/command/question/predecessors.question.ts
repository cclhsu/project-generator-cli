import { Question, QuestionSet } from 'nest-commander';
import { Injectable } from '@nestjs/common';

@QuestionSet({ name: 'predecessors-questions' })
@Injectable()
export class PredecessorsQuestions {
  @Question({
    message: 'Enter predecessors:',
    name: 'predecessors',
    type: 'input',
    validate: (val: string) => {
      if (val.trim() !== '' && val.trim().toLowerCase() !== 'n/a') {
        return true;
      } else {
        return 'Predecessors are required';
      }
    },
  })
  parsePredecessors(val: string): string[] {
    return val.split(',').map((predecessor) => predecessor.trim());
  }
}
