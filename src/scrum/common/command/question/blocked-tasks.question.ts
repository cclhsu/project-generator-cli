import { Question, QuestionSet } from 'nest-commander';
import { Injectable } from '@nestjs/common';

@QuestionSet({ name: 'blocked-tasks-questions' })
@Injectable()
export class BlockedTasksQuestions {
  @Question({
    message: 'Enter blocked-tasks:',
    name: 'blocked-tasks',
    type: 'input',
    validate: (val: string) => {
      if (val.trim() !== '' && val.trim().toLowerCase() !== 'n/a') {
        return true;
      } else {
        return 'BlockedTasks are required';
      }
    },
  })
  parseBlockedTasks(val: string): string[] {
    return val.split(',').map((blockedTask) => blockedTask.trim());
  }
}
