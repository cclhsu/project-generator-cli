import { Answers } from 'inquirer';
import { ID_MESSAGE, UUID_MESSAGE } from '../dto';

import {
  validateIdUuidStatusDTO,
  isValidIdUuidStatus,
  validateIdUuidStatus,
  isValidIdUuidStatuses,
  convertStringToIdUuidStatusDTO,
} from './id-uuid-status.validation';

describe('Validation Functions', () => {
  describe('validateIdUuidStatusDTO', () => {
    it('should validate a valid IdUuidStatusDTO string', async () => {
      const validString =
        'john.doe/00000000-0000-0000-0000-000000000001/ACTIVE';
      const result = await validateIdUuidStatusDTO(validString);
      expect(result).toBe(true);
    });

    it('should return false for an invalid IdUuidStatusDTO string', async () => {
      const invalidString = 'invalid.id/invalid-uuid/invalid-status';
      const result = await validateIdUuidStatusDTO(invalidString);
      expect(result).toBe(false);
    });
  });

  describe('isValidIdUuidStatus', () => {
    it('should validate a valid IdUuidStatusDTO string', () => {
      const validString =
        'john.doe/00000000-0000-0000-0000-000000000001/ACTIVE';
      const result = isValidIdUuidStatus(validString);
      expect(result).toBe(true);
    });

    it('should return false for an invalid IdUuidStatusDTO string', () => {
      const invalidString = 'invalid.id/invalid-uuid/invalid-status';
      const result = isValidIdUuidStatus(invalidString);
      expect(result).toBe(false);
    });
  });

  describe('validateIdUuidStatus', () => {
    it('should validate a valid IdUuidStatusDTO string', () => {
      const validString =
        'john.doe/00000000-0000-0000-0000-000000000001/ACTIVE';
      const result = validateIdUuidStatus(validString);
      expect(result).toBe(true);
    });

    it('should return an error message for an invalid IdUuidStatusDTO string', () => {
      const invalidString = 'invalid.id/invalid-uuid/invalid-status';
      const result = validateIdUuidStatus(invalidString);
      expect(result).toBe(ID_MESSAGE.errorMessage);
    });

    it('should return a required message for an empty string', () => {
      const emptyString = '';
      const result = validateIdUuidStatus(emptyString);
      expect(result).toBe(ID_MESSAGE.requiredMessage);
    });
  });

  describe('isValidIdUuidStatuses', () => {
    it('should validate valid IdUuidStatusDTOs string', () => {
      const validString =
        'john.doe/00000000-0000-0000-0000-000000000001/ACTIVE,jane.doe/00000000-0000-0000-0000-000000000002/INACTIVE';
      const result = isValidIdUuidStatuses(validString);
      expect(result).toBe(true);
    });

    it('should return false for an invalid IdUuids string', () => {
      const invalidString =
        'john.doe/00000000-0000-0000-0000-000000000001/invalid-status,jane.doe/00000000-0000-0000-0000-000000000002/INACTIVE';
      const result = isValidIdUuidStatuses(invalidString);
      expect(result).toBe(false);
    });
  });

  describe('convertStringToIdUuidStatusDTO', () => {
    it('should convert a valid input string to IdUuidStatusDTO', () => {
      const validString =
        'john.doe/00000000-0000-0000-0000-000000000001/ACTIVE';
      const result = convertStringToIdUuidStatusDTO(validString);
      expect(result).toEqual({
        ID: 'john.doe',
        UUID: '00000000-0000-0000-0000-000000000001',
        status: 'ACTIVE',
      });
    });

    it('should throw an error for an invalid input string', () => {
      const invalidString = 'invalid-id/invalid-uuid/invalid-status';
      expect(() => {
        convertStringToIdUuidStatusDTO(invalidString);
      }).toThrowError('Invalid ID format');
    });
  });
});
