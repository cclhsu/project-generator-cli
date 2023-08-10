export type COMPLEXITY_LEVEL_TYPES =
  | '1 (XS)'
  | '2 (S)'
  | '3 (M)'
  | '5 (L)'
  | '8 (XL)'
  | '13 (I)';
export const COMPLEXITY_LEVELS = [
  '1 (XS)',
  '2 (S)',
  '3 (M)',
  '5 (L)',
  '8 (XL)',
  '13 (I)',
];
export const DEFAULT_COMPLEXITY_LEVEL = '1 (XS)';
export enum COMPLEXITY_LEVELS_ENUM {
  XS = '1 (XS)', // 1
  S = '2 (S)', // 2
  M = '3 (M)', // 3
  L = '5 (L)', // 5
  XL = '8 (XL)', // 8
  I = '13 (I)', // 13
}
export const COMPLEXITY_LEVELS_MAP = {
  [COMPLEXITY_LEVELS_ENUM.XS]: 1,
  [COMPLEXITY_LEVELS_ENUM.S]: 2,
  [COMPLEXITY_LEVELS_ENUM.M]: 3,
  [COMPLEXITY_LEVELS_ENUM.L]: 5,
  [COMPLEXITY_LEVELS_ENUM.XL]: 8,
  [COMPLEXITY_LEVELS_ENUM.I]: 13,
};
