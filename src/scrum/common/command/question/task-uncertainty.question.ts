import { Question, QuestionSet } from 'nest-commander';
import {
  DEFAULT_UNCERTAINTY_LEVEL,
  UNCERTAINTY_LEVEL_TYPES,
} from '../../constant/uncertainty-level.constant';

@QuestionSet({ name: 'task-uncertainty-questions' })
export class TaskUncertaintyQuestions {
  @Question({
    message: 'Enter task-uncertainty:',
    name: 'taskUncertainty',
    type: 'list',
    default: DEFAULT_UNCERTAINTY_LEVEL,
    choices: UNCERTAINTY_LEVEL_TYPES,
  })
  parseTaskUncertainty(val: string): string {
    return val;
  }
}
