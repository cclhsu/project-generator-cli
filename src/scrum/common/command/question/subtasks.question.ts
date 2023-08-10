import { Question, QuestionSet } from 'nest-commander';
import { Injectable } from '@nestjs/common';

@QuestionSet({ name: 'subtasks-questions' })
@Injectable()
export class SubtasksQuestions {
  @Question({
    message: 'Enter subtasks:',
    name: 'subtasks',
    type: 'input',
    validate: (val: string) => {
      if (val.trim() !== '' && val.trim().toLowerCase() !== 'n/a') {
        return true;
      } else {
        return 'Subtasks are required';
      }
    },
  })
  parseSubtasks(val: string): string[] {
    return val.split(',').map((subtask) => subtask.trim());
  }
}
