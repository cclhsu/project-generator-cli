import { isValidPhone, validatePhone, validatePhoneDTO } from './phone.validation';

describe('validatePhoneDTO', () => {
  it('should return true for a valid phone', async () => {
    const phone = '0912-345-678';
    const result = await validatePhoneDTO(phone);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid phone format', async () => {
    const phone = 'InvalidFormat';
    const result = await validatePhoneDTO(phone);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid phone format (e.g. 0912-345-678)',
      ),
    );
  });

  it('should return an error message for an invalid phone prefix', async () => {
    const phone = 'htt://xyz.com';
    const result = await validatePhoneDTO(phone);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid phone format (e.g. 0912-345-678)',
      ),
    );
  });

  it('should return an error message for an invalid phone suffix', async () => {
    const phone = '0912-345-6785';
    const result = await validatePhoneDTO(phone);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid phone format (e.g. 0912-345-678)',
      ),
    );
  });
});

describe('isValidPhone', () => {
  it('should return true for a valid phone', () => {
    const phone = '0912-345-678';
    const result = isValidPhone(phone);
    expect(result).toBe(true);
  });

  it('should return false for an invalid phone format', () => {
    const phone = 'InvalidFormat';
    const result = isValidPhone(phone);
    expect(result).toBe(false);
  });
});

describe('validatePhone', () => {
  it('should return true for a valid phone', async () => {
    const phone = '0912-345-678';
    const result = await validatePhone(phone);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid phone format', async () => {
    const phone = 'InvalidFormat';
    const result = await validatePhone(phone);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid phone format (e.g. 0912-345-678)',
      ),
    );
  });

  it('should return an error message for an invalid phone prefix', async () => {
    const phone = 'htt://xyz.com';
    const result = await validatePhone(phone);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid phone format (e.g. 0912-345-678)',
      ),
    );
  });

  it('should return an error message for an invalid phone suffix', async () => {
    const phone = '0912-345-6785';
    const result = await validatePhone(phone);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid phone format (e.g. 0912-345-678)',
      ),
    );
  });
});
