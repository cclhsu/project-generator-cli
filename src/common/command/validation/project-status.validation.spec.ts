import {
  DEFAULT_PROJECT_STATUS,
  PROJECT_STATUS_TYPES,
} from '../../constant';
import {
  isValidProjectStatus,
  validateProjectStatus,
  validateProjectStatusDTO,
} from './project-status.validation';

describe('validateProjectStatusDTO', () => {
  it('should return true for a valid project status', async () => {
    const projectStatus = DEFAULT_PROJECT_STATUS;
    const result = await validateProjectStatusDTO(projectStatus);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid project status format', async () => {
    const projectStatus = 'InvalidFormat' as PROJECT_STATUS_TYPES;
    const result = await validateProjectStatusDTO(projectStatus);
    expect(result).toEqual(
      expect.stringContaining(
        'Invalid project status type. Allowed values: PLANNED, IN_PROGRESS, COMPLETED',
      ),
    );
  });
});

describe('isValidProjectStatus', () => {
  it('should return true for a valid project status', () => {
    const projectStatus = DEFAULT_PROJECT_STATUS;
    const result = isValidProjectStatus(projectStatus);
    expect(result).toBe(true);
  });

  it('should return false for an invalid project status format', () => {
    const projectStatus = 'InvalidFormat';
    const result = isValidProjectStatus(projectStatus);
    expect(result).toBe(false);
  });
});

describe('validateProjectStatus', () => {
  it('should return true for a valid project status', async () => {
    const projectStatus = DEFAULT_PROJECT_STATUS;
    const result = await validateProjectStatus(projectStatus);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid project status format', async () => {
    const projectStatus = 'InvalidFormat';
    const result = await validateProjectStatus(projectStatus);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid project status in the type of PLANNED, IN_PROGRESS, COMPLETED',
      ),
    );
  });

  it('should return an error message for an invalid project status prefix', async () => {
    const projectStatus = 'john5.doe';
    const result = await validateProjectStatus(projectStatus);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid project status in the type of PLANNED, IN_PROGRESS, COMPLETED',
      ),
    );
  });

  it('should return an error message for an invalid project status suffix', async () => {
    const projectStatus = 'john.doe5';
    const result = await validateProjectStatus(projectStatus);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid project status in the type of PLANNED, IN_PROGRESS, COMPLETED',
      ),
    );
  });
});
