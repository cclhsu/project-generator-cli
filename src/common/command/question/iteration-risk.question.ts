import { Question, QuestionSet } from 'nest-commander';
import {
  DEFAULT_TASK_RISK,
  TASK_RISK_TYPES,
  TASK_RISK_TYPE_ARRAY,
} from '../../constant/task-risk.constant';
import { validateTaskRisk } from '../validation';

@QuestionSet({ name: 'iteration-risk-questions' })
export class IterationRiskQuestions {
  @Question({
    message: 'Enter iteration-risk:',
    name: 'iterationRisk',
    type: 'list',
    default: DEFAULT_TASK_RISK,
    choices: TASK_RISK_TYPE_ARRAY,
  })
  parseIterationRisk(val: string): TASK_RISK_TYPES {
    const res = validateTaskRisk(val);
    if (res === true) {
      return val as TASK_RISK_TYPES;
    }
    throw new Error(res + ': ' + val + '\n');
  }
}
