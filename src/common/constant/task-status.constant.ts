export type TASK_STATUS_TYPES = 'TODO' | 'IN_PROGRESS' | 'DONE';
export const TASK_STATUS_TYPE_ARRAY = ['TODO', 'IN_PROGRESS', 'DONE'];
export const DEFAULT_TASK_STATUS: TASK_STATUS_TYPES = 'TODO';
export enum TASK_STATUS_TYPES_ENUM {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
export const TASK_STATUS_TYPES_MAP = {
  [TASK_STATUS_TYPES_ENUM.TODO]: TASK_STATUS_TYPES_ENUM.TODO,
  [TASK_STATUS_TYPES_ENUM.IN_PROGRESS]: TASK_STATUS_TYPES_ENUM.IN_PROGRESS,
  [TASK_STATUS_TYPES_ENUM.DONE]: TASK_STATUS_TYPES_ENUM.DONE,
};

export function convertStringToTaskStatus(input: string): TASK_STATUS_TYPES {
  if (
    !TASK_STATUS_TYPE_ARRAY.includes(
      input.trim().toUpperCase() as TASK_STATUS_TYPES,
    )
  ) {
    throw new Error('Invalid task status: ' + input);
  }
  return input.trim().toUpperCase() as TASK_STATUS_TYPES;
}

export function convertStringToTaskStatuses(
  input: string,
): TASK_STATUS_TYPES[] {
  const statusNames: string[] = input
    .split(',')
    .map((status) => status.trim().toUpperCase());
  const statuses: TASK_STATUS_TYPES[] = statusNames.filter((statusName) =>
    TASK_STATUS_TYPE_ARRAY.includes(statusName as TASK_STATUS_TYPES),
  ) as TASK_STATUS_TYPES[]; // Type assertion here
  return statuses;
}
