import {
  isValidIterationId,
  validateIterationId,
  validateIterationIdDTO,
} from './iteration-id.validation';

describe('validateIterationIdDTO', () => {
  it('should return true for a valid iteration ID', async () => {
    const iterationId = 'ABC:2020/01/01-2020/12/31';
    const result = await validateIterationIdDTO(iterationId);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid iteration ID format', async () => {
    const iterationId = 'InvalidFormat';
    const result = await validateIterationIdDTO(iterationId);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid iteration ID format (e.g. ABC:2020/01/01-2020/12/31)',
      ),
    );
  });

  it('should return an error message for an invalid iteration ID prefix', async () => {
    const iterationId = 'xyz:2020/01/01-2020/12/31';
    const result = await validateIterationIdDTO(iterationId);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid iteration ID format (e.g. ABC:2020/01/01-2020/12/31)',
      ),
    );
  });

  it('should return an error message for an invalid iteration ID suffix', async () => {
    const iterationId = 'ABC:2020/01/01-2020/12/31#1';
    const result = await validateIterationIdDTO(iterationId);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid iteration ID format (e.g. ABC:2020/01/01-2020/12/31)',
      ),
    );
  });
});

describe('isValidIterationId', () => {
  it('should return true for a valid iteration ID', () => {
    const iterationId = 'ABC:2020/01/01-2020/12/31';
    const result = isValidIterationId(iterationId);
    expect(result).toBe(true);
  });

  it('should return false for an invalid iteration ID format', () => {
    const iterationId = 'InvalidFormat';
    const result = isValidIterationId(iterationId);
    expect(result).toBe(false);
  });
});

describe('validateIterationId', () => {
  it('should return true for a valid iteration ID', async () => {
    const iterationId = 'ABC:2020/01/01-2020/12/31';
    const result = await validateIterationId(iterationId);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid iteration ID format', async () => {
    const iterationId = 'InvalidFormat';
    const result = await validateIterationId(iterationId);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid iteration ID format (e.g. ABC:2020/01/01-2020/12/31)',
      ),
    );
  });

  it('should return an error message for an invalid iteration ID prefix', async () => {
    const iterationId = 'xyz:2020/01/01-2020/12/31';
    const result = await validateIterationId(iterationId);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid iteration ID format (e.g. ABC:2020/01/01-2020/12/31)',
      ),
    );
  });

  it('should return an error message for an invalid iteration ID suffix', async () => {
    const iterationId = 'ABC:2020/01/01-2020/12/31#1';
    const result = await validateIterationId(iterationId);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid iteration ID format (e.g. ABC:2020/01/01-2020/12/31)',
      ),
    );
  });
});
