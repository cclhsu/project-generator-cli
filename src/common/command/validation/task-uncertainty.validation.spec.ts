import {
  DEFAULT_TASK_UNCERTAINTY,
  TASK_UNCERTAINTY_TYPES,
} from '../../constant';
import {
  isValidTaskUncertainty,
  validateTaskUncertainty,
  validateTaskUncertaintyDTO,
} from './task-uncertainty.validation';

describe('validateTaskUncertaintyDTO', () => {
  it('should return true for a valid task uncertainty', async () => {
    const taskUncertainty = DEFAULT_TASK_UNCERTAINTY;
    const result = await validateTaskUncertaintyDTO(taskUncertainty);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid task uncertainty format', async () => {
    const taskUncertainty = 'InvalidFormat' as TASK_UNCERTAINTY_TYPES;
    const result = await validateTaskUncertaintyDTO(taskUncertainty);
    expect(result).toEqual(
      expect.stringContaining(
        'Invalid task uncertainty type. Allowed values: NONE, SOME, LOW, MODERATE, HIGH, EXTREME',
      ),
    );
  });
});

describe('isValidTaskUncertainty', () => {
  it('should return true for a valid task uncertainty', () => {
    const taskUncertainty = DEFAULT_TASK_UNCERTAINTY;
    const result = isValidTaskUncertainty(taskUncertainty);
    expect(result).toBe(true);
  });

  it('should return false for an invalid task uncertainty format', () => {
    const taskUncertainty = 'InvalidFormat';
    const result = isValidTaskUncertainty(taskUncertainty);
    expect(result).toBe(false);
  });
});

describe('validateTaskUncertainty', () => {
  it('should return true for a valid task uncertainty', async () => {
    const taskUncertainty = DEFAULT_TASK_UNCERTAINTY;
    const result = await validateTaskUncertainty(taskUncertainty);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid task uncertainty format', async () => {
    const taskUncertainty = 'InvalidFormat';
    const result = await validateTaskUncertainty(taskUncertainty);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid task uncertainty in the type of NONE, SOME, LOW, MODERATE, HIGH, EXTREME',
      ),
    );
  });

  it('should return an error message for an invalid task uncertainty prefix', async () => {
    const taskUncertainty = 'john5.doe';
    const result = await validateTaskUncertainty(taskUncertainty);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid task uncertainty in the type of NONE, SOME, LOW, MODERATE, HIGH, EXTREME',
      ),
    );
  });

  it('should return an error message for an invalid task uncertainty suffix', async () => {
    const taskUncertainty = 'john.doe5';
    const result = await validateTaskUncertainty(taskUncertainty);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid task uncertainty in the type of NONE, SOME, LOW, MODERATE, HIGH, EXTREME',
      ),
    );
  });
});
