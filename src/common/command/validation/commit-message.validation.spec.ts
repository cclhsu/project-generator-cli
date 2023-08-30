import {
  isValidCommitMsg,
  validateCommitMsg,
  validateCommitMessageDTO,
} from './commit-message.validation';

describe('validateCommitMessageDTO', () => {
  it('should return true for a valid commit message', async () => {
    const commitMessage =
      '[PPP-1234] feat: implemented new feature: user authentication.';
    const result = await validateCommitMessageDTO(commitMessage);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid commit message format', async () => {
    const commitMessage = 'InvalidFormat';
    const result = await validateCommitMessageDTO(commitMessage);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid commit message format (e.g. [PPP-1234] feat: implemented new feature: user authentication.)',
      ),
    );
  });

  it('should return an error message for an invalid commit message prefix', async () => {
    const commitMessage =
      '[PPP-1234] implemented new feature: user authentication.';
    const result = await validateCommitMessageDTO(commitMessage);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid commit message format (e.g. [PPP-1234] feat: implemented new feature: user authentication.)',
      ),
    );
  });

  it('should return an error message for an invalid commit message suffix', async () => {
    const commitMessage = 'feat: implemented new feature: user authentication.';
    const result = await validateCommitMessageDTO(commitMessage);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid commit message format (e.g. [PPP-1234] feat: implemented new feature: user authentication.)',
      ),
    );
  });
});

describe('isValidCommitMsg', () => {
  it('should return true for a valid commit message', () => {
    const commitMessage =
      '[PPP-1234] feat: implemented new feature: user authentication.';
    const result = isValidCommitMsg(commitMessage);
    expect(result).toBe(true);
  });

  it('should return false for an invalid commit message format', () => {
    const commitMessage = 'InvalidFormat';
    const result = isValidCommitMsg(commitMessage);
    expect(result).toBe(false);
  });
});

describe('validateCommitMsg', () => {
  it('should return true for a valid commit message', async () => {
    const commitMessage =
      '[PPP-1234] feat: implemented new feature: user authentication.';
    const result = await validateCommitMsg(commitMessage);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid commit message format', async () => {
    const commitMessage = 'InvalidFormat';
    const result = await validateCommitMsg(commitMessage);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid commit message format (e.g. [PPP-1234] feat: implemented new feature: user authentication.)',
      ),
    );
  });

  it('should return an error message for an invalid commit message prefix', async () => {
    const commitMessage =
      '[PPP-1234] implemented new feature: user authentication.';
    const result = await validateCommitMsg(commitMessage);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid commit message format (e.g. [PPP-1234] feat: implemented new feature: user authentication.)',
      ),
    );
  });

  it('should return an error message for an invalid commit message suffix', async () => {
    const commitMessage = 'feat: implemented new feature: user authentication';
    const result = await validateCommitMsg(commitMessage);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid commit message format (e.g. [PPP-1234] feat: implemented new feature: user authentication.)',
      ),
    );
  });
});
