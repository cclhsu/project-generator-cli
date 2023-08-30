import { validateDate } from './date.validation';

describe('validateDate', () => {
  it('should return true for a valid date', async () => {
    const date = '2020/12/12';
    const result = await validateDate(date);
    expect(result).toBe(true);
  });

  it('should return true for a valid date', async () => {
    const date = '2020-12-12';
    const result = await validateDate(date);
    expect(result).toBe(true);
  });

  it('should return true for a valid date', async () => {
    const date = '12/12/2020';
    const result = await validateDate(date);
    expect(result).toBe(true);
  });

  it('should return true for a valid ISO date', async () => {
    const date = new Date('12/12/2020').toISOString();
    const result = await validateDate(date);
    expect(result).toBe(true);
  });

  it('should return true for a valid UTC date', async () => {
    const date = new Date('12/12/2020').toUTCString();
    const result = await validateDate(date);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid date format (e.g. YYYY/MM/DD, YYYY-MM-DD, MM/DD/YYYY, or a valid completed ate string)',
      ),
    );
  });

  it('should return true for a valid date string', async () => {
    const date = new Date('12/12/2020').toDateString();
    const result = await validateDate(date);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid date format (e.g. YYYY/MM/DD, YYYY-MM-DD, MM/DD/YYYY, or a valid completed ate string)',
      ),
    );
  });

  it('should return true for a valid datetime string', async () => {
    const date = new Date('12/12/2020').toTimeString();
    const result = await validateDate(date);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid date format (e.g. YYYY/MM/DD, YYYY-MM-DD, MM/DD/YYYY, or a valid completed ate string)',
      ),
    );
  });

  it('should return true for a valid locale date string', async () => {
    const date = new Date('12/12/2020').toLocaleDateString();
    const result = await validateDate(date);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid date format', async () => {
    const date = 'InvalidFormat';
    const result = await validateDate(date);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid date format (e.g. YYYY/MM/DD, YYYY-MM-DD, MM/DD/YYYY, or a valid completed ate string)',
      ),
    );
  });

  it('should return an error message for an invalid date prefix', async () => {
    const date = '12-12-2020';
    const result = await validateDate(date);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid date format (e.g. YYYY/MM/DD, YYYY-MM-DD, MM/DD/YYYY, or a valid completed ate string)',
      ),
    );
  });

  it('should return an error message for an invalid date suffix', async () => {
    const date = '12/12';
    const result = await validateDate(date);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid date format (e.g. YYYY/MM/DD, YYYY-MM-DD, MM/DD/YYYY, or a valid completed ate string)',
      ),
    );
  });
});
