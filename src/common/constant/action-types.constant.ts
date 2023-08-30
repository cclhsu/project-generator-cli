export type ACTION_TYPES =
  | 'CREATE'
  | 'UPDATE'
  | 'DELETE'
  | 'GET'
  | 'LIST'
  | 'INIT'
  | 'REQUIRED'
  | 'OPTIONAL';
export const DEFAULT_ACTION_TYPE = 'LIST';
export const LIST_ACTION_TYPE = 'LIST';
export const GET_ACTION_TYPE = 'GET';
export const CREATE_ACTION_TYPE = 'CREATE';
export const UPDATE_ACTION_TYPE = 'UPDATE';
export const DELETE_ACTION_TYPE = 'DELETE';
export const INIT_ACTION_TYPE = 'INIT';
export const REQUIRED_ACTION_TYPE = 'REQUIRED';
export const OPTIONAL_ACTION_TYPE = 'OPTIONAL';
export const ACTION_TYPE_ARRAY: ACTION_TYPES[] = [
  LIST_ACTION_TYPE,
  GET_ACTION_TYPE,
  CREATE_ACTION_TYPE,
  UPDATE_ACTION_TYPE,
  DELETE_ACTION_TYPE,
  INIT_ACTION_TYPE,
  REQUIRED_ACTION_TYPE,
  OPTIONAL_ACTION_TYPE,
];

export const ACTION_TYPE_OPTIONS: string[] = [
  LIST_ACTION_TYPE,
  GET_ACTION_TYPE,
  CREATE_ACTION_TYPE,
  UPDATE_ACTION_TYPE,
  DELETE_ACTION_TYPE,
];

export function convertStringToACTIONTypes(input: string): ACTION_TYPES {
  if (!ACTION_TYPE_ARRAY.includes(input.trim().toUpperCase() as ACTION_TYPES)) {
    throw new Error('Invalid action types: ' + input);
  }
  return input.trim().toUpperCase() as ACTION_TYPES;
}

export function convertStringToACTIONACTIONTypes(
  input: string,
): ACTION_TYPES[] {
  const typesNames: string[] = input
    .split(',')
    .map((types) => types.trim().toUpperCase());
  const actionTypes: ACTION_TYPES[] = typesNames.filter((typesName) =>
    ACTION_TYPE_ARRAY.includes(typesName as ACTION_TYPES),
  ) as ACTION_TYPES[]; // Type assertion here
  return actionTypes;
}

// export const ACTION_TYPE_QUESTION = {
//   message: 'Select Action Type:',
//   name: 'actionType',
//   type: 'list',
//   choices: ACTION_TYPE_OPTIONS,
//   default: DEFAULT_ACTION_TYPE,
// };

// export const MORE_MESSAGE_QUESTION = {
//   message: 'More Message:',
//   name: 'moreMessage',
//   type: 'confirm',
//   default: false,
// };
