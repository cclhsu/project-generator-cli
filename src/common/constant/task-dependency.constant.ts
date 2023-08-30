export type TASK_DEPENDENCY_TYPES =
  | 'NONE'
  | 'ALMOST_NONE'
  | 'SOME'
  | 'FEW'
  | 'MORE_THAN_A_FEW'
  | 'UNKNOWN';
export const TASK_DEPENDENCY_TYPE_ARRAY = [
  'NONE',
  'ALMOST_NONE',
  'SOME',
  'FEW',
  'MORE_THAN_A_FEW',
  'UNKNOWN',
];
export const DEFAULT_TASK_DEPENDENCY = 'NONE';
export enum TASK_DEPENDENCY_ENUM {
  NONE = 'None (DL)', // 1
  ALMOST_NONE = 'Almost None (DL)', // 2
  SOME = 'Some (DL)', // 3
  FEW = 'Few (DL)', // 5
  MORE_THAN_A_FEW = 'More than a few (DL)', // 8
  UNKNOWN = 'Unknown (DL)', // 13
}
// export const TASK_DEPENDENCY_MAP = {
//   [TASK_DEPENDENCY_ENUM.NONE]: 1,
//   [TASK_DEPENDENCY_ENUM.ALMOST_NONE]: 2,
//   [TASK_DEPENDENCY_ENUM.SOME]: 3,
//   [TASK_DEPENDENCY_ENUM.FEW]: 5,
//   [TASK_DEPENDENCY_ENUM.MORE_THAN_A_FEW]: 8,
//   [TASK_DEPENDENCY_ENUM.UNKNOWN]: 13,
// };

export const TASK_DEPENDENCY_MAP = {
  NONE: 1,
  ALMOST_NONE: 2,
  SOME: 3,
  FEW: 5,
  MORE_THAN_A_FEW: 8,
  UNKNOWN: 13,
};

export function convertStringToTaskDependency(
  input: string,
): TASK_DEPENDENCY_TYPES {
  if (
    !TASK_DEPENDENCY_TYPE_ARRAY.includes(
      input.trim().toUpperCase() as TASK_DEPENDENCY_TYPES,
    )
  ) {
    throw new Error('Invalid task dependency: ' + input);
  }
  return input.trim().toUpperCase() as TASK_DEPENDENCY_TYPES;
}

export function convertStringToTaskDependencies(
  input: string,
): TASK_DEPENDENCY_TYPES[] {
  const dependencyNames: string[] = input
    .split(',')
    .map((dependency) => dependency.trim().toUpperCase());
  const dependencies: TASK_DEPENDENCY_TYPES[] = dependencyNames.filter(
    (dependencyName) =>
      TASK_DEPENDENCY_TYPE_ARRAY.includes(
        dependencyName as TASK_DEPENDENCY_TYPES,
      ),
  ) as TASK_DEPENDENCY_TYPES[]; // Type assertion here
  return dependencies;
}
