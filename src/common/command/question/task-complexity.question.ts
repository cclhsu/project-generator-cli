import { Question, QuestionSet } from 'nest-commander';
import {
  DEFAULT_TASK_COMPLEXITY,
  TASK_COMPLEXITY_TYPES,
  TASK_COMPLEXITY_TYPE_ARRAY,
} from '../../constant/task-complexity.constant';
import { validateTaskComplexity } from '../validation';

@QuestionSet({ name: 'task-complexity-questions' })
export class TaskComplexityQuestions {
  @Question({
    message: 'Enter task-complexity:',
    name: 'taskComplexity',
    type: 'list',
    default: DEFAULT_TASK_COMPLEXITY,
    choices: TASK_COMPLEXITY_TYPE_ARRAY,
  })
  parseTaskComplexity(val: string): TASK_COMPLEXITY_TYPES {
    const res = validateTaskComplexity(val);
    if (res === true) {
      return val as TASK_COMPLEXITY_TYPES;
    }
    throw new Error(res + ': ' + val + '\n');
  }
}
