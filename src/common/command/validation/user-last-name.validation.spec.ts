import {
  isValidUserLastName,
  validateUserLastName,
  validateUserLastNameDTO,
} from './user-last-name.validation';

describe('validateUserLastNameDTO', () => {
  it('should return true for a valid user last name', async () => {
    const userLastName = 'Doe';
    const result = await validateUserLastNameDTO(userLastName);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid user last name format', async () => {
    const userLastName = 'InvalidFormat';
    const result = await validateUserLastNameDTO(userLastName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid user last name format (e.g. Doe)',
      ),
    );
  });

  it('should return an error message for an invalid user last name prefix', async () => {
    const userLastName = 'john5 doe';
    const result = await validateUserLastNameDTO(userLastName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid user last name format (e.g. Doe)',
      ),
    );
  });

  it('should return an error message for an invalid user last name suffix', async () => {
    const userLastName = 'doe5';
    const result = await validateUserLastNameDTO(userLastName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid user last name format (e.g. Doe)',
      ),
    );
  });
});

describe('isValidUserLastName', () => {
  it('should return true for a valid user last name', () => {
    const userLastName = 'Doe';
    const result = isValidUserLastName(userLastName);
    expect(result).toBe(true);
  });

  it('should return false for an invalid user last name format', () => {
    const userLastName = 'InvalidFormat';
    const result = isValidUserLastName(userLastName);
    expect(result).toBe(false);
  });
});

describe('validateUserLastName', () => {
  it('should return true for a valid user last name', async () => {
    const userLastName = 'Doe';
    const result = await validateUserLastName(userLastName);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid user last name format', async () => {
    const userLastName = 'InvalidFormat';
    const result = await validateUserLastName(userLastName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid user last name format (e.g. Doe)',
      ),
    );
  });

  it('should return an error message for an invalid user last name prefix', async () => {
    const userLastName = 'john5 doe';
    const result = await validateUserLastName(userLastName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid user last name format (e.g. Doe)',
      ),
    );
  });

  it('should return an error message for an invalid user last name suffix', async () => {
    const userLastName = 'doe5';
    const result = await validateUserLastName(userLastName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid user last name format (e.g. Doe)',
      ),
    );
  });
});
