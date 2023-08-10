import { Question, QuestionSet } from 'nest-commander';
import {
  DEFAULT_EFFORT_LEVEL,
  EFFORT_LEVELS,
} from '../../constant/effort-level.constant';

@QuestionSet({ name: 'task-effort-questions' })
export class TaskEffortQuestions {
  @Question({
    message: 'Enter task-effort:',
    name: 'taskEffort',
    type: 'list',
    default: DEFAULT_EFFORT_LEVEL,
    choices: EFFORT_LEVELS,
  })
  parseTaskEffort(val: string): string {
    return val;
  }
}
