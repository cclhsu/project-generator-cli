import { DEFAULT_PROJECT_ROLE, PROJECT_ROLE_TYPES } from '../../constant';
import {
  // isValidProjectRole,
  validateProjectRoles,
  validateProjectRolesDTO,
} from './project-roles.validation';

describe('validateProjectRolesDTO', () => {
  it('should return true for a valid project roles', async () => {
    const projectRoles = DEFAULT_PROJECT_ROLE;
    const result = await validateProjectRolesDTO([projectRoles]);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid project roles format', async () => {
    const projectRoles = 'InvalidFormat' as PROJECT_ROLE_TYPES;
    const result = await validateProjectRolesDTO([projectRoles]);
    expect(result).toEqual(
      expect.stringContaining(
        'Invalid project roles type. Allowed values: PM, EM, DEV, QA, BA, UX, I',
      ),
    );
  });
});

// describe('isValidProjectRoles', () => {
//   it('should return true for a valid project roles', () => {
//     const projectRoles = DEFAULT_PROJECT_ROLE;
//     const result = isValidProjectRole(projectRoles);
//     expect(result).toBe(true);
//   });

//   it('should return false for an invalid project roles format', () => {
//     const projectRoles = 'InvalidFormat';
//     const result = isValidProjectRole(projectRoles);
//     expect(result).toBe(false);
//   });
// });

describe('validateProjectRoles', () => {
  it('should return true for a valid project roles', async () => {
    const projectRoles = DEFAULT_PROJECT_ROLE;
    const result = await validateProjectRoles(projectRoles);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid project roles format', async () => {
    const projectRoles = 'InvalidFormat';
    const result = await validateProjectRoles(projectRoles);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid project roles in the type of PM, EM, DEV, QA, BA, UX, I',
      ),
    );
  });

  it('should return an error message for an invalid project roles prefix', async () => {
    const projectRoles = 'john5.doe';
    const result = await validateProjectRoles(projectRoles);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid project roles in the type of PM, EM, DEV, QA, BA, UX, I',
      ),
    );
  });

  it('should return an error message for an invalid project roles suffix', async () => {
    const projectRoles = 'john.doe5';
    const result = await validateProjectRoles(projectRoles);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid project roles in the type of PM, EM, DEV, QA, BA, UX, I',
      ),
    );
  });
});
