import { Question, QuestionSet } from 'nest-commander';
import {
  DEFAULT_TASK_UNCERTAINTY,
  TASK_UNCERTAINTY_TYPES,
  TASK_UNCERTAINTY_TYPE_ARRAY,
} from '../../constant/task-uncertainty.constant';
import { validateTaskUncertainty } from '../validation';

@QuestionSet({ name: 'task-uncertainty-questions' })
export class TaskUncertaintyQuestions {
  @Question({
    message: 'Enter task-uncertainty:',
    name: 'taskUncertainty',
    type: 'list',
    default: DEFAULT_TASK_UNCERTAINTY,
    choices: TASK_UNCERTAINTY_TYPE_ARRAY,
  })
  parseTaskUncertainty(val: string): TASK_UNCERTAINTY_TYPES {
    const res = validateTaskUncertainty(val);
    if (res === true) {
      return val as TASK_UNCERTAINTY_TYPES;
    }
    throw new Error(res + ': ' + val + '\n');
  }
}
