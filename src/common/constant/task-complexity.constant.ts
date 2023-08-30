export type TASK_COMPLEXITY_TYPES = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'I';
export const TASK_COMPLEXITY_TYPE_ARRAY = ['XS', 'S', 'M', 'L', 'XL', 'I'];
export const DEFAULT_TASK_COMPLEXITY = 'XS';
export enum TASK_COMPLEXITY_ENUM {
  XS = '1 (XS)', // 1
  S = '2 (S)', // 2
  M = '3 (M)', // 3
  L = '5 (L)', // 5
  XL = '8 (XL)', // 8
  I = '13 (I)', // 13
}
// export const TASK_COMPLEXITY_MAP = {
//   [TASK_COMPLEXITY_ENUM.XS]: 1,
//   [TASK_COMPLEXITY_ENUM.S]: 2,
//   [TASK_COMPLEXITY_ENUM.M]: 3,
//   [TASK_COMPLEXITY_ENUM.L]: 5,
//   [TASK_COMPLEXITY_ENUM.XL]: 8,
//   [TASK_COMPLEXITY_ENUM.I]: 13,
// };

export const TASK_COMPLEXITY_MAP = {
  XS: 1,
  S: 2,
  M: 3,
  L: 5,
  XL: 8,
  I: 13,
};

export function convertStringToTaskComplexity(
  input: string,
): TASK_COMPLEXITY_TYPES {
  if (
    !TASK_COMPLEXITY_TYPE_ARRAY.includes(
      input.trim().toUpperCase() as TASK_COMPLEXITY_TYPES,
    )
  ) {
    throw new Error('Invalid task complexity: ' + input);
  }
  return input.trim().toUpperCase() as TASK_COMPLEXITY_TYPES;
}

export function convertStringToTaskComplexities(
  input: string,
): TASK_COMPLEXITY_TYPES[] {
  const complexityNames: string[] = input
    .split(',')
    .map((complexity) => complexity.trim().toUpperCase());
  const complexities: TASK_COMPLEXITY_TYPES[] = complexityNames.filter(
    (complexityName) =>
      TASK_COMPLEXITY_TYPE_ARRAY.includes(
        complexityName as TASK_COMPLEXITY_TYPES,
      ),
  ) as TASK_COMPLEXITY_TYPES[]; // Type assertion here
  return complexities;
}
