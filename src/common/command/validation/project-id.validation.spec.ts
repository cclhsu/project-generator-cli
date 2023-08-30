import {
  isValidProjectId,
  validateProjectId,
  validateProjectIdDTO,
} from './project-id.validation';

describe('validateProjectIdDTO', () => {
  it('should return true for a valid project ID', async () => {
    const projectId = 'ABC';
    const result = await validateProjectIdDTO(projectId);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid project ID format', async () => {
    const projectId = 'InvalidFormat';
    const result = await validateProjectIdDTO(projectId);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid project ID format (e.g. ABC)',
      ),
    );
  });

  it('should return an error message for an invalid project ID prefix', async () => {
    const projectId = 'AXYZ-1234';
    const result = await validateProjectIdDTO(projectId);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid project ID format (e.g. ABC)',
      ),
    );
  });

  it('should return an error message for an invalid project ID suffix', async () => {
    const projectId = 'ABC5';
    const result = await validateProjectIdDTO(projectId);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid project ID format (e.g. ABC)',
      ),
    );
  });
});

describe('isValidProjectId', () => {
  it('should return true for a valid project ID', () => {
    const projectId = 'ABC';
    const result = isValidProjectId(projectId);
    expect(result).toBe(true);
  });

  it('should return false for an invalid project ID format', () => {
    const projectId = 'InvalidFormat';
    const result = isValidProjectId(projectId);
    expect(result).toBe(false);
  });
});

describe('validateProjectId', () => {
  it('should return true for a valid project ID', async () => {
    const projectId = 'ABC';
    const result = await validateProjectId(projectId);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid project ID format', async () => {
    const projectId = 'InvalidFormat';
    const result = await validateProjectId(projectId);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid project ID format (e.g. ABC)',
      ),
    );
  });

  it('should return an error message for an invalid project ID prefix', async () => {
    const projectId = 'AXYZ-1234';
    const result = await validateProjectId(projectId);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid project ID format (e.g. ABC)',
      ),
    );
  });

  it('should return an error message for an invalid project ID suffix', async () => {
    const projectId = 'ABC5';
    const result = await validateProjectId(projectId);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid project ID format (e.g. ABC)',
      ),
    );
  });
});
