export type PROJECT_STATUS_TYPES = 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED';
export const PROJECT_STATUS_TYPE_ARRAY = [
  'PLANNED',
  'IN_PROGRESS',
  'COMPLETED',
];
export const DEFAULT_PROJECT_STATUS = 'PLANNED';
export enum PROJECT_STATUS_ENUM {
  PLANNED = 'PLANNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}
export const ProjectSTATUS_MAP = {
  [PROJECT_STATUS_ENUM.PLANNED]: PROJECT_STATUS_ENUM.PLANNED,
  [PROJECT_STATUS_ENUM.IN_PROGRESS]: PROJECT_STATUS_ENUM.IN_PROGRESS,
  [PROJECT_STATUS_ENUM.COMPLETED]: PROJECT_STATUS_ENUM.COMPLETED,
};

export function convertStringToProjectStatus(
  input: string,
): PROJECT_STATUS_TYPES {
  if (
    !PROJECT_STATUS_TYPE_ARRAY.includes(
      input.trim().toUpperCase() as PROJECT_STATUS_TYPES,
    )
  ) {
    throw new Error('Invalid project status: ' + input);
  }
  return input.trim().toUpperCase() as PROJECT_STATUS_TYPES;
}

export function convertStringToProjectStatuses(
  input: string,
): PROJECT_STATUS_TYPES[] {
  const statusNames: string[] = input
    .split(',')
    .map((status) => status.trim().toUpperCase());
  const statuses: PROJECT_STATUS_TYPES[] = statusNames.filter((statusName) =>
    PROJECT_STATUS_TYPE_ARRAY.includes(statusName as PROJECT_STATUS_TYPES),
  ) as PROJECT_STATUS_TYPES[]; // Type assertion here
  return statuses;
}
