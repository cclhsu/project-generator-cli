import { DEFAULT_ITERATION_TYPE, ITERATION_TYPES } from '../../constant';
import {
  isValidIterationType,
  validateIterationType,
  validateIterationTypeDTO,
} from './iteration-type.validation';

describe('validateIterationTypeDTO', () => {
  it('should return true for a valid iteration type', async () => {
    const iterationType = DEFAULT_ITERATION_TYPE;
    const result = await validateIterationTypeDTO(iterationType);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid iteration type format', async () => {
    const iterationType = 'InvalidFormat' as ITERATION_TYPES;
    const result = await validateIterationTypeDTO(iterationType);
    expect(result).toEqual(
      expect.stringContaining(
        'Invalid iteration type type. Allowed values: SCRUM, KANBAN',
      ),
    );
  });
});

describe('isValidIterationType', () => {
  it('should return true for a valid iteration type', () => {
    const iterationType = DEFAULT_ITERATION_TYPE;
    const result = isValidIterationType(iterationType);
    expect(result).toBe(true);
  });

  it('should return false for an invalid iteration type format', () => {
    const iterationType = 'InvalidFormat';
    const result = isValidIterationType(iterationType);
    expect(result).toBe(false);
  });
});

describe('validateIterationType', () => {
  it('should return true for a valid iteration type', async () => {
    const iterationType = DEFAULT_ITERATION_TYPE;
    const result = await validateIterationType(iterationType);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid iteration type format', async () => {
    const iterationType = 'InvalidFormat';
    const result = await validateIterationType(iterationType);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid iteration types in the type of SCRUM, KANBAN',
      ),
    );
  });

  it('should return an error message for an invalid iteration type prefix', async () => {
    const iterationType = 'john5.doe';
    const result = await validateIterationType(iterationType);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid iteration types in the type of SCRUM, KANBAN',
      ),
    );
  });

  it('should return an error message for an invalid iteration type suffix', async () => {
    const iterationType = 'john.doe5';
    const result = await validateIterationType(iterationType);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid iteration types in the type of SCRUM, KANBAN',
      ),
    );
  });
});
