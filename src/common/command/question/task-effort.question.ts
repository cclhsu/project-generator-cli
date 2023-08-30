import { Question, QuestionSet } from 'nest-commander';
import {
  DEFAULT_TASK_EFFORT,
  TASK_EFFORT_TYPES,
  TASK_EFFORT_TYPE_ARRAY,
} from '../../constant/task-effort.constant';
import { validateTaskEffort } from '../validation';

@QuestionSet({ name: 'task-effort-questions' })
export class TaskEffortQuestions {
  @Question({
    message: 'Enter task-effort:',
    name: 'taskEffort',
    type: 'list',
    default: DEFAULT_TASK_EFFORT,
    choices: TASK_EFFORT_TYPE_ARRAY,
  })
  parseTaskEffort(val: string): TASK_EFFORT_TYPES {
    const res = validateTaskEffort(val);
    if (res === true) {
      return val as TASK_EFFORT_TYPES;
    }
    throw new Error(res + ': ' + val + '\n');
  }
}
