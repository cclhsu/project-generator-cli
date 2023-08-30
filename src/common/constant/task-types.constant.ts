export type TASK_TYPES =
  | 'EPIC'
  | 'STORY'
  | 'TASK'
  | 'BUG'
  | 'FEATURE'
  | 'IMPROVEMENT'
  | 'SUB_TASK';
export const TASK_TYPE_ARRAY = [
  'EPIC',
  'STORY',
  'TASK',
  'BUG',
  'FEATURE',
  'IMPROVEMENT',
  'SUB_TASK',
];
export const DEFAULT_TASK_TYPE = 'TASK';
export enum TASK_TYPE_ENUM {
  EPIC = 'EPIC',
  STORY = 'STORY',
  TASK = 'TASK',
  BUG = 'BUG',
  FEATURE = 'FEATURE',
  IMPROVEMENT = 'IMPROVEMENT',
  SUB_TASK = 'SUB_TASK',
}

export function convertStringToTaskTypes(input: string): TASK_TYPES {
  if (!TASK_TYPE_ARRAY.includes(input.trim().toUpperCase() as TASK_TYPES)) {
    throw new Error('Invalid task types: ' + input);
  }
  return input.trim().toUpperCase() as TASK_TYPES;
}

export function convertStringToTaskTaskTypes(input: string): TASK_TYPES[] {
  const typesNames: string[] = input
    .split(',')
    .map((types) => types.trim().toUpperCase());
  const taskTypes: TASK_TYPES[] = typesNames.filter((typesName) =>
    TASK_TYPE_ARRAY.includes(typesName as TASK_TYPES),
  ) as TASK_TYPES[]; // Type assertion here
  return taskTypes;
}
