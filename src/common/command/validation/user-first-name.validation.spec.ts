import {
  isValidUserFirstName,
  validateUserFirstName,
  validateUserFirstNameDTO,
} from './user-first-name.validation';

describe('validateUserFirstNameDTO', () => {
  it('should return true for a valid user first name', async () => {
    const userFirstName = 'John';
    const result = await validateUserFirstNameDTO(userFirstName);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid user first name format', async () => {
    const userFirstName = 'InvalidFormat';
    const result = await validateUserFirstNameDTO(userFirstName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid user first name format (e.g. John)',
      ),
    );
  });

  it('should return an error message for an invalid user first name prefix', async () => {
    const userFirstName = 'john5 doe';
    const result = await validateUserFirstNameDTO(userFirstName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid user first name format (e.g. John)',
      ),
    );
  });

  it('should return an error message for an invalid user first name suffix', async () => {
    const userFirstName = 'john5';
    const result = await validateUserFirstNameDTO(userFirstName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid user first name format (e.g. John)',
      ),
    );
  });
});

describe('isValidUserFirstName', () => {
  it('should return true for a valid user first name', () => {
    const userFirstName = 'John';
    const result = isValidUserFirstName(userFirstName);
    expect(result).toBe(true);
  });

  it('should return false for an invalid user first name format', () => {
    const userFirstName = 'InvalidFormat';
    const result = isValidUserFirstName(userFirstName);
    expect(result).toBe(false);
  });
});

describe('validateUserFirstName', () => {
  it('should return true for a valid user first name', async () => {
    const userFirstName = 'John';
    const result = await validateUserFirstName(userFirstName);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid user first name format', async () => {
    const userFirstName = 'InvalidFormat';
    const result = await validateUserFirstName(userFirstName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid user first name format (e.g. John)',
      ),
    );
  });

  it('should return an error message for an invalid user first name prefix', async () => {
    const userFirstName = 'john5 doe';
    const result = await validateUserFirstName(userFirstName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid user first name format (e.g. John)',
      ),
    );
  });

  it('should return an error message for an invalid user first name suffix', async () => {
    const userFirstName = 'john5';
    const result = await validateUserFirstName(userFirstName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid user first name format (e.g. John)',
      ),
    );
  });
});
