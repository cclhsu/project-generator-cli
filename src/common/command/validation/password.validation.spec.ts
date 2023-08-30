import {
  isValidPassword,
  validatePassword,
  validatePasswordDTO,
} from './password.validation';

describe('validatePasswordDTO', () => {
  it('should return true for a valid password', async () => {
    const password = 'P@ssw0rd123';
    const result = await validatePasswordDTO(password);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid password format', async () => {
    const password = 'InvalidFormat';
    const result = await validatePasswordDTO(password);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid password format (e.g. P@ssw0rd123)',
      ),
    );
  });

  it('should return an error message for an invalid password prefix', async () => {
    const password = '12345678';
    const result = await validatePasswordDTO(password);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid password format (e.g. P@ssw0rd123)',
      ),
    );
  });

  it('should return an error message for an invalid password suffix', async () => {
    const password = 'abcd1234';
    const result = await validatePasswordDTO(password);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid password format (e.g. P@ssw0rd123)',
      ),
    );
  });
});

describe('isValidPassword', () => {
  it('should return true for a valid password', () => {
    const password = 'P@ssw0rd123';
    const result = isValidPassword(password);
    expect(result).toBe(true);
  });

  it('should return false for an invalid password format', () => {
    const password = 'InvalidFormat';
    const result = isValidPassword(password);
    expect(result).toBe(false);
  });
});

describe('validatePassword', () => {
  it('should return true for a valid password', async () => {
    const password = 'P@ssw0rd123';
    const result = await validatePassword(password);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid password format', async () => {
    const password = 'InvalidFormat';
    const result = await validatePassword(password);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid password format (e.g. P@ssw0rd123)',
      ),
    );
  });

  it('should return an error message for an invalid password prefix', async () => {
    const password = 'abcd1234';
    const result = await validatePassword(password);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid password format (e.g. P@ssw0rd123)',
      ),
    );
  });

  it('should return an error message for an invalid password suffix', async () => {
    const password = '12345678';
    const result = await validatePassword(password);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid password format (e.g. P@ssw0rd123)',
      ),
    );
  });
});
