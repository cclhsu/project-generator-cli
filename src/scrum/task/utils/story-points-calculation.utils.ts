import {
  DEFAULT_STORY_POINTS_CALCULATION_METHOD,
  STORY_POINTS_CALCULATION_METHODS_TYPE,
  STORY_POINTS_CALCULATION_METHODS_TYPE_ARRAY,
  TASK_COMPLEXITY_TYPES,
  TASK_COMPLEXITY_TYPE_ARRAY,
  TASK_DEPENDENCY_MAP,
  TASK_DEPENDENCY_TYPES,
  TASK_DEPENDENCY_TYPE_ARRAY,
  TASK_EFFORT_MAP,
  TASK_EFFORT_TYPES,
  TASK_EFFORT_TYPE_ARRAY,
  TASK_UNCERTAINTY_MAP,
  TASK_UNCERTAINTY_TYPES,
  TASK_UNCERTAINTY_TYPE_ARRAY,
} from '../../../common/constant';

export function calculateTaskStoryPoints(
  complexity: TASK_COMPLEXITY_TYPES,
  uncertainty: TASK_UNCERTAINTY_TYPES,
  dependency: TASK_DEPENDENCY_TYPES,
  effort: TASK_EFFORT_TYPES,
  method: STORY_POINTS_CALCULATION_METHODS_TYPE,
): number {
  // Input validation
  if (
    !Object.values(TASK_COMPLEXITY_TYPE_ARRAY).includes(complexity) ||
    !Object.values(TASK_UNCERTAINTY_TYPE_ARRAY).includes(uncertainty) ||
    !Object.values(TASK_DEPENDENCY_TYPE_ARRAY).includes(dependency) ||
    !Object.values(TASK_EFFORT_TYPE_ARRAY).includes(effort) ||
    !Object.values(STORY_POINTS_CALCULATION_METHODS_TYPE_ARRAY).includes(method)
  ) {
    throw new Error('Invalid input values');
  }

  // Method parameter validation
  if (STORY_POINTS_CALCULATION_METHODS_TYPE_ARRAY.includes(method)) {
    const values = [
      TASK_EFFORT_MAP[complexity],
      TASK_UNCERTAINTY_MAP[uncertainty],
      TASK_DEPENDENCY_MAP[dependency],
      TASK_EFFORT_MAP[effort],
    ];

    if (method === 'SUM') {
      return values.reduce((acc, val) => acc + val, 0);
    }

    if (method === 'MAX') {
      return Math.max(...values);
    }

    if (method === 'AVERAGE') {
      const sum = values.reduce((acc, val) => acc + val, 0);
      return sum / values.length;
    }
  }
  throw new Error('Invalid method');
}
