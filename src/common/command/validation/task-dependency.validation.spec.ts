import {
  DEFAULT_TASK_DEPENDENCY,
  TASK_DEPENDENCY_TYPES,
} from '../../constant';
import {
  isValidTaskDependency,
  validateTaskDependency,
  validateTaskDependencyDTO,
} from './task-dependency.validation';

describe('validateTaskDependencyDTO', () => {
  it('should return true for a valid task dependency', async () => {
    const taskDependency = DEFAULT_TASK_DEPENDENCY;
    const result = await validateTaskDependencyDTO(taskDependency);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid task dependency format', async () => {
    const taskDependency = 'InvalidFormat' as TASK_DEPENDENCY_TYPES;
    const result = await validateTaskDependencyDTO(taskDependency);
    expect(result).toEqual(
      expect.stringContaining(
        'Invalid task dependency type. Allowed values: NONE, ALMOST_NONE, SOME, FEW, MORE_THAN_A_FEW, UNKNOWN',
      ),
    );
  });
});

describe('isValidTaskDependency', () => {
  it('should return true for a valid task dependency', () => {
    const taskDependency = DEFAULT_TASK_DEPENDENCY;
    const result = isValidTaskDependency(taskDependency);
    expect(result).toBe(true);
  });

  it('should return false for an invalid task dependency format', () => {
    const taskDependency = 'InvalidFormat';
    const result = isValidTaskDependency(taskDependency);
    expect(result).toBe(false);
  });
});

describe('validateTaskDependency', () => {
  it('should return true for a valid task dependency', async () => {
    const taskDependency = DEFAULT_TASK_DEPENDENCY;
    const result = await validateTaskDependency(taskDependency);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid task dependency format', async () => {
    const taskDependency = 'InvalidFormat';
    const result = await validateTaskDependency(taskDependency);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid task dependency in the type of NONE, ALMOST_NONE, SOME, FEW, MORE_THAN_A_FEW, UNKNOWN',
      ),
    );
  });

  it('should return an error message for an invalid task dependency prefix', async () => {
    const taskDependency = 'john5.doe';
    const result = await validateTaskDependency(taskDependency);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid task dependency in the type of NONE, ALMOST_NONE, SOME, FEW, MORE_THAN_A_FEW, UNKNOWN',
      ),
    );
  });

  it('should return an error message for an invalid task dependency suffix', async () => {
    const taskDependency = 'john.doe5';
    const result = await validateTaskDependency(taskDependency);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid task dependency in the type of NONE, ALMOST_NONE, SOME, FEW, MORE_THAN_A_FEW, UNKNOWN',
      ),
    );
  });
});
