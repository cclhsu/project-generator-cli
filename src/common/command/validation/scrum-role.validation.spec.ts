import {
  DEFAULT_SCRUM_ROLE,
  SCRUM_ROLE_TYPES,
  isValidScrumRole,
} from '../../constant';
import {
  // isValidScrumRole,
  validateScrumRole,
  validateScrumRoleDTO,
} from './scrum-role.validation';

describe('validateScrumRoleDTO', () => {
  it('should return true for a valid scrum role', async () => {
    const scrumRole = DEFAULT_SCRUM_ROLE;
    const result = await validateScrumRoleDTO(scrumRole);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid scrum role format', async () => {
    const scrumRole = 'InvalidFormat' as SCRUM_ROLE_TYPES;
    const result = await validateScrumRoleDTO(scrumRole);
    expect(result).toEqual(
      expect.stringContaining(
        'Invalid scrum role type. Allowed values: PO, SM, MEMBER, I',
      ),
    );
  });
});

describe('isValidScrumRole', () => {
  it('should return true for a valid scrum role', () => {
    const scrumRole = DEFAULT_SCRUM_ROLE;
    const result = isValidScrumRole(scrumRole);
    expect(result).toBe(true);
  });

  it('should return false for an invalid scrum role format', () => {
    const scrumRole = 'InvalidFormat';
    const result = isValidScrumRole(scrumRole);
    expect(result).toBe(false);
  });
});

describe('validateScrumRole', () => {
  it('should return true for a valid scrum role', async () => {
    const scrumRole = DEFAULT_SCRUM_ROLE;
    const result = await validateScrumRole(scrumRole);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid scrum role format', async () => {
    const scrumRole = 'InvalidFormat';
    const result = await validateScrumRole(scrumRole);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid scrum role in the type of PO, SM, MEMBER, I',
      ),
    );
  });

  it('should return an error message for an invalid scrum role prefix', async () => {
    const scrumRole = 'john5.doe';
    const result = await validateScrumRole(scrumRole);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid scrum role in the type of PO, SM, MEMBER, I',
      ),
    );
  });

  it('should return an error message for an invalid scrum role suffix', async () => {
    const scrumRole = 'john.doe5';
    const result = await validateScrumRole(scrumRole);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid scrum role in the type of PO, SM, MEMBER, I',
      ),
    );
  });
});
