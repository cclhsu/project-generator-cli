export type TASK_EFFORT_TYPES = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'I';
export const TASK_EFFORT_TYPE_ARRAY = ['XS', 'S', 'M', 'L', 'XL', 'I'];
export const DEFAULT_TASK_EFFORT = 'XS';
export enum TASK_EFFORT_ENUM {
  XS = 'Half a Day', // 1
  S = 'A Day', // 2
  M = 'Up to 3 Days', // 3
  L = 'Up to 5 Days', // 5
  XL = 'Up to 10 days', // 8
  I = 'More than 10 days', // 13
}
// export const TASK_EFFORT_MAP = {
//   [TASK_EFFORT_ENUM.XS]: 1,
//   [TASK_EFFORT_ENUM.S]: 2,
//   [TASK_EFFORT_ENUM.M]: 3,
//   [TASK_EFFORT_ENUM.L]: 5,
//   [TASK_EFFORT_ENUM.XL]: 8,
//   [TASK_EFFORT_ENUM.I]: 13,
// };

export const TASK_EFFORT_MAP = {
  XS: 1,
  S: 2,
  M: 3,
  L: 5,
  XL: 8,
  I: 13,
};

export function convertStringToTaskEffort(input: string): TASK_EFFORT_TYPES {
  if (
    !TASK_EFFORT_TYPE_ARRAY.includes(
      input.trim().toUpperCase() as TASK_EFFORT_TYPES,
    )
  ) {
    throw new Error('Invalid task effort: ' + input);
  }
  return input.trim().toUpperCase() as TASK_EFFORT_TYPES;
}

export function convertStringToTaskEfforts(input: string): TASK_EFFORT_TYPES[] {
  const effortNames: string[] = input
    .split(',')
    .map((effort) => effort.trim().toUpperCase());
  const efforts: TASK_EFFORT_TYPES[] = effortNames.filter((effortName) =>
    TASK_EFFORT_TYPE_ARRAY.includes(effortName as TASK_EFFORT_TYPES),
  ) as TASK_EFFORT_TYPES[]; // Type assertion here
  return efforts;
}
