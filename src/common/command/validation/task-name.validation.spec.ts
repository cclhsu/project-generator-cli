import {
  isValidTaskName,
  validateTaskName,
  validateTaskNameDTO,
} from './task-name.validation';

describe('validateTaskNameDTO', () => {
  it('should return true for a valid task name', async () => {
    const taskName = 'XYZ Task';
    const result = await validateTaskNameDTO(taskName);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid task name format', async () => {
    const taskName = 'InvalidFormat';
    const result = await validateTaskNameDTO(taskName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid task name format (e.g. XYZ Task)',
      ),
    );
  });

  it('should return an error message for an invalid task name prefix', async () => {
    const taskName = 'xyz5 task';
    const result = await validateTaskNameDTO(taskName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid task name format (e.g. XYZ Task)',
      ),
    );
  });

  it('should return an error message for an invalid task name suffix', async () => {
    const taskName = 'XYZ Task5';
    const result = await validateTaskNameDTO(taskName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid task name format (e.g. XYZ Task)',
      ),
    );
  });
});

describe('isValidTaskName', () => {
  it('should return true for a valid task name', () => {
    const taskName = 'XYZ Task';
    const result = isValidTaskName(taskName);
    expect(result).toBe(true);
  });

  it('should return false for an invalid task name format', () => {
    const taskName = 'InvalidFormat';
    const result = isValidTaskName(taskName);
    expect(result).toBe(false);
  });
});

describe('validateTaskName', () => {
  it('should return true for a valid task name', async () => {
    const taskName = 'XYZ Task';
    const result = await validateTaskName(taskName);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid task name format', async () => {
    const taskName = 'InvalidFormat';
    const result = await validateTaskName(taskName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid task name format (e.g. XYZ Task)',
      ),
    );
  });

  it('should return an error message for an invalid task name prefix', async () => {
    const taskName = 'xyz5 task';
    const result = await validateTaskName(taskName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid task name format (e.g. XYZ Task)',
      ),
    );
  });

  it('should return an error message for an invalid task name suffix', async () => {
    const taskName = 'XYZ Task5';
    const result = await validateTaskName(taskName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid task name format (e.g. XYZ Task)',
      ),
    );
  });
});
