import {
  DEFAULT_TASK_RISK,
  TASK_RISK_TYPES,
} from '../../constant';
import {
  isValidTaskRisk,
  validateTaskRisk,
  validateTaskRiskDTO,
} from './task-risk.validation';

describe('validateTaskRiskDTO', () => {
  it('should return true for a valid task risk', async () => {
    const taskRisk = DEFAULT_TASK_RISK;
    const result = await validateTaskRiskDTO(taskRisk);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid task risk format', async () => {
    const taskRisk = 'InvalidFormat' as TASK_RISK_TYPES;
    const result = await validateTaskRiskDTO(taskRisk);
    expect(result).toEqual(
      expect.stringContaining(
        'Invalid task risk type. Allowed values: LOW, MEDIUM, HIGH',
      ),
    );
  });
});

describe('isValidTaskRisk', () => {
  it('should return true for a valid task risk', () => {
    const taskRisk = DEFAULT_TASK_RISK;
    const result = isValidTaskRisk(taskRisk);
    expect(result).toBe(true);
  });

  it('should return false for an invalid task risk format', () => {
    const taskRisk = 'InvalidFormat';
    const result = isValidTaskRisk(taskRisk);
    expect(result).toBe(false);
  });
});

describe('validateTaskRisk', () => {
  it('should return true for a valid task risk', async () => {
    const taskRisk = DEFAULT_TASK_RISK;
    const result = await validateTaskRisk(taskRisk);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid task risk format', async () => {
    const taskRisk = 'InvalidFormat';
    const result = await validateTaskRisk(taskRisk);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid task risk in the type of LOW, MEDIUM, HIGH',
      ),
    );
  });

  it('should return an error message for an invalid task risk prefix', async () => {
    const taskRisk = 'john5.doe';
    const result = await validateTaskRisk(taskRisk);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid task risk in the type of LOW, MEDIUM, HIGH',
      ),
    );
  });

  it('should return an error message for an invalid task risk suffix', async () => {
    const taskRisk = 'john.doe5';
    const result = await validateTaskRisk(taskRisk);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid task risk in the type of LOW, MEDIUM, HIGH',
      ),
    );
  });
});
