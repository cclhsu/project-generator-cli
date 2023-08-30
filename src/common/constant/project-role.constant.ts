export type PROJECT_ROLE_TYPES = 'PM' | 'EM' | 'DEV' | 'QA' | 'BA' | 'UX' | 'I';
export const PROJECT_ROLE_TYPE_ARRAY: PROJECT_ROLE_TYPES[] = [
  'PM',
  'EM',
  'DEV',
  'QA',
  'BA',
  'UX',
  'I',
];
export const DEFAULT_PROJECT_ROLE: PROJECT_ROLE_TYPES = 'DEV';
export enum PROJECT_ROLE_ENUM {
  PM = 'Project Manager', // 1
  EM = 'Engagement Manager', // 2
  DEV = 'Developer', // 3
  QA = 'Quality Assurance', // 5
  BA = 'Business Analyst', // 8
  UX = 'User Experience', // 13
  I = 'Other', // 13
}
export const PROJECT_ROLE_MAP = {
  [PROJECT_ROLE_ENUM.PM]: 1,
  [PROJECT_ROLE_ENUM.EM]: 2,
  [PROJECT_ROLE_ENUM.DEV]: 3,
  [PROJECT_ROLE_ENUM.QA]: 5,
  [PROJECT_ROLE_ENUM.BA]: 8,
  [PROJECT_ROLE_ENUM.UX]: 13,
  [PROJECT_ROLE_ENUM.I]: 13,
};

export function isValidProjectRole(projectRole: string): boolean {
  return PROJECT_ROLE_TYPE_ARRAY.includes(projectRole as PROJECT_ROLE_TYPES);
}

export function isValidProjectRoles(projectRoles: string[]): boolean {
  return projectRoles.every((projectRole) => isValidProjectRole(projectRole));
}

export function convertStringToProjectRole(input: string): PROJECT_ROLE_TYPES {
  if (
    !PROJECT_ROLE_TYPE_ARRAY.includes(
      input.trim().toUpperCase() as PROJECT_ROLE_TYPES,
    )
  ) {
    throw new Error('Invalid project role: ' + input);
  }
  return input.trim().toUpperCase() as PROJECT_ROLE_TYPES;
}

export function convertStringToProjectRoles(
  input: string,
): PROJECT_ROLE_TYPES[] {
  const roleNames: string[] = input
    .split(',')
    .map((role) => role.trim().toUpperCase());
  const roles: PROJECT_ROLE_TYPES[] = roleNames.filter((roleName) =>
    PROJECT_ROLE_TYPE_ARRAY.includes(roleName as PROJECT_ROLE_TYPES),
  ) as PROJECT_ROLE_TYPES[]; // Type assertion here
  return roles;
}
