export type ITERATION_TYPES = 'SCRUM' | 'KANBAN';
export const ITERATION_TYPE_ARRAY = ['SCRUM', 'KANBAN'];
export const DEFAULT_ITERATION_TYPE = 'SCRUM';
export enum ITERATION_TYPE_ENUM {
  SCRUM = 'SCRUM',
  KANBAN = 'KANBAN',
}
export const ITERATION_TYPE_MAP = {
  [ITERATION_TYPE_ENUM.SCRUM]: ITERATION_TYPE_ENUM.SCRUM,
  [ITERATION_TYPE_ENUM.KANBAN]: ITERATION_TYPE_ENUM.KANBAN,
};

export function convertStringToIterationTypes(input: string): ITERATION_TYPES {
  if (
    !ITERATION_TYPE_ARRAY.includes(
      input.trim().toUpperCase() as ITERATION_TYPES,
    )
  ) {
    throw new Error('Invalid iteration types: ' + input);
  }
  return input.trim().toUpperCase() as ITERATION_TYPES;
}

export function convertStringToIterationIterationTypes(
  input: string,
): ITERATION_TYPES[] {
  const typesNames: string[] = input
    .split(',')
    .map((types) => types.trim().toUpperCase());
  const iterationTypes: ITERATION_TYPES[] = typesNames.filter((typesName) =>
    ITERATION_TYPE_ARRAY.includes(typesName as ITERATION_TYPES),
  ) as ITERATION_TYPES[]; // Type assertion here
  return iterationTypes;
}

export const DEFAULT_COLUMNS = ['TODO', 'IN_PROGRESS', 'DONE'];
export const DEFAULT_COLUMN = 'TODO';

export const SCRUM_COLUMNS = ['TODO', 'IN_PROGRESS', 'DONE'];
export const DEFAULT_SCRUM_COLUMN = 'TODO';

export const KANBAN_COLUMNS = ['TODO', 'IN_PROGRESS', 'DONE'];
export const DEFAULT_KANBAN_COLUMN = 'TODO';
