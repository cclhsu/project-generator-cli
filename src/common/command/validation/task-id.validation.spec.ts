import {
  isValidTaskId,
  validateTaskId,
  validateTaskIdDTO,
} from './task-id.validation';

describe('validateTaskIdDTO', () => {
  it('should return true for a valid task ID', async () => {
    const taskId = 'ABC-1234';
    const result = await validateTaskIdDTO(taskId);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid task ID format', async () => {
    const taskId = 'InvalidFormat';
    const result = await validateTaskIdDTO(taskId);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid task ID format (e.g. ABC-1234)',
      ),
    );
  });

  it('should return an error message for an invalid task ID prefix', async () => {
    const taskId = 'AXYZ-1234';
    const result = await validateTaskIdDTO(taskId);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid task ID format (e.g. ABC-1234)',
      ),
    );
  });

  it('should return an error message for an invalid task ID suffix', async () => {
    const taskId = 'ABC-12345';
    const result = await validateTaskIdDTO(taskId);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid task ID format (e.g. ABC-1234)',
      ),
    );
  });
});

describe('isValidTaskId', () => {
  it('should return true for a valid task ID', () => {
    const taskId = 'ABC-1234';
    const result = isValidTaskId(taskId);
    expect(result).toBe(true);
  });

  it('should return false for an invalid task ID format', () => {
    const taskId = 'InvalidFormat';
    const result = isValidTaskId(taskId);
    expect(result).toBe(false);
  });
});

describe('validateTaskId', () => {
  it('should return true for a valid task ID', async () => {
    const taskId = 'ABC-1234';
    const result = await validateTaskId(taskId);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid task ID format', async () => {
    const taskId = 'InvalidFormat';
    const result = await validateTaskId(taskId);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid task ID format (e.g. ABC-1234)',
      ),
    );
  });

  it('should return an error message for an invalid task ID prefix', async () => {
    const taskId = 'AXYZ-1234';
    const result = await validateTaskId(taskId);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid task ID format (e.g. ABC-1234)',
      ),
    );
  });

  it('should return an error message for an invalid task ID suffix', async () => {
    const taskId = 'ABC-12345';
    const result = await validateTaskId(taskId);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid task ID format (e.g. ABC-1234)',
      ),
    );
  });
});
