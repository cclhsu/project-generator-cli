import { Question, QuestionSet } from 'nest-commander';
import {
  DEFAULT_TASK_TYPE,
  TASK_TYPES,
} from '../../../common/constant/task-types.constant';

@QuestionSet({ name: 'task-type-questions' })
export class TaskTypeQuestions {
  @Question({
    message: 'Enter task-type:',
    name: 'taskType',
    type: 'list',
    default: DEFAULT_TASK_TYPE,
    choices: TASK_TYPES,
  })
  parseTaskType(val: string): string {
    return val;
  }
}
