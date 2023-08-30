import {
  DEFAULT_TASK_PRIORITY,
  TASK_PRIORITY_TYPES,
} from '../../constant';
import {
  isValidTaskPriority,
  validateTaskPriority,
  validateTaskPriorityDTO,
} from './task-priority.validation';

describe('validateTaskPriorityDTO', () => {
  it('should return true for a valid task priority', async () => {
    const taskPriority = DEFAULT_TASK_PRIORITY;
    const result = await validateTaskPriorityDTO(taskPriority);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid task priority format', async () => {
    const taskPriority = 'InvalidFormat' as TASK_PRIORITY_TYPES;
    const result = await validateTaskPriorityDTO(taskPriority);
    expect(result).toEqual(
      expect.stringContaining(
        'Invalid task priority type. Allowed values: P0, P1, P2, P3',
      ),
    );
  });
});

describe('isValidTaskPriority', () => {
  it('should return true for a valid task priority', () => {
    const taskPriority = DEFAULT_TASK_PRIORITY;
    const result = isValidTaskPriority(taskPriority);
    expect(result).toBe(true);
  });

  it('should return false for an invalid task priority format', () => {
    const taskPriority = 'InvalidFormat';
    const result = isValidTaskPriority(taskPriority);
    expect(result).toBe(false);
  });
});

describe('validateTaskPriority', () => {
  it('should return true for a valid task priority', async () => {
    const taskPriority = DEFAULT_TASK_PRIORITY;
    const result = await validateTaskPriority(taskPriority);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid task priority format', async () => {
    const taskPriority = 'InvalidFormat';
    const result = await validateTaskPriority(taskPriority);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid task priority in the type of P0, P1, P2, P3',
      ),
    );
  });

  it('should return an error message for an invalid task priority prefix', async () => {
    const taskPriority = 'john5.doe';
    const result = await validateTaskPriority(taskPriority);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid task priority in the type of P0, P1, P2, P3',
      ),
    );
  });

  it('should return an error message for an invalid task priority suffix', async () => {
    const taskPriority = 'john.doe5';
    const result = await validateTaskPriority(taskPriority);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid task priority in the type of P0, P1, P2, P3',
      ),
    );
  });
});
