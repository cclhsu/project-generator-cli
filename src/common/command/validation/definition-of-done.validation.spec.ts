import {
  isValidDefinitionOfDone,
  validateDefinitionOfDone,
  validateDefinitionOfDoneDTO,
} from './definition-of-done.validation';

describe('validateDefinitionOfDoneDTO', () => {
  it('should return true for a valid definition of done', async () => {
    const definitionOfDone =
      'Given a user is logged in, when the user clicks on the logout button, then the user is logged out.';
    const result = await validateDefinitionOfDoneDTO(definitionOfDone);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid definition of done format', async () => {
    const definitionOfDone = 'InvalidFormat';
    const result = await validateDefinitionOfDoneDTO(definitionOfDone);
    expect(result).toEqual(
      expect.stringContaining(
        'Definition of done should follow the format "Given <some-context>, When <some-event>, then <some-outcome>".',
      ),
    );
  });

  it('should return an error message for an invalid definition of done prefix', async () => {
    const definitionOfDone = 'I want to login, so that I can access my account';
    const result = await validateDefinitionOfDoneDTO(definitionOfDone);
    expect(result).toEqual(
      expect.stringContaining(
        'Definition of done should follow the format "Given <some-context>, When <some-event>, then <some-outcome>".',
      ),
    );
  });

  it('should return an error message for an invalid definition of done suffix', async () => {
    const definitionOfDone = 'As a user, I want to login';
    const result = await validateDefinitionOfDoneDTO(definitionOfDone);
    expect(result).toEqual(
      expect.stringContaining(
        'Definition of done should follow the format "Given <some-context>, When <some-event>, then <some-outcome>".',
      ),
    );
  });
});

describe('isValidDefinitionOfDone', () => {
  it('should return true for a valid definition of done', () => {
    const definitionOfDone =
      'Given a user is logged in, when the user clicks on the logout button, then the user is logged out.';
    const result = isValidDefinitionOfDone(definitionOfDone);
    expect(result).toBe(true);
  });

  it('should return false for an invalid definition of done format', () => {
    const definitionOfDone = 'InvalidFormat';
    const result = isValidDefinitionOfDone(definitionOfDone);
    expect(result).toBe(false);
  });
});

describe('validateDefinitionOfDone', () => {
  it('should return true for a valid definition of done', async () => {
    const definitionOfDone =
      'Given a user is logged in, when the user clicks on the logout button, then the user is logged out.';
    const result = await validateDefinitionOfDone(definitionOfDone);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid definition of done format', async () => {
    const definitionOfDone = 'InvalidFormat';
    const result = await validateDefinitionOfDone(definitionOfDone);
    expect(result).toEqual(
      expect.stringContaining(
        'Definition of done should follow the format "Given <some-context>, When <some-event>, then <some-outcome>".',
      ),
    );
  });

  it('should return an error message for an invalid definition of done prefix', async () => {
    const definitionOfDone = 'I want to login, so that I can access my account';
    const result = await validateDefinitionOfDone(definitionOfDone);
    expect(result).toEqual(
      expect.stringContaining(
        'Definition of done should follow the format "Given <some-context>, When <some-event>, then <some-outcome>".',
      ),
    );
  });

  it('should return an error message for an invalid definition of done suffix', async () => {
    const definitionOfDone = 'As a user, I want to login';
    const result = await validateDefinitionOfDone(definitionOfDone);
    expect(result).toEqual(
      expect.stringContaining(
        'Definition of done should follow the format "Given <some-context>, When <some-event>, then <some-outcome>".',
      ),
    );
  });
});
