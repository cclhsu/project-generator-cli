import { DEFAULT_SCRUM_ROLE, SCRUM_ROLE_TYPES } from '../../constant';
import {
  // isValidScrumRole,
  validateScrumRoles,
  validateScrumRolesDTO,
} from './scrum-roles.validation';

describe('validateScrumRolesDTO', () => {
  it('should return true for a valid scrum roles', async () => {
    const scrumRoles = DEFAULT_SCRUM_ROLE;
    const result = await validateScrumRolesDTO([scrumRoles]);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid scrum roles format', async () => {
    const scrumRoles = 'InvalidFormat' as SCRUM_ROLE_TYPES;
    const result = await validateScrumRolesDTO([scrumRoles]);
    expect(result).toEqual(
      expect.stringContaining(
        'Invalid scrum roles type. Allowed values: PO, SM, MEMBER, I',
      ),
    );
  });
});

// describe('isValidScrumRoles', () => {
//   it('should return true for a valid scrum roles', () => {
//     const scrumRoles = DEFAULT_SCRUM_ROLE;
//     const result = isValidScrumRole(scrumRoles);
//     expect(result).toBe(true);
//   });

//   it('should return false for an invalid scrum roles format', () => {
//     const scrumRoles = 'InvalidFormat';
//     const result = isValidScrumRole(scrumRoles);
//     expect(result).toBe(false);
//   });
// });

describe('validateScrumRoles', () => {
  it('should return true for a valid scrum roles', async () => {
    const scrumRoles = DEFAULT_SCRUM_ROLE;
    const result = await validateScrumRoles(scrumRoles);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid scrum roles format', async () => {
    const scrumRoles = 'InvalidFormat';
    const result = await validateScrumRoles(scrumRoles);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid scrum roles in the type of PO, SM, MEMBER, I',
      ),
    );
  });

  it('should return an error message for an invalid scrum roles prefix', async () => {
    const scrumRoles = 'john5.doe';
    const result = await validateScrumRoles(scrumRoles);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid scrum roles in the type of PO, SM, MEMBER, I',
      ),
    );
  });

  it('should return an error message for an invalid scrum roles suffix', async () => {
    const scrumRoles = 'john.doe5';
    const result = await validateScrumRoles(scrumRoles);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid scrum roles in the type of PO, SM, MEMBER, I',
      ),
    );
  });
});
