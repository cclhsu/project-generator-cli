import {
  isValidTeamId,
  validateTeamId,
  validateTeamIdDTO,
} from './team-id.validation';

describe('validateTeamIdDTO', () => {
  it('should return true for a valid team ID', async () => {
    const teamId = 'xyz.team';
    const result = await validateTeamIdDTO(teamId);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid team ID format', async () => {
    const teamId = 'InvalidFormat';
    const result = await validateTeamIdDTO(teamId);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid team ID format (e.g. xyz.team)',
      ),
    );
  });

  it('should return an error message for an invalid team ID prefix', async () => {
    const teamId = 'xyz5.team';
    const result = await validateTeamIdDTO(teamId);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid team ID format (e.g. xyz.team)',
      ),
    );
  });

  it('should return an error message for an invalid team ID suffix', async () => {
    const teamId = 'xyz.team5';
    const result = await validateTeamIdDTO(teamId);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid team ID format (e.g. xyz.team)',
      ),
    );
  });
});

describe('isValidTeamId', () => {
  it('should return true for a valid team ID', () => {
    const teamId = 'xyz.team';
    const result = isValidTeamId(teamId);
    expect(result).toBe(true);
  });

  it('should return false for an invalid team ID format', () => {
    const teamId = 'InvalidFormat';
    const result = isValidTeamId(teamId);
    expect(result).toBe(false);
  });
});

describe('validateTeamId', () => {
  it('should return true for a valid team ID', async () => {
    const teamId = 'xyz.team';
    const result = await validateTeamId(teamId);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid team ID format', async () => {
    const teamId = 'InvalidFormat';
    const result = await validateTeamId(teamId);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid team ID format (e.g. xyz.team)',
      ),
    );
  });

  it('should return an error message for an invalid team ID prefix', async () => {
    const teamId = 'xyz5.team';
    const result = await validateTeamId(teamId);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid team ID format (e.g. xyz.team)',
      ),
    );
  });

  it('should return an error message for an invalid team ID suffix', async () => {
    const teamId = 'xyz.team5';
    const result = await validateTeamId(teamId);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid team ID format (e.g. xyz.team)',
      ),
    );
  });
});
