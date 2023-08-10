export type TASK_TYPES =
  | 'EPIC'
  | 'STORY'
  | 'TASK'
  | 'BUG'
  | 'FEATURE'
  | 'IMPROVEMENT'
  | 'SUB_TASK';
export const TASK_TYPES = [
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
