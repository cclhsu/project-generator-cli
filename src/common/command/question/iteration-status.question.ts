import { Question, QuestionSet } from 'nest-commander';
import {
  DEFAULT_TASK_STATUS,
  TASK_STATUS_TYPES,
  TASK_STATUS_TYPE_ARRAY,
} from '../../constant/task-status.constant';
import { validateProjectStatus, validateTaskStatus } from '../validation';

@QuestionSet({ name: 'iteration-status-questions' })
export class IterationStatusQuestions {
  @Question({
    message: 'Enter iteration-status:',
    name: 'iterationStatus',
    type: 'list',
    default: DEFAULT_TASK_STATUS,
    choices: TASK_STATUS_TYPE_ARRAY,
  })
  parseIterationStatus(val: string): TASK_STATUS_TYPES {
    const res = validateTaskStatus(val);
    if (res === true) {
      return val as TASK_STATUS_TYPES;
    }
    throw new Error(res + ': ' + val + '\n');
  }
}
