import { Answers } from 'inquirer';
import { ID_MESSAGE } from '../dto';

import {
  validateIdUuidDTO,
  isValidIdUuid,
  validateIdUuid,
  isValidIdUuids,
  convertStringToIdUuidDTO,
} from './id-uuid.validation';

describe('Validation Functions', () => {
  describe('validateIdUuidDTO', () => {
    it('should validate a valid IdUuidDTO string', async () => {
      const validString = 'john.doe/00000000-0000-0000-0000-000000000001';
      const result = await validateIdUuidDTO(validString);
      expect(result).toBe(true);
    });

    it('should return false for an invalid IdUuidDTO string', async () => {
      const invalidString = 'invalid.id/invalid-uuid';
      const result = await validateIdUuidDTO(invalidString);
      expect(result).toBe(false);
    });
  });

  describe('isValidIdUuid', () => {
    it('should validate a valid IdUuidDTO string', () => {
      const validString = 'john.doe/00000000-0000-0000-0000-000000000001';
      const result = isValidIdUuid(validString);
      expect(result).toBe(true);
    });

    it('should return false for an invalid IdUuidDTO string', () => {
      const invalidString = 'invalid.id/invalid-uuid';
      const result = isValidIdUuid(invalidString);
      expect(result).toBe(false);
    });
  });

  describe('validateIdUuid', () => {
    it('should validate a valid IdUuidDTO string', () => {
      const validString = 'john.doe/00000000-0000-0000-0000-000000000001';
      const result = validateIdUuid(validString);
      expect(result).toBe(true);
    });

    it('should return an error message for an invalid IdUuidDTO string', () => {
      const invalidString = 'invalid.id/invalid-uuid';
      const result = validateIdUuid(invalidString);
      expect(result).toBe(ID_MESSAGE.errorMessage);
    });

    it('should return a required message for an empty string', () => {
      const emptyString = '';
      const result = validateIdUuid(emptyString);
      expect(result).toBe(ID_MESSAGE.requiredMessage);
    });
  });

  describe('isValidIdUuids', () => {
    it('should validate valid IdUuidDTOs string', () => {
      const validString =
        'john.doe/00000000-0000-0000-0000-000000000001,jane.doe/00000000-0000-0000-0000-000000000002';
      const result = isValidIdUuids(validString);
      expect(result).toBe(true);
    });

    it('should return false for an invalid IdUuids string', () => {
      const invalidString =
        'john.doe/00000000-0000-0000-0000-000000000001,invalid.id/invalid-uuid';
      const result = isValidIdUuids(invalidString);
      expect(result).toBe(false);
    });
  });

  describe('convertStringToIdUuidDTO', () => {
    it('should convert a valid input string to IdUuidDTO', () => {
      const validString = 'john.doe/00000000-0000-0000-0000-000000000001';
      const result = convertStringToIdUuidDTO(validString);
      expect(result).toEqual({
        ID: 'john.doe',
        UUID: '00000000-0000-0000-0000-000000000001',
      });
    });

    it('should throw an error for an invalid input string', () => {
      const invalidString = 'invalid-id/invalid-uuid';
      expect(() => {
        convertStringToIdUuidDTO(invalidString);
      }).toThrowError('Invalid ID format');
    });
  });
});
