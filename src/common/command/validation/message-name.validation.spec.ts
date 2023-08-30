import {
  isValidCommentName,
  validateCommentName,
  validateCommentNameDTO,
} from './comment-name.validation';

describe('validateCommentNameDTO', () => {
  it('should return true for a valid comment name', async () => {
    const commentName = 'XYZ Comment';
    const result = await validateCommentNameDTO(commentName);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid comment name format', async () => {
    const commentName = 'InvalidFormat';
    const result = await validateCommentNameDTO(commentName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid comment name format (e.g. XYZ Comment)',
      ),
    );
  });

  it('should return an error message for an invalid comment name prefix', async () => {
    const commentName = 'xyz5 comment';
    const result = await validateCommentNameDTO(commentName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid comment name format (e.g. XYZ Comment)',
      ),
    );
  });

  it('should return an error message for an invalid comment name suffix', async () => {
    const commentName = 'xyz comment5';
    const result = await validateCommentNameDTO(commentName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid comment name format (e.g. XYZ Comment)',
      ),
    );
  });
});

describe('isValidCommentName', () => {
  it('should return true for a valid comment name', () => {
    const commentName = 'XYZ Comment';
    const result = isValidCommentName(commentName);
    expect(result).toBe(true);
  });

  it('should return false for an invalid comment name format', () => {
    const commentName = 'InvalidFormat';
    const result = isValidCommentName(commentName);
    expect(result).toBe(false);
  });
});

describe('validateCommentName', () => {
  it('should return true for a valid comment name', async () => {
    const commentName = 'XYZ Comment';
    const result = await validateCommentName(commentName);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid comment name format', async () => {
    const commentName = 'InvalidFormat';
    const result = await validateCommentName(commentName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid comment name format (e.g. XYZ Comment)',
      ),
    );
  });

  it('should return an error message for an invalid comment name prefix', async () => {
    const commentName = 'xyz5 comment';
    const result = await validateCommentName(commentName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid comment name format (e.g. XYZ Comment)',
      ),
    );
  });

  it('should return an error message for an invalid comment name suffix', async () => {
    const commentName = 'xyz comment5';
    const result = await validateCommentName(commentName);
    expect(result).toEqual(
      expect.stringContaining(
        'Please enter a valid comment name format (e.g. XYZ Comment)',
      ),
    );
  });
});
