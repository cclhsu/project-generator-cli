import { Question, QuestionSet } from 'nest-commander';
import {
  DEFAULT_TASK_RISK,
  TASK_RISK_TYPES,
  TASK_RISK_TYPE_ARRAY,
} from '../../constant/task-risk.constant';
import { validateTaskRisk } from '../validation';

@QuestionSet({ name: 'task-risk-questions' })
export class TaskRiskQuestions {
  @Question({
    message: 'Enter task-risk:',
    name: 'taskRisk',
    type: 'list',
    default: DEFAULT_TASK_RISK,
    choices: TASK_RISK_TYPE_ARRAY,
  })
  parseTaskRisk(val: string): TASK_RISK_TYPES {
    const res = validateTaskRisk(val);
    if (res === true) {
      return val as TASK_RISK_TYPES;
    }
    throw new Error(res + ': ' + val + '\n');
  }
}
