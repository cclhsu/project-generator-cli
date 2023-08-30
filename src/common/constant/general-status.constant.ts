export type GENERAL_STATUS_TYPES =
  | 'INACTIVE'
  | 'ACTIVE'
  | 'PLANNED'
  | 'TODO'
  | 'IN_PROGRESS'
  | 'DONE';
export const GENERAL_STATUS_TYPE_ARRAY = [
  'INACTIVE',
  'ACTIVE',
  'PLANNED',
  'TODO',
  'IN_PROGRESS',
  'DONE',
];
export const DEFAULT_GENERAL_STATUS = 'TODO';
export enum GENERAL_STATUS_ENUM {
  INACTIVE = 'INACTIVE',
  ACTIVE = 'ACTIVE',
  PLANNED = 'PLANNED',
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
export const GENERALSTATUS_MAP = {
  [GENERAL_STATUS_ENUM.INACTIVE]: GENERAL_STATUS_ENUM.INACTIVE,
  [GENERAL_STATUS_ENUM.ACTIVE]: GENERAL_STATUS_ENUM.ACTIVE,
  [GENERAL_STATUS_ENUM.PLANNED]: GENERAL_STATUS_ENUM.PLANNED,
  [GENERAL_STATUS_ENUM.TODO]: GENERAL_STATUS_ENUM.TODO,
  [GENERAL_STATUS_ENUM.IN_PROGRESS]: GENERAL_STATUS_ENUM.IN_PROGRESS,
  [GENERAL_STATUS_ENUM.DONE]: GENERAL_STATUS_ENUM.DONE,
};

export function convertStringToGeneralStatus(
  input: string,
): GENERAL_STATUS_TYPES {
  if (
    !GENERAL_STATUS_TYPE_ARRAY.includes(
      input.trim().toUpperCase() as GENERAL_STATUS_TYPES,
    )
  ) {
    throw new Error('Invalid GENERAL status: ' + input);
  }
  return input.trim().toUpperCase() as GENERAL_STATUS_TYPES;
}

export function convertStringToGeneralStatuses(
  input: string,
): GENERAL_STATUS_TYPES[] {
  const statusNames: string[] = input
    .split(',')
    .map((status) => status.trim().toUpperCase());
  const statuses: GENERAL_STATUS_TYPES[] = statusNames.filter((statusName) =>
    GENERAL_STATUS_TYPE_ARRAY.includes(statusName as GENERAL_STATUS_TYPES),
  ) as GENERAL_STATUS_TYPES[]; // Type assertion here
  return statuses;
}
