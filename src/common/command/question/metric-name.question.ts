import { Question, QuestionSet } from 'nest-commander';
import { validateMetricName } from '../validation';

@QuestionSet({ name: 'metric-name-questions' })
export class MetricNameQuestions {
  @Question({
    message: 'Enter metric name:',
    name: 'name',
    type: 'input',
    validate: validateMetricName,
  })
  parseMetricName(val: string): string {
    return val;
  }
}
