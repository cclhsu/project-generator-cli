import {
  isValidUserFullName,
  validateUserFullName,
  validateUserFullNameDTO,
} from './user-full-name.validation';

describe('validateUserFullNameDTO', () => {
  it('should return true for a valid user full name', async () => {
    const userFullName = 'John Doe';
    const result = await validateUserFullNameDTO(userFullName);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid user full name format', async () => {
    const userFullName = 'InvalidFormat';
    const result = await validateUserFullNameDTO(userFullName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid user full name format (e.g. John Doe)',
      ),
    );
  });

  it('should return an error message for an invalid user full name prefix', async () => {
    const userFullName = 'john5 doe';
    const result = await validateUserFullNameDTO(userFullName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid user full name format (e.g. John Doe)',
      ),
    );
  });

  it('should return an error message for an invalid user full name suffix', async () => {
    const userFullName = 'john doe5';
    const result = await validateUserFullNameDTO(userFullName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid user full name format (e.g. John Doe)',
      ),
    );
  });
});

describe('isValidUserFullName', () => {
  it('should return true for a valid user full name', () => {
    const userFullName = 'John Doe';
    const result = isValidUserFullName(userFullName);
    expect(result).toBe(true);
  });

  it('should return false for an invalid user full name format', () => {
    const userFullName = 'InvalidFormat';
    const result = isValidUserFullName(userFullName);
    expect(result).toBe(false);
  });
});

describe('validateUserFullName', () => {
  it('should return true for a valid user full name', async () => {
    const userFullName = 'John Doe';
    const result = await validateUserFullName(userFullName);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid user full name format', async () => {
    const userFullName = 'InvalidFormat';
    const result = await validateUserFullName(userFullName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid user full name format (e.g. John Doe)',
      ),
    );
  });

  it('should return an error message for an invalid user full name prefix', async () => {
    const userFullName = 'john5 doe';
    const result = await validateUserFullName(userFullName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid user full name format (e.g. John Doe)',
      ),
    );
  });

  it('should return an error message for an invalid user full name suffix', async () => {
    const userFullName = 'john doe5';
    const result = await validateUserFullName(userFullName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid user full name format (e.g. John Doe)',
      ),
    );
  });
});
