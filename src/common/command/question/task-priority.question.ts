import { Question, QuestionSet } from 'nest-commander';
import {
  DEFAULT_TASK_PRIORITY,
  TASK_PRIORITY_TYPES,
  TASK_PRIORITY_TYPE_ARRAY,
} from '../../constant/task-priority.constant';
import { validateTaskPriority } from '../validation';

@QuestionSet({ name: 'task-priority-questions' })
export class TaskPriorityQuestions {
  @Question({
    message: 'Enter task-priority:',
    name: 'taskPriority',
    type: 'list',
    default: DEFAULT_TASK_PRIORITY,
    choices: TASK_PRIORITY_TYPE_ARRAY,
  })
  parseTaskPriority(val: string): TASK_PRIORITY_TYPES {
    const res = validateTaskPriority(val);
    if (res === true) {
      return val as TASK_PRIORITY_TYPES;
    }
    throw new Error(res + ': ' + val + '\n');
  }
}
