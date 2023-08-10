import { Question, QuestionSet } from 'nest-commander';
import {
  DEFAULT_TASK_PRIORITY,
  TASK_PRIORITIES,
} from '../../../common/constant/task-priority.constant';

@QuestionSet({ name: 'task-priority-questions' })
export class TaskPriorityQuestions {
  @Question({
    message: 'Enter task-priority:',
    name: 'taskPriority',
    type: 'list',
    default: DEFAULT_TASK_PRIORITY,
    choices: TASK_PRIORITIES,
  })
  parseTaskPriority(val: string): string {
    return val;
  }
}
