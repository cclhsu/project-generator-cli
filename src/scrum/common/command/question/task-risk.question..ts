import { Question, QuestionSet } from 'nest-commander';
import {
  DEFAULT_TASK_RISK,
  TASK_RISK,
} from '../../../common/constant/task-risk.constant';

@QuestionSet({ name: 'task-risk-questions' })
export class TaskRiskQuestions {
  @Question({
    message: 'Enter task-risk:',
    name: 'taskRisk',
    type: 'list',
    default: DEFAULT_TASK_RISK,
    choices: TASK_RISK,
  })
  parseTaskRisk(val: string): string {
    return val;
  }
}
