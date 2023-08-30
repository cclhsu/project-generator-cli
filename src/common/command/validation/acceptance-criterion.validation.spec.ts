import {
  isValidAcceptanceCriterion,
  validateAcceptanceCriterion,
  validateAcceptanceCriterionDTO,
} from './acceptance-criterion.validation';

describe('validateAcceptanceCriterionDTO', () => {
  it('should return true for a valid acceptance criterion', async () => {
    const acceptanceCriterion =
      'Given a user is logged in, when the user clicks on the logout button, then the user is logged out.';
    const result = await validateAcceptanceCriterionDTO(acceptanceCriterion);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid acceptance criterion format', async () => {
    const acceptanceCriterion = 'InvalidFormat';
    const result = await validateAcceptanceCriterionDTO(acceptanceCriterion);
    expect(result).toEqual(
      expect.stringContaining(
        'Acceptance Criterion should follow the format "Given <some-context>, When <some-event>, then <some-outcome>".',
      ),
    );
  });

  it('should return an error message for an invalid acceptance criterion prefix', async () => {
    const acceptanceCriterion =
      'I want to login, so that I can access my account';
    const result = await validateAcceptanceCriterionDTO(acceptanceCriterion);
    expect(result).toEqual(
      expect.stringContaining(
        'Acceptance Criterion should follow the format "Given <some-context>, When <some-event>, then <some-outcome>".',
      ),
    );
  });

  it('should return an error message for an invalid acceptance criterion suffix', async () => {
    const acceptanceCriterion = 'As a user, I want to login';
    const result = await validateAcceptanceCriterionDTO(acceptanceCriterion);
    expect(result).toEqual(
      expect.stringContaining(
        'Acceptance Criterion should follow the format "Given <some-context>, When <some-event>, then <some-outcome>".',
      ),
    );
  });
});

describe('isValidAcceptanceCriterion', () => {
  it('should return true for a valid acceptance criterion', () => {
    const acceptanceCriterion =
      'Given a user is logged in, when the user clicks on the logout button, then the user is logged out.';
    const result = isValidAcceptanceCriterion(acceptanceCriterion);
    expect(result).toBe(true);
  });

  it('should return false for an invalid acceptance criterion format', () => {
    const acceptanceCriterion = 'InvalidFormat';
    const result = isValidAcceptanceCriterion(acceptanceCriterion);
    expect(result).toBe(false);
  });
});

describe('validateAcceptanceCriterion', () => {
  it('should return true for a valid acceptance criterion', async () => {
    const acceptanceCriterion =
      'Given a user is logged in, when the user clicks on the logout button, then the user is logged out.';
    const result = await validateAcceptanceCriterion(acceptanceCriterion);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid acceptance criterion format', async () => {
    const acceptanceCriterion = 'InvalidFormat';
    const result = await validateAcceptanceCriterion(acceptanceCriterion);
    expect(result).toEqual(
      expect.stringContaining(
        'Acceptance Criterion should follow the format "Given <some-context>, When <some-event>, then <some-outcome>".',
      ),
    );
  });

  it('should return an error message for an invalid acceptance criterion prefix', async () => {
    const acceptanceCriterion =
      'I want to login, so that I can access my account';
    const result = await validateAcceptanceCriterion(acceptanceCriterion);
    expect(result).toEqual(
      expect.stringContaining(
        'Acceptance Criterion should follow the format "Given <some-context>, When <some-event>, then <some-outcome>".',
      ),
    );
  });

  it('should return an error message for an invalid acceptance criterion suffix', async () => {
    const acceptanceCriterion = 'As a user, I want to login';
    const result = await validateAcceptanceCriterion(acceptanceCriterion);
    expect(result).toEqual(
      expect.stringContaining(
        'Acceptance Criterion should follow the format "Given <some-context>, When <some-event>, then <some-outcome>".',
      ),
    );
  });
});
