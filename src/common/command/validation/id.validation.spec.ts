import { isValidID, validateId, validateIdDTO } from './id.validation';

describe('validateIdDTO', () => {
  it('should return true for a valid ID', async () => {
    const ID = 'ABC-1234';
    const result = await validateIdDTO(ID);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid ID format', async () => {
    const ID = 'InvalidFormat';
    const result = await validateIdDTO(ID);
    expect(result).toEqual(
      expect.stringContaining('Please enter a valid ID format (e.g. ABC-1234)'),
    );
  });

  it('should return an error message for an invalid ID prefix', async () => {
    const ID = 'ABCD-1234';
    const result = await validateIdDTO(ID);
    expect(result).toEqual(
      expect.stringContaining('Please enter a valid ID format (e.g. ABC-1234)'),
    );
  });

  it('should return an error message for an invalid ID suffix', async () => {
    const ID = 'ABC-12345';
    const result = await validateIdDTO(ID);
    expect(result).toEqual(
      expect.stringContaining('Please enter a valid ID format (e.g. ABC-1234)'),
    );
  });
});

describe('isValidID', () => {
  it('should return true for a valid ID', () => {
    const ID = 'ABC-1234';
    const result = isValidID(ID);
    expect(result).toBe(true);
  });

  it('should return false for an invalid ID format', () => {
    const ID = 'InvalidFormat';
    const result = isValidID(ID);
    expect(result).toBe(false);
  });
});

describe('validateId', () => {
  it('should return true for a valid ID', async () => {
    const ID = 'ABC-1234';
    const result = await validateId(ID);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid ID format', async () => {
    const ID = 'InvalidFormat';
    const result = await validateId(ID);
    expect(result).toEqual(
      expect.stringContaining('Please enter a valid ID format (e.g. ABC-1234)'),
    );
  });

  it('should return an error message for an invalid ID prefix', async () => {
    const ID = 'ABCD-1234';
    const result = await validateId(ID);
    expect(result).toEqual(
      expect.stringContaining('Please enter a valid ID format (e.g. ABC-1234)'),
    );
  });

  it('should return an error message for an invalid ID suffix', async () => {
    const ID = 'ABC-12345';
    const result = await validateId(ID);
    expect(result).toEqual(
      expect.stringContaining('Please enter a valid ID format (e.g. ABC-1234)'),
    );
  });
});
