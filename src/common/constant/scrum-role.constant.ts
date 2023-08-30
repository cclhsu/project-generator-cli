export type SCRUM_ROLE_TYPES = 'PO' | 'SM' | 'MEMBER' | 'I';
export const SCRUM_ROLE_TYPE_ARRAY: SCRUM_ROLE_TYPES[] = [
  'PO',
  'SM',
  'MEMBER',
  'I',
];
export const DEFAULT_SCRUM_ROLE: SCRUM_ROLE_TYPES = 'MEMBER';

export enum SCRUM_ROLE_ENUM {
  PO = 'Product Owner', // 1
  SM = 'Scrum Master', // 2
  MEMBER = 'Member', // 3
  I = 'Other', // 13
}

export const SCRUM_ROLE_MAP = {
  [SCRUM_ROLE_ENUM.PO]: 1,
  [SCRUM_ROLE_ENUM.SM]: 2,
  [SCRUM_ROLE_ENUM.MEMBER]: 3,
  [SCRUM_ROLE_ENUM.I]: 13,
};

export function isValidScrumRole(scrumRole: string): boolean {
  return SCRUM_ROLE_TYPE_ARRAY.includes(scrumRole as SCRUM_ROLE_TYPES);
}

export function isValidScrumRoles(scrumRoles: string[]): boolean {
  return scrumRoles.every((scrumRole) => isValidScrumRole(scrumRole));
}

export function convertStringToScrumRole(input: string): SCRUM_ROLE_TYPES {
  if (
    !SCRUM_ROLE_TYPE_ARRAY.includes(
      input.trim().toUpperCase() as SCRUM_ROLE_TYPES,
    )
  ) {
    throw new Error('Invalid scrum role: ' + input);
  }
  return input.trim().toUpperCase() as SCRUM_ROLE_TYPES;
}

export function convertStringToScrumRoles(input: string): SCRUM_ROLE_TYPES[] {
  const roleNames: string[] = input
    .split(',')
    .map((role) => role.trim().toUpperCase());
  const roles: SCRUM_ROLE_TYPES[] = roleNames.filter((roleName) =>
    SCRUM_ROLE_TYPE_ARRAY.includes(roleName as SCRUM_ROLE_TYPES),
  ) as SCRUM_ROLE_TYPES[]; // Type assertion here
  return roles;
}
