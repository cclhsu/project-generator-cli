import {
  isValidTeamName,
  validateTeamName,
  validateTeamNameDTO,
} from './team-name.validation';

describe('validateTeamNameDTO', () => {
  it('should return true for a valid team name', async () => {
    const teamName = 'XYZ Team';
    const result = await validateTeamNameDTO(teamName);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid team name format', async () => {
    const teamName = 'InvalidFormat';
    const result = await validateTeamNameDTO(teamName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid team name format (e.g. XYZ Team)',
      ),
    );
  });

  it('should return an error message for an invalid team name prefix', async () => {
    const teamName = 'xyz5 team';
    const result = await validateTeamNameDTO(teamName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid team name format (e.g. XYZ Team)',
      ),
    );
  });

  it('should return an error message for an invalid team name suffix', async () => {
    const teamName = 'XYZ Team5';
    const result = await validateTeamNameDTO(teamName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid team name format (e.g. XYZ Team)',
      ),
    );
  });
});

describe('isValidTeamName', () => {
  it('should return true for a valid team name', () => {
    const teamName = 'XYZ Team';
    const result = isValidTeamName(teamName);
    expect(result).toBe(true);
  });

  it('should return false for an invalid team name format', () => {
    const teamName = 'InvalidFormat';
    const result = isValidTeamName(teamName);
    expect(result).toBe(false);
  });
});

describe('validateTeamName', () => {
  it('should return true for a valid team name', async () => {
    const teamName = 'XYZ Team';
    const result = await validateTeamName(teamName);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid team name format', async () => {
    const teamName = 'InvalidFormat';
    const result = await validateTeamName(teamName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid team name format (e.g. XYZ Team)',
      ),
    );
  });

  it('should return an error message for an invalid team name prefix', async () => {
    const teamName = 'xyz5 team';
    const result = await validateTeamName(teamName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid team name format (e.g. XYZ Team)',
      ),
    );
  });

  it('should return an error message for an invalid team name suffix', async () => {
    const teamName = 'XYZ Team5';
    const result = await validateTeamName(teamName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid team name format (e.g. XYZ Team)',
      ),
    );
  });
});
