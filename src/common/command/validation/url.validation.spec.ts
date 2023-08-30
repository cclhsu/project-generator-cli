import { isValidUrl, validateUrl, validateUrlDTO } from './url.validation';

describe('validateUrlDTO', () => {
  it('should return true for a valid url', async () => {
    const url = 'https://xyz.com';
    const result = await validateUrlDTO(url);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid url format', async () => {
    const url = 'InvalidFormat';
    const result = await validateUrlDTO(url);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid url format (e.g. https://xyz.com)',
      ),
    );
  });

  it('should return an error message for an invalid url prefix', async () => {
    const url = 'htt://xyz.com';
    const result = await validateUrlDTO(url);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid url format (e.g. https://xyz.com)',
      ),
    );
  });

  it('should return an error message for an invalid url suffix', async () => {
    const url = 'https://xyz.com5';
    const result = await validateUrlDTO(url);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid url format (e.g. https://xyz.com)',
      ),
    );
  });
});

describe('isValidUrl', () => {
  it('should return true for a valid url', () => {
    const url = 'https://xyz.com';
    const result = isValidUrl(url);
    expect(result).toBe(true);
  });

  it('should return false for an invalid url format', () => {
    const url = 'InvalidFormat';
    const result = isValidUrl(url);
    expect(result).toBe(false);
  });
});

describe('validateUrl', () => {
  it('should return true for a valid url', async () => {
    const url = 'https://xyz.com';
    const result = await validateUrl(url);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid url format', async () => {
    const url = 'InvalidFormat';
    const result = await validateUrl(url);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid url format (e.g. https://xyz.com)',
      ),
    );
  });

  it('should return an error message for an invalid url prefix', async () => {
    const url = 'htt://xyz.com';
    const result = await validateUrl(url);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid url format (e.g. https://xyz.com)',
      ),
    );
  });

  it('should return an error message for an invalid url suffix', async () => {
    const url = 'https://xyz.com5';
    const result = await validateUrl(url);
    expect(result).toBe(true);
  });
});
