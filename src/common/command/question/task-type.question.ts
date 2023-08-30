import { Question, QuestionSet } from 'nest-commander';
import {
  DEFAULT_TASK_TYPE,
  TASK_TYPES,
  TASK_TYPE_ARRAY,
} from '../../constant/task-types.constant';
import { validateTaskType } from '../validation';

@QuestionSet({ name: 'task-type-questions' })
export class TaskTypeQuestions {
  @Question({
    message: 'Enter task-type:',
    name: 'taskType',
    type: 'list',
    default: DEFAULT_TASK_TYPE,
    choices: TASK_TYPE_ARRAY,
  })
  parseTaskType(val: string): TASK_TYPES {
    const res = validateTaskType(val);
    if (res === true) {
      return val as TASK_TYPES;
    }
    throw new Error(res + ': ' + val + '\n');
  }
}
