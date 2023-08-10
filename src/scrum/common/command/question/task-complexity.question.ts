import { Question, QuestionSet } from 'nest-commander';
import {
  DEFAULT_COMPLEXITY_LEVEL,
  COMPLEXITY_LEVELS,
} from '../../constant/complexity-level.constant';

@QuestionSet({ name: 'task-complexity-questions' })
export class TaskComplexityQuestions {
  @Question({
    message: 'Enter task-complexity:',
    name: 'taskComplexity',
    type: 'list',
    default: DEFAULT_COMPLEXITY_LEVEL,
    choices: COMPLEXITY_LEVELS,
  })
  parseTaskComplexity(val: string): string {
    return val;
  }
}
