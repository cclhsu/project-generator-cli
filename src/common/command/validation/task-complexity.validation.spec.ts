import {
  DEFAULT_TASK_COMPLEXITY,
  TASK_COMPLEXITY_TYPES,
} from '../../constant';
import {
  isValidTaskComplexity,
  validateTaskComplexity,
  validateTaskComplexityDTO,
} from './task-complexity.validation';

describe('validateTaskComplexityDTO', () => {
  it('should return true for a valid task complexity', async () => {
    const taskComplexity = DEFAULT_TASK_COMPLEXITY;
    const result = await validateTaskComplexityDTO(taskComplexity);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid task complexity format', async () => {
    const taskComplexity = 'InvalidFormat' as TASK_COMPLEXITY_TYPES;
    const result = await validateTaskComplexityDTO(taskComplexity);
    expect(result).toEqual(
      expect.stringContaining(
        'Invalid task complexity type. Allowed values: XS, S, M, L, XL, I',
      ),
    );
  });
});

describe('isValidTaskComplexity', () => {
  it('should return true for a valid task complexity', () => {
    const taskComplexity = DEFAULT_TASK_COMPLEXITY;
    const result = isValidTaskComplexity(taskComplexity);
    expect(result).toBe(true);
  });

  it('should return false for an invalid task complexity format', () => {
    const taskComplexity = 'InvalidFormat';
    const result = isValidTaskComplexity(taskComplexity);
    expect(result).toBe(false);
  });
});

describe('validateTaskComplexity', () => {
  it('should return true for a valid task complexity', async () => {
    const taskComplexity = DEFAULT_TASK_COMPLEXITY;
    const result = await validateTaskComplexity(taskComplexity);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid task complexity format', async () => {
    const taskComplexity = 'InvalidFormat';
    const result = await validateTaskComplexity(taskComplexity);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid task complexity in the type of XS, S, M, L, XL, I',
      ),
    );
  });

  it('should return an error message for an invalid task complexity prefix', async () => {
    const taskComplexity = 'john5.doe';
    const result = await validateTaskComplexity(taskComplexity);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid task complexity in the type of XS, S, M, L, XL, I',
      ),
    );
  });

  it('should return an error message for an invalid task complexity suffix', async () => {
    const taskComplexity = 'john.doe5';
    const result = await validateTaskComplexity(taskComplexity);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid task complexity in the type of XS, S, M, L, XL, I',
      ),
    );
  });
});
