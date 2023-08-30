export type TASK_RISK_TYPES = 'LOW' | 'MEDIUM' | 'HIGH';
export const TASK_RISK_TYPE_ARRAY = ['LOW', 'MEDIUM', 'HIGH'];
export const DEFAULT_TASK_RISK = 'LOW';
export enum TASK_RISK_ENUM {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}
export const TASK_RISK_MAP = {
  [TASK_RISK_ENUM.LOW]: TASK_RISK_ENUM.LOW,
  [TASK_RISK_ENUM.MEDIUM]: TASK_RISK_ENUM.MEDIUM,
  [TASK_RISK_ENUM.HIGH]: TASK_RISK_ENUM.HIGH,
};

export function convertStringToTaskRisk(input: string): TASK_RISK_TYPES {
  if (
    !TASK_RISK_TYPE_ARRAY.includes(
      input.trim().toUpperCase() as TASK_RISK_TYPES,
    )
  ) {
    throw new Error('Invalid task risk: ' + input);
  }
  return input.trim().toUpperCase() as TASK_RISK_TYPES;
}

export function convertStringToTaskRisks(input: string): TASK_RISK_TYPES[] {
  const riskNames: string[] = input
    .split(',')
    .map((risk) => risk.trim().toUpperCase());
  const risks: TASK_RISK_TYPES[] = riskNames.filter((riskName) =>
    TASK_RISK_TYPE_ARRAY.includes(riskName as TASK_RISK_TYPES),
  ) as TASK_RISK_TYPES[]; // Type assertion here
  return risks;
}
