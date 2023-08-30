import { isValidUuid, validateUuid, validateUuidDTO } from './uuid.validation';

describe('validateUuidDTO', () => {
  it('should return true for a valid UUID', async () => {
    const UUID = '00000000-0000-0000-0000-000000000000';
    const result = await validateUuidDTO(UUID);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid UUID format', async () => {
    const UUID = 'InvalidFormat';
    const result = await validateUuidDTO(UUID);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid UUID format (e.g. 00000000-0000-0000-0000-000000000000)',
      ),
    );
  });

  it('should return an error message for an invalid UUID prefix', async () => {
    const UUID = '1';
    const result = await validateUuidDTO(UUID);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid UUID format (e.g. 00000000-0000-0000-0000-000000000000)',
      ),
    );
  });

  it('should return an error message for an invalid UUID suffix', async () => {
    const UUID = 'ABC-1234';
    const result = await validateUuidDTO(UUID);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid UUID format (e.g. 00000000-0000-0000-0000-000000000000)',
      ),
    );
  });
});

describe('isValidUuid', () => {
  it('should return true for a valid UUID', () => {
    const UUID = '00000000-0000-0000-0000-000000000000';
    const result = isValidUuid(UUID);
    expect(result).toBe(true);
  });

  it('should return false for an invalid UUID format', () => {
    const UUID = 'InvalidFormat';
    const result = isValidUuid(UUID);
    expect(result).toBe(false);
  });
});

describe('validateUuid', () => {
  it('should return true for a valid UUID', async () => {
    const UUID = '00000000-0000-0000-0000-000000000000';
    const result = await validateUuid(UUID);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid UUID format', async () => {
    const UUID = 'InvalidFormat';
    const result = await validateUuid(UUID);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid UUID format (e.g. 00000000-0000-0000-0000-000000000000)',
      ),
    );
  });

  it('should return an error message for an invalid UUID prefix', async () => {
    const UUID = '1';
    const result = await validateUuid(UUID);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid UUID format (e.g. 00000000-0000-0000-0000-000000000000)',
      ),
    );
  });

  it('should return an error message for an invalid UUID suffix', async () => {
    const UUID = 'ABC-1234';
    const result = await validateUuid(UUID);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid UUID format (e.g. 00000000-0000-0000-0000-000000000000)',
      ),
    );
  });
});
