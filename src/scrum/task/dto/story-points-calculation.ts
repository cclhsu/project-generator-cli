import { COMPLEXITY_LEVELS_ENUM } from '../../common/constant/complexity-level.constant';
import { UNCERTAINTY_LEVEL_ENUM } from '../../common/constant/uncertainty-level.constant';
import { DEPENDENCY_LEVELS_ENUM } from '../../common/constant/dependency-level.constant';
import { EFFORT_LEVEL_ENUM } from '../../common/constant/effort-level.constant';

type StoryPointCalculationMethod = 'Sum' | 'Max' | 'Average';

type StoryEnum =
  | COMPLEXITY_LEVELS_ENUM
  | UNCERTAINTY_LEVEL_ENUM
  | DEPENDENCY_LEVELS_ENUM
  | EFFORT_LEVEL_ENUM;

const enumToPointsMap: Record<StoryEnum, number> = {
  [COMPLEXITY_LEVELS_ENUM.XS]: 1,
  [COMPLEXITY_LEVELS_ENUM.S]: 2,
  [COMPLEXITY_LEVELS_ENUM.M]: 3,
  [COMPLEXITY_LEVELS_ENUM.L]: 5,
  [COMPLEXITY_LEVELS_ENUM.XL]: 8,
  [COMPLEXITY_LEVELS_ENUM.I]: 13,
  [UNCERTAINTY_LEVEL_ENUM.NONE]: 1,
  [UNCERTAINTY_LEVEL_ENUM.SOME]: 2,
  [UNCERTAINTY_LEVEL_ENUM.LOW]: 3,
  [UNCERTAINTY_LEVEL_ENUM.MODERATE]: 5,
  [UNCERTAINTY_LEVEL_ENUM.HIGH]: 8,
  [UNCERTAINTY_LEVEL_ENUM.EXTREME]: 13,
  [DEPENDENCY_LEVELS_ENUM.NONE]: 1,
  [DEPENDENCY_LEVELS_ENUM.ALMOST_NONE]: 2,
  [DEPENDENCY_LEVELS_ENUM.SOME]: 3,
  [DEPENDENCY_LEVELS_ENUM.FEW]: 5,
  [DEPENDENCY_LEVELS_ENUM.MORE_THAN_A_FEW]: 8,
  [DEPENDENCY_LEVELS_ENUM.UNKNOWN]: 13,
  [EFFORT_LEVEL_ENUM.XS]: 1,
  [EFFORT_LEVEL_ENUM.S]: 2,
  [EFFORT_LEVEL_ENUM.M]: 3,
  [EFFORT_LEVEL_ENUM.L]: 5,
  [EFFORT_LEVEL_ENUM.XL]: 8,
  [EFFORT_LEVEL_ENUM.I]: 13,
};

export function calculateStoryPoints(
  complexity: COMPLEXITY_LEVELS_ENUM,
  uncertainty: UNCERTAINTY_LEVEL_ENUM,
  dependency: DEPENDENCY_LEVELS_ENUM,
  effort: EFFORT_LEVEL_ENUM,
  method: StoryPointCalculationMethod,
): number {
  // Input validation
  if (
    !Object.values(COMPLEXITY_LEVELS_ENUM).includes(complexity) ||
    !Object.values(UNCERTAINTY_LEVEL_ENUM).includes(uncertainty) ||
    !Object.values(DEPENDENCY_LEVELS_ENUM).includes(dependency) ||
    !Object.values(EFFORT_LEVEL_ENUM).includes(effort)
  ) {
    throw new Error('Invalid input values');
  }

  // Method parameter validation
  if (!['Sum', 'Max', 'Average'].includes(method)) {
    method = 'Sum'; // Default to 'Sum' if an invalid method is provided
  }

  const values = [complexity, uncertainty, dependency, effort].map(
    (enumValue) => enumToPointsMap[enumValue],
  );

  if (method === 'Max') {
    return Math.max(...values);
  }

  if (method === 'Average') {
    const sum = values.reduce((acc, val) => acc + val, 0);
    return sum / values.length;
  }

  // Default method is 'Sum'
  return values.reduce((acc, val) => acc + val, 0);
}
