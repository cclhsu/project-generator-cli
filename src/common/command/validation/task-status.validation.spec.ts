import {
  DEFAULT_TASK_STATUS,
  TASK_STATUS_TYPES,
} from '../../constant';
import {
  isValidTaskStatus,
  validateTaskStatus,
  validateTaskStatusDTO,
} from './task-status.validation';

describe('validateTaskStatusDTO', () => {
  it('should return true for a valid task status', async () => {
    const taskStatus = DEFAULT_TASK_STATUS;
    const result = await validateTaskStatusDTO(taskStatus);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid task status format', async () => {
    const taskStatus = 'InvalidFormat' as TASK_STATUS_TYPES;
    const result = await validateTaskStatusDTO(taskStatus);
    expect(result).toEqual(
      expect.stringContaining(
        'Invalid task status type. Allowed values: TODO, IN_PROGRESS, DONE',
      ),
    );
  });
});

describe('isValidTaskStatus', () => {
  it('should return true for a valid task status', () => {
    const taskStatus = DEFAULT_TASK_STATUS;
    const result = isValidTaskStatus(taskStatus);
    expect(result).toBe(true);
  });

  it('should return false for an invalid task status format', () => {
    const taskStatus = 'InvalidFormat';
    const result = isValidTaskStatus(taskStatus);
    expect(result).toBe(false);
  });
});

describe('validateTaskStatus', () => {
  it('should return true for a valid task status', async () => {
    const taskStatus = DEFAULT_TASK_STATUS;
    const result = await validateTaskStatus(taskStatus);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid task status format', async () => {
    const taskStatus = 'InvalidFormat';
    const result = await validateTaskStatus(taskStatus);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid task status in the type of TODO, IN_PROGRESS, DONE',
      ),
    );
  });

  it('should return an error message for an invalid task status prefix', async () => {
    const taskStatus = 'john5.doe';
    const result = await validateTaskStatus(taskStatus);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid task status in the type of TODO, IN_PROGRESS, DONE',
      ),
    );
  });

  it('should return an error message for an invalid task status suffix', async () => {
    const taskStatus = 'john.doe5';
    const result = await validateTaskStatus(taskStatus);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid task status in the type of TODO, IN_PROGRESS, DONE',
      ),
    );
  });
});
