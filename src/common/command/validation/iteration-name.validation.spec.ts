import {
  isValidIterationName,
  validateIterationName,
  validateIterationNameDTO,
} from './iteration-name.validation';

describe('validateIterationNameDTO', () => {
  it('should return true for a valid iteration name', async () => {
    const iterationName = 'XYZ:2020/01/01-2022/12/31 Iteration';
    const result = await validateIterationNameDTO(iterationName);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid iteration name format', async () => {
    const iterationName = 'InvalidFormat';
    const result = await validateIterationNameDTO(iterationName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid iteration name format (e.g. PPP:YYYY/MM/DD-YYYY/MM/DD Iteration)',
      ),
    );
  });

  it('should return an error message for an invalid iteration name prefix', async () => {
    const iterationName = 'XYZ:2020/01/01-2022/12/31';
    const result = await validateIterationNameDTO(iterationName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid iteration name format (e.g. PPP:YYYY/MM/DD-YYYY/MM/DD Iteration)',
      ),
    );
  });

  it('should return an error message for an invalid iteration name suffix', async () => {
    const iterationName = 'xyz:2020/01/01-2022/12/31 Iteration';
    const result = await validateIterationNameDTO(iterationName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid iteration name format (e.g. PPP:YYYY/MM/DD-YYYY/MM/DD Iteration)',
      ),
    );
  });
});

describe('isValidIterationName', () => {
  it('should return true for a valid iteration name', () => {
    const iterationName = 'XYZ:2020/01/01-2022/12/31 Iteration';
    const result = isValidIterationName(iterationName);
    expect(result).toBe(true);
  });

  it('should return false for an invalid iteration name format', () => {
    const iterationName = 'InvalidFormat';
    const result = isValidIterationName(iterationName);
    expect(result).toBe(false);
  });
});

describe('validateIterationName', () => {
  it('should return true for a valid iteration name', async () => {
    const iterationName = 'XYZ:2020/01/01-2022/12/31 Iteration';
    const result = await validateIterationName(iterationName);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid iteration name format', async () => {
    const iterationName = 'InvalidFormat';
    const result = await validateIterationName(iterationName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid iteration name format (e.g. PPP:YYYY/MM/DD-YYYY/MM/DD Iteration)',
      ),
    );
  });

  it('should return an error message for an invalid iteration name prefix', async () => {
    const iterationName = 'XYZ:2020/01/01-2022/12/31';
    const result = await validateIterationName(iterationName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid iteration name format (e.g. PPP:YYYY/MM/DD-YYYY/MM/DD Iteration)',
      ),
    );
  });

  it('should return an error message for an invalid iteration name suffix', async () => {
    const iterationName = 'xyz:2020/01/01-2022/12/31 Iteration';
    const result = await validateIterationName(iterationName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid iteration name format (e.g. PPP:YYYY/MM/DD-YYYY/MM/DD Iteration)',
      ),
    );
  });
});
