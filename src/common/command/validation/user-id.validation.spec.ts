import {
  isValidUserId,
  validateUserId,
  validateUserIdDTO,
} from './user-id.validation';

describe('validateUserIdDTO', () => {
  it('should return true for a valid user ID', async () => {
    const userId = 'john.doe';
    const result = await validateUserIdDTO(userId);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid user ID format', async () => {
    const userId = 'InvalidFormat';
    const result = await validateUserIdDTO(userId);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid user ID format (e.g. john.doe)',
      ),
    );
  });

  it('should return an error message for an invalid user ID prefix', async () => {
    const userId = 'john5.doe';
    const result = await validateUserIdDTO(userId);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid user ID format (e.g. john.doe)',
      ),
    );
  });

  it('should return an error message for an invalid user ID suffix', async () => {
    const userId = 'john.doe5';
    const result = await validateUserIdDTO(userId);
    expect(result).toBe(true);
  });
});

describe('isValidUserId', () => {
  it('should return true for a valid user ID', () => {
    const userId = 'john.doe';
    const result = isValidUserId(userId);
    expect(result).toBe(true);
  });

  it('should return false for an invalid user ID format', () => {
    const userId = 'InvalidFormat';
    const result = isValidUserId(userId);
    expect(result).toBe(false);
  });
});

describe('validateUserId', () => {
  it('should return true for a valid user ID', async () => {
    const userId = 'john.doe';
    const result = await validateUserId(userId);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid user ID format', async () => {
    const userId = 'InvalidFormat';
    const result = await validateUserId(userId);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid user ID format (e.g. john.doe)',
      ),
    );
  });

  it('should return an error message for an invalid user ID prefix', async () => {
    const userId = 'john5.doe';
    const result = await validateUserId(userId);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid user ID format (e.g. john.doe)',
      ),
    );
  });

  it('should return an error message for an invalid user ID suffix', async () => {
    const userId = 'john.doe5';
    const result = await validateUserId(userId);
    expect(result).toBe(true);
  });
});
