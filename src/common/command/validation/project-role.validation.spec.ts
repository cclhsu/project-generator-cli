import {
  DEFAULT_PROJECT_ROLE,
  PROJECT_ROLE_TYPES,
  isValidProjectRole,
} from '../../constant';
import {
  // isValidProjectRole,
  validateProjectRole,
  validateProjectRoleDTO,
} from './project-role.validation';

describe('validateProjectRoleDTO', () => {
  it('should return true for a valid project role', async () => {
    const projectRole = DEFAULT_PROJECT_ROLE;
    const result = await validateProjectRoleDTO(projectRole);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid project role format', async () => {
    const projectRole = 'InvalidFormat' as PROJECT_ROLE_TYPES;
    const result = await validateProjectRoleDTO(projectRole);
    expect(result).toEqual(
      expect.stringContaining(
        'Invalid project role type. Allowed values: PM, EM, DEV, QA, BA, UX, I',
      ),
    );
  });
});

describe('isValidProjectRole', () => {
  it('should return true for a valid project role', () => {
    const projectRole = DEFAULT_PROJECT_ROLE;
    const result = isValidProjectRole(projectRole);
    expect(result).toBe(true);
  });

  it('should return false for an invalid project role format', () => {
    const projectRole = 'InvalidFormat';
    const result = isValidProjectRole(projectRole);
    expect(result).toBe(false);
  });
});

describe('validateProjectRole', () => {
  it('should return true for a valid project role', async () => {
    const projectRole = DEFAULT_PROJECT_ROLE;
    const result = await validateProjectRole(projectRole);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid project role format', async () => {
    const projectRole = 'InvalidFormat';
    const result = await validateProjectRole(projectRole);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid project role in the type of PM, EM, DEV, QA, BA, UX, I',
      ),
    );
  });

  it('should return an error message for an invalid project role prefix', async () => {
    const projectRole = 'john5.doe';
    const result = await validateProjectRole(projectRole);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid project role in the type of PM, EM, DEV, QA, BA, UX, I',
      ),
    );
  });

  it('should return an error message for an invalid project role suffix', async () => {
    const projectRole = 'john.doe5';
    const result = await validateProjectRole(projectRole);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid project role in the type of PM, EM, DEV, QA, BA, UX, I',
      ),
    );
  });
});
