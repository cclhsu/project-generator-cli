import { DEFAULT_TASK_TYPE, TASK_TYPES } from '../../constant';
import {
  isValidTaskType,
  validateTaskType,
  validateTaskTypeDTO,
} from './task-types.validation';

describe('validateTaskTypeDTO', () => {
  it('should return true for a valid task type', async () => {
    const taskType = DEFAULT_TASK_TYPE;
    const result = await validateTaskTypeDTO(taskType);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid task type format', async () => {
    const taskType = 'InvalidFormat' as TASK_TYPES;
    const result = await validateTaskTypeDTO(taskType);
    expect(result).toEqual(
      expect.stringContaining(
        'Invalid task type type. Allowed values: EPIC, STORY, TASK, BUG, FEATURE, IMPROVEMENT, SUB_TASK',
      ),
    );
  });
});

describe('isValidTaskType', () => {
  it('should return true for a valid task type', () => {
    const taskType = DEFAULT_TASK_TYPE;
    const result = isValidTaskType(taskType);
    expect(result).toBe(true);
  });

  it('should return false for an invalid task type format', () => {
    const taskType = 'InvalidFormat';
    const result = isValidTaskType(taskType);
    expect(result).toBe(false);
  });
});

describe('validateTaskType', () => {
  it('should return true for a valid task type', async () => {
    const taskType = DEFAULT_TASK_TYPE;
    const result = await validateTaskType(taskType);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid task type format', async () => {
    const taskType = 'InvalidFormat';
    const result = await validateTaskType(taskType);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid task types in the type of EPIC, STORY, TASK, BUG, FEATURE, IMPROVEMENT, SUB_TASK',
      ),
    );
  });

  it('should return an error message for an invalid task type prefix', async () => {
    const taskType = 'john5.doe';
    const result = await validateTaskType(taskType);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid task types in the type of EPIC, STORY, TASK, BUG, FEATURE, IMPROVEMENT, SUB_TASK',
      ),
    );
  });

  it('should return an error message for an invalid task type suffix', async () => {
    const taskType = 'john.doe5';
    const result = await validateTaskType(taskType);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid task types in the type of EPIC, STORY, TASK, BUG, FEATURE, IMPROVEMENT, SUB_TASK',
      ),
    );
  });
});
