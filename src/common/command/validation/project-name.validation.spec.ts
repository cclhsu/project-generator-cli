import {
  isValidProjectName,
  validateProjectName,
  validateProjectNameDTO,
} from './project-name.validation';

describe('validateProjectNameDTO', () => {
  it('should return true for a valid project name', async () => {
    const projectName = 'XYZ Project';
    const result = await validateProjectNameDTO(projectName);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid project name format', async () => {
    const projectName = 'InvalidFormat';
    const result = await validateProjectNameDTO(projectName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid project name format (e.g. XYZ Project)',
      ),
    );
  });

  it('should return an error message for an invalid project name prefix', async () => {
    const projectName = 'xyz5 project';
    const result = await validateProjectNameDTO(projectName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid project name format (e.g. XYZ Project)',
      ),
    );
  });

  it('should return an error message for an invalid project name suffix', async () => {
    const projectName = 'xyz project5';
    const result = await validateProjectNameDTO(projectName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid project name format (e.g. XYZ Project)',
      ),
    );
  });
});

describe('isValidProjectName', () => {
  it('should return true for a valid project name', () => {
    const projectName = 'XYZ Project';
    const result = isValidProjectName(projectName);
    expect(result).toBe(true);
  });

  it('should return false for an invalid project name format', () => {
    const projectName = 'InvalidFormat';
    const result = isValidProjectName(projectName);
    expect(result).toBe(false);
  });
});

describe('validateProjectName', () => {
  it('should return true for a valid project name', async () => {
    const projectName = 'XYZ Project';
    const result = await validateProjectName(projectName);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid project name format', async () => {
    const projectName = 'InvalidFormat';
    const result = await validateProjectName(projectName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid project name format (e.g. XYZ Project)',
      ),
    );
  });

  it('should return an error message for an invalid project name prefix', async () => {
    const projectName = 'xyz5 project';
    const result = await validateProjectName(projectName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid project name format (e.g. XYZ Project)',
      ),
    );
  });

  it('should return an error message for an invalid project name suffix', async () => {
    const projectName = 'xyz project5';
    const result = await validateProjectName(projectName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid project name format (e.g. XYZ Project)',
      ),
    );
  });
});
