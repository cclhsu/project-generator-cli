import { Question, QuestionSet } from 'nest-commander';
import { Injectable } from '@nestjs/common';

@QuestionSet({ name: 'related-tasks-questions' })
@Injectable()
export class RelatedTasksQuestions {
  @Question({
    message: 'Enter related-tasks:',
    name: 'related-tasks',
    type: 'input',
    validate: (val: string) => {
      if (val.trim() !== '' && val.trim().toLowerCase() !== 'n/a') {
        return true;
      } else {
        return 'RelatedTasks are required';
      }
    },
  })
  parseRelatedTasks(val: string): string[] {
    return val.split(',').map((relatedTask) => relatedTask.trim());
  }
}
