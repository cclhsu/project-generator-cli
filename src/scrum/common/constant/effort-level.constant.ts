export type EFFORT_LEVELS_TYPES = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'I';
export const EFFORT_LEVELS = ['XS', 'S', 'M', 'L', 'XL', 'I'];
export const DEFAULT_EFFORT_LEVEL = 'XS';
export enum EFFORT_LEVEL_ENUM {
  XS = 'Half a Day', // 1
  S = 'A Day', // 2
  M = 'Up to 3 Days', // 3
  L = 'Up to 5 Days', // 5
  XL = 'Up to 10 days', // 8
  I = 'More than 10 days', // 13
}
export const EFFORT_LEVELS_MAP = {
  [EFFORT_LEVEL_ENUM.XS]: 1,
  [EFFORT_LEVEL_ENUM.S]: 2,
  [EFFORT_LEVEL_ENUM.M]: 3,
  [EFFORT_LEVEL_ENUM.L]: 5,
  [EFFORT_LEVEL_ENUM.XL]: 8,
  [EFFORT_LEVEL_ENUM.I]: 13,
};
