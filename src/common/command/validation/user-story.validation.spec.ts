import {
  isValidUserStory,
  validateUserStory,
  validateUserStoryDTO,
} from './user-story.validation';

describe('validateUserStoryDTO', () => {
  it('should return true for a valid user story', async () => {
    const userStory = 'As a user, I want to login, so that I can access my account.';
    const result = await validateUserStoryDTO(userStory);
    expect(result).toBe(true);

  });

  it('should return an error message for an invalid user story format', async () => {
    const userStory = 'InvalidFormat';
    const result = await validateUserStoryDTO(userStory);
    expect(result).toEqual(
      expect.stringContaining(
        'User Story should follow the format "As a <some-user>, I want to <some-action>, so that <some-reason>.".',
      ),
    );
  });

  it('should return an error message for an invalid user story prefix', async () => {
    const userStory = 'I want to login, so that I can access my account';
    const result = await validateUserStoryDTO(userStory);
    expect(result).toEqual(
      expect.stringContaining(
        'User Story should follow the format "As a <some-user>, I want to <some-action>, so that <some-reason>.".',
      ),
    );
  });

  it('should return an error message for an invalid user story suffix', async () => {
    const userStory = 'As a user, I want to login';
    const result = await validateUserStoryDTO(userStory);
    expect(result).toEqual(
      expect.stringContaining(
        'User Story should follow the format "As a <some-user>, I want to <some-action>, so that <some-reason>.".',
      ),
    );
  });
});

describe('isValidUserStory', () => {
  it('should return true for a valid user story', () => {
    const userStory =
      'As a user, I want to login, so that I can access my account.';
    const result = isValidUserStory(userStory);
    expect(result).toBe(true);
  });

  it('should return false for an invalid user story format', () => {
    const userStory = 'InvalidFormat';
    const result = isValidUserStory(userStory);
    expect(result).toBe(false);
  });
});

describe('validateUserStory', () => {
  it('should return true for a valid user story', async () => {
    const userStory =
      'As a user, I want to login, so that I can access my account.';
    const result = await validateUserStory(userStory);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid user story format', async () => {
    const userStory = 'InvalidFormat';
    const result = await validateUserStory(userStory);
    expect(result).toEqual(
      expect.stringContaining(
        'User Story should follow the format "As a <some-user>, I want to <some-action>, so that <some-reason>.".',
      ),
    );
  });

  it('should return an error message for an invalid user story prefix', async () => {
    const userStory = 'I want to login, so that I can access my account';
    const result = await validateUserStory(userStory);
    expect(result).toEqual(
      expect.stringContaining(
        'User Story should follow the format "As a <some-user>, I want to <some-action>, so that <some-reason>.".',
      ),
    );
  });

  it('should return an error message for an invalid user story suffix', async () => {
    const userStory = 'As a user, I want to login';
    const result = await validateUserStory(userStory);
    expect(result).toEqual(
      expect.stringContaining(
        'User Story should follow the format "As a <some-user>, I want to <some-action>, so that <some-reason>.".',
      ),
    );
  });
});
