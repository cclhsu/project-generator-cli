import {
  DEFAULT_TASK_EFFORT,
  TASK_EFFORT_TYPES,
} from '../../constant';
import {
  isValidTaskEffort,
  validateTaskEffort,
  validateTaskEffortDTO,
} from './task-effort.validation';

describe('validateTaskEffortDTO', () => {
  it('should return true for a valid task effort', async () => {
    const taskEffort = DEFAULT_TASK_EFFORT;
    const result = await validateTaskEffortDTO(taskEffort);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid task effort format', async () => {
    const taskEffort = 'InvalidFormat' as TASK_EFFORT_TYPES;
    const result = await validateTaskEffortDTO(taskEffort);
    expect(result).toEqual(
      expect.stringContaining(
        'Invalid task effort type. Allowed values: XS, S, M, L, XL, I',
      ),
    );
  });
});

describe('isValidTaskEffort', () => {
  it('should return true for a valid task effort', () => {
    const taskEffort = DEFAULT_TASK_EFFORT;
    const result = isValidTaskEffort(taskEffort);
    expect(result).toBe(true);
  });

  it('should return false for an invalid task effort format', () => {
    const taskEffort = 'InvalidFormat';
    const result = isValidTaskEffort(taskEffort);
    expect(result).toBe(false);
  });
});

describe('validateTaskEffort', () => {
  it('should return true for a valid task effort', async () => {
    const taskEffort = DEFAULT_TASK_EFFORT;
    const result = await validateTaskEffort(taskEffort);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid task effort format', async () => {
    const taskEffort = 'InvalidFormat';
    const result = await validateTaskEffort(taskEffort);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid task effort in the type of XS, S, M, L, XL, I',
      ),
    );
  });

  it('should return an error message for an invalid task effort prefix', async () => {
    const taskEffort = 'john5.doe';
    const result = await validateTaskEffort(taskEffort);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid task effort in the type of XS, S, M, L, XL, I',
      ),
    );
  });

  it('should return an error message for an invalid task effort suffix', async () => {
    const taskEffort = 'john.doe5';
    const result = await validateTaskEffort(taskEffort);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid task effort in the type of XS, S, M, L, XL, I',
      ),
    );
  });
});
