export type TASK_PRIORITY_TYPES = 'P0' | 'P1' | 'P2' | 'P3';
export const TASK_PRIORITIES = ['P0', 'P1', 'P2', 'P3'];
export const DEFAULT_TASK_PRIORITY = 'P3';
export enum TASK_PRIORITY_ENUM {
  P0 = 'P0', // Critical priority - Requires immediate attention and action
  P1 = 'P1', // High priority - Important and needs to be addressed soon
  P2 = 'P2', // Medium priority - Significant but can be handled with some flexibility
  P3 = 'P3', // Low priority - Less critical and can be addressed later
}
export const TASK_PRIORITY_MAP = {
  [TASK_PRIORITY_ENUM.P0]: TASK_PRIORITY_ENUM.P0,
  [TASK_PRIORITY_ENUM.P1]: TASK_PRIORITY_ENUM.P1,
  [TASK_PRIORITY_ENUM.P2]: TASK_PRIORITY_ENUM.P2,
  [TASK_PRIORITY_ENUM.P3]: TASK_PRIORITY_ENUM.P3,
};
