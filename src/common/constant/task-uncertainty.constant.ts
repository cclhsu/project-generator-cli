export type TASK_UNCERTAINTY_TYPES =
  | 'NONE'
  | 'SOME'
  | 'LOW'
  | 'MODERATE'
  | 'HIGH'
  | 'EXTREME';
export const TASK_UNCERTAINTY_TYPE_ARRAY = [
  'NONE',
  'SOME',
  'LOW',
  'MODERATE',
  'HIGH',
  'EXTREME',
];
export const DEFAULT_TASK_UNCERTAINTY = 'NONE';
export enum TASK_UNCERTAINTY_ENUM {
  NONE = 'None (UL)', // 1
  SOME = 'Some (UL)', // 2
  LOW = 'Low (UL)', // 3
  MODERATE = 'Moderate (UL)', // 5
  HIGH = 'High (UL)', // 8
  EXTREME = 'Extreme (UL)', // 13
}
// export const TASK_UNCERTAINTY_MAP = {
//   [TASK_UNCERTAINTY_ENUM.NONE]: 1,
//   [TASK_UNCERTAINTY_ENUM.SOME]: 2,
//   [TASK_UNCERTAINTY_ENUM.LOW]: 3,
//   [TASK_UNCERTAINTY_ENUM.MODERATE]: 5,
//   [TASK_UNCERTAINTY_ENUM.HIGH]: 8,
//   [TASK_UNCERTAINTY_ENUM.EXTREME]: 13,
// };

export const TASK_UNCERTAINTY_MAP = {
  NONE: 1,
  SOME: 2,
  LOW: 3,
  MODERATE: 5,
  HIGH: 8,
  EXTREME: 13,
};

export function convertStringToTaskUncertainty(
  input: string,
): TASK_UNCERTAINTY_TYPES {
  if (
    !TASK_UNCERTAINTY_TYPE_ARRAY.includes(
      input.trim().toUpperCase() as TASK_UNCERTAINTY_TYPES,
    )
  ) {
    throw new Error('Invalid task uncertainty: ' + input);
  }
  return input.trim().toUpperCase() as TASK_UNCERTAINTY_TYPES;
}

export function convertStringToTaskUncertainties(
  input: string,
): TASK_UNCERTAINTY_TYPES[] {
  const uncertaintyNames: string[] = input
    .split(',')
    .map((uncertainty) => uncertainty.trim().toUpperCase());
  const uncertainties: TASK_UNCERTAINTY_TYPES[] = uncertaintyNames.filter(
    (uncertaintyName) =>
      TASK_UNCERTAINTY_TYPE_ARRAY.includes(
        uncertaintyName as TASK_UNCERTAINTY_TYPES,
      ),
  ) as TASK_UNCERTAINTY_TYPES[]; // Type assertion here
  return uncertainties;
}
