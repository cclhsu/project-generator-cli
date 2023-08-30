import { Question, QuestionSet } from 'nest-commander';
import {
  DEFAULT_TASK_DEPENDENCY,
  TASK_DEPENDENCY_TYPES,
  TASK_DEPENDENCY_TYPE_ARRAY,
} from '../../constant/task-dependency.constant';
import { validateTaskDependency } from '../validation';

@QuestionSet({ name: 'task-dependency-questions' })
export class TaskDependencyQuestions {
  @Question({
    message: 'Enter task-dependency:',
    name: 'taskDependency',
    type: 'list',
    default: DEFAULT_TASK_DEPENDENCY,
    choices: TASK_DEPENDENCY_TYPE_ARRAY,
  })
  parseTaskDependency(val: string): TASK_DEPENDENCY_TYPES {
    const res = validateTaskDependency(val);
    if (res === true) {
      return val as TASK_DEPENDENCY_TYPES;
    }
    throw new Error(res + ': ' + val + '\n');
  }
}
