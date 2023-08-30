import { Question, QuestionSet } from 'nest-commander';
import { validateTaskName } from '../validation';

@QuestionSet({ name: 'task-name-questions' })
export class TaskNameQuestions {
  @Question({
    message: 'Enter task name:',
    name: 'taskName',
    type: 'input',
    validate: validateTaskName,
  })
  parseTaskName(val: string): string {
    return val;
  }
}
