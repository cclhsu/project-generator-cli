import { isValidEmail, validateEmail, validateEmailDTO } from './email.validation';

describe('validateEmailDTO', () => {
  it('should return true for a valid email', async () => {
    const email = 'john.doe@mail.com';
    const result = await validateEmailDTO(email);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid email format', async () => {
    const email = 'InvalidFormat';
    const result = await validateEmailDTO(email);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid email format (e.g. john.doe@mail.com)',
      ),
    );
  });

  it('should return an error message for an invalid email prefix', async () => {
    const email = 'htt://xyz.com';
    const result = await validateEmailDTO(email);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid email format (e.g. john.doe@mail.com)',
      ),
    );
  });

  it('should return an error message for an invalid email suffix', async () => {
    const email = 'john.doe@mail.com5';
    const result = await validateEmailDTO(email);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid email format (e.g. john.doe@mail.com)',
      ),
    );
  });
});

describe('isValidEmail', () => {
  it('should return true for a valid email', () => {
    const email = 'john.doe@mail.com';
    const result = isValidEmail(email);
    expect(result).toBe(true);
  });

  it('should return false for an invalid email format', () => {
    const email = 'InvalidFormat';
    const result = isValidEmail(email);
    expect(result).toBe(false);
  });
});

describe('validateEmail', () => {
  it('should return true for a valid email', async () => {
    const email = 'john.doe@mail.com';
    const result = await validateEmail(email);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid email format', async () => {
    const email = 'InvalidFormat';
    const result = await validateEmail(email);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid email format (e.g. john.doe@mail.com)',
      ),
    );
  });

  it('should return an error message for an invalid email prefix', async () => {
    const email = 'htt://xyz.com';
    const result = await validateEmail(email);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid email format (e.g. john.doe@mail.com)',
      ),
    );
  });

  it('should return an error message for an invalid email suffix', async () => {
    const email = 'john.doe@mail.com5';
    const result = await validateEmail(email);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid email format (e.g. john.doe@mail.com)',
      ),
    );
  });
});
