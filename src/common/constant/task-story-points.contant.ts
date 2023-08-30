export type STORY_POINTS_CALCULATION_METHODS_TYPE = 'SUM' | 'MAX' | 'AVERAGE';
export const STORY_POINTS_CALCULATION_METHODS_TYPE_ARRAY = [
  'SUM',
  'MAX',
  'AVERAGE',
];
export const DEFAULT_STORY_POINTS_CALCULATION_METHOD = 'SUM';
export enum STORY_POINTS_CALCULATION_METHODS_ENUM {
  SUM = 'SUM',
  MAX = 'MAX',
  AVERAGE = 'AVERAGE',
}
export const STORY_POINTS_CALCULATION_METHODS_MAP = {
  [STORY_POINTS_CALCULATION_METHODS_ENUM.SUM]: 1,
  [STORY_POINTS_CALCULATION_METHODS_ENUM.MAX]: 2,
  [STORY_POINTS_CALCULATION_METHODS_ENUM.AVERAGE]: 3,
};

export function convertStringToStoryPointCalculationMethod(
  input: string,
): STORY_POINTS_CALCULATION_METHODS_TYPE {
  if (
    !STORY_POINTS_CALCULATION_METHODS_TYPE_ARRAY.includes(
      input.trim().toUpperCase() as STORY_POINTS_CALCULATION_METHODS_TYPE,
    )
  ) {
    throw new Error('Invalid task uncertainty: ' + input);
  }
  return input.trim().toUpperCase() as STORY_POINTS_CALCULATION_METHODS_TYPE;
}

export function convertStringToStoryPointCalculationMethods(
  input: string,
): STORY_POINTS_CALCULATION_METHODS_TYPE[] {
  const storyPointCalculationMethods: string[] = input
    .split(',')
    .map((uncertainty) => uncertainty.trim().toUpperCase());
  const storyPointMethods: STORY_POINTS_CALCULATION_METHODS_TYPE[] =
    storyPointCalculationMethods.filter((storyPointCalculationMethod) =>
      STORY_POINTS_CALCULATION_METHODS_TYPE_ARRAY.includes(
        storyPointCalculationMethod as STORY_POINTS_CALCULATION_METHODS_TYPE,
      ),
    ) as STORY_POINTS_CALCULATION_METHODS_TYPE[]; // Type assertion here
  return storyPointMethods;
}
