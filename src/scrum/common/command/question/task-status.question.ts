import { Question, QuestionSet } from 'nest-commander';
import {
  DEFAULT_TASK_STATUS,
  TASK_STATUS,
} from '../../../common/constant/task-status.constant';

@QuestionSet({ name: 'task-status-questions' })
export class TaskStatusQuestions {
  @Question({
    message: 'Enter task-status:',
    name: 'taskStatus',
    type: 'list',
    default: DEFAULT_TASK_STATUS,
    choices: TASK_STATUS,
  })
  parseTaskStatus(val: string): string {
    return val;
  }
}
