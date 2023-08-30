import { Answers } from 'inquirer';
import { METRIC_NAME_MSG, MetricNameAnswerDTO } from '../dto';
import { validateDto } from '../../../utils/validation/validation.utils';

export async function validateMetricNameDTO(
  val: string,
): Promise<boolean | string> {
  const dto = new MetricNameAnswerDTO(val);
  const errorMessage = await validateDto(dto);
  return errorMessage ?? true;
}

export function isValidMetricName(metricName: string): boolean {
  const metricNameRegex = METRIC_NAME_MSG.regexp;
  return metricNameRegex.test(metricName);
}

export function validateMetricName(
  val: string,
  answers?: Answers,
): boolean | string {
  if (val.trim() !== '' && val.trim() !== 'n/a') {
    if (isValidMetricName(val)) {
      return true;
    } else {
      return METRIC_NAME_MSG.errorMessage;
    }
  } else {
    return METRIC_NAME_MSG.requiredMessage;
  }
}
