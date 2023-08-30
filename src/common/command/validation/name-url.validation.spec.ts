import { Answers } from 'inquirer';
import { ID_MESSAGE, IdAnswerDTO, URL_MESSAGE } from '../dto';
import { validateDto } from '../../../utils/validation/validation.utils';
import { NameUrlDTO } from '../../../common/dto';

import {
  validateNameUrlDTO,
  isValidNameUrl,
  validateNameUrl,
  isValidNameUrls,
  convertStringToNameUrlDTO,
} from './name-url.validation';

// describe('Validation Functions', () => {
//   describe('validateNameUrlDTO', () => {
//     it('should validate a valid NameUrlDTO string', async () => {
//       const validString = 'link1/https://wiki.abc.xyz';
//       const result = await validateNameUrlDTO(validString);
//       expect(result).toBe(true);
//     });

//     it('should return false for an invalid NameUrlDTO string', async () => {
//       const invalidString = 'invalid.name/invalid-url';
//       const result = await validateNameUrlDTO(invalidString);
//       expect(result).toBe(false);
//     });
//   });

//   describe('isValidNameUrl', () => {
//     it('should validate a valid NameUrlDTO string', () => {
//       const validString = 'link1/https://wiki.abc.xyz';
//       const result = isValidNameUrl(validString);
//       expect(result).toBe(true);
//     });

//     it('should return false for an invalid NameUrlDTO string', () => {
//       const invalidString = 'invalid.name/invalid-url';
//       const result = isValidNameUrl(invalidString);
//       expect(result).toBe(false);
//     });
//   });

//   describe('validateNameUrl', () => {
//     it('should validate a valid NameUrlDTO string', () => {
//       const validString = 'link1/https://wiki.abc.xyz';
//       const result = validateNameUrl(validString);
//       expect(result).toBe(true);
//     });

//     it('should return an error message for an invalid NameUrlDTO string', () => {
//       const invalidString = 'invalid.name/invalid-url';
//       const result = validateNameUrl(invalidString);
//       expect(result).toBe(ID_MESSAGE.errorMessage);
//     });

//     it('should return a required message for an empty string', () => {
//       const emptyString = '';
//       const result = validateNameUrl(emptyString);
//       expect(result).toBe(ID_MESSAGE.requiredMessage);
//     });
//   });

//   describe('isValidNameUrls', () => {
//     it('should validate valid NameUrlDTOs string', () => {
//       const validString =
//         'link1/https://wiki.abc.xyz,link2/http://www.wiki.com';
//       const result = isValidNameUrls(validString);
//       expect(result).toBe(true);
//     });

//     it('should return false for an invalid NameUrls string', () => {
//       const invalidString =
//         'link1/https://wiki.abc.xyz,invalid.name/invalid-url';
//       const result = isValidNameUrls(invalidString);
//       expect(result).toBe(false);
//     });
//   });

//   describe('convertStringToNameUrlDTO', () => {
//     it('should convert a valid input string to NameUrlDTO', () => {
//       const validString = 'link1/https://wiki.abc.xyz';
//       const result = convertStringToNameUrlDTO(validString);
//       expect(result).toEqual({
//         NAME: 'link1',
//         URL: 'https://wiki.abc.xyz',
//       });
//     });

//     it('should throw an error for an invalid input string', () => {
//       const invalidString = 'invalid-name/invalid-url';
//       expect(() => {
//         convertStringToNameUrlDTO(invalidString);
//       }).toThrowError('Invalid NAME format');
//     });
//   });
// });

describe('validateNameUrlDTO', () => {
  it('should validate a valid NameUrlDTO', async () => {
    const input = '{"name": "EXAMPLE", "url": "https://example.com"}';
    const result = await validateNameUrlDTO(input);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid NameUrlDTO', async () => {
    const input = '{"name": "invalid_name", "url": "invalid_url"}';
    const result = await validateNameUrlDTO(input);
    expect(result).toBe(false);
  });
});

describe('isValidNameUrl', () => {
  it('should return true for a valid NameUrlDTO string', () => {
    const input = '{"name": "EXAMPLE", "url": "https://example.com"}';
    const result = isValidNameUrl(input);
    expect(result).toBe(true);
  });

  it('should return false for an invalid NameUrlDTO string', () => {
    const input = '{"name": "invalid_name", "url": "invalid_url"}';
    const result = isValidNameUrl(input);
    expect(result).toBe(false);
  });
});

describe('validateNameUrl', () => {
  it('should validate a valid NameUrlDTO string', () => {
    const input = '{"name": "EXAMPLE", "url": "https://example.com"}';
    const result = validateNameUrl(input);
    expect(result).toBe(true);
  });

  it('should return an error message for an invalid NameUrlDTO string', () => {
    const input = '{"name": "invalid_name", "url": "invalid_url"}';
    const result = validateNameUrl(input);
    expect(result).toBe(
      'Please enter a valid URL name in the type of WIKI, JIRA, CONFLUENCE, GITHUB, GITLAB, BITBUCKET, TRELLO, ASANA, NOTION, PRD, DESIGN, HLD, LLD, CODE, TEST, DEPLOY, RELEASE, MONITOR, OTHER, EXTERNAL, INTERNAL, EXAMPLE',
    );
  });

  it('should return a required message for an empty input', () => {
    const input = '';
    const result = validateNameUrl(input);
    expect(result).toBe('Please enter an url name');
  });
});

describe('isValidNameUrls', () => {
  it('should return true for a valid array of NameUrlDTOs', () => {
    const input = '[{"name": "EXAMPLE", "url": "https://example.com"}]';
    const result = isValidNameUrls(input);
    expect(result).toBe(true);
  });

  it('should return false for an invalid array of NameUrlDTOs', () => {
    const input = '[{"name": "invalid_name", "url": "invalid_url"}]';
    const result = isValidNameUrls(input);
    expect(result).toBe(false);
  });
});

describe('convertStringToNameUrlDTO', () => {
  it('should convert JSON format input to a valid NameUrlDTO', () => {
    const input = '{"name": "EXAMPLE", "url": "https://example.com"}';
    const result = convertStringToNameUrlDTO(input);
    const expected: NameUrlDTO = {
      name: 'EXAMPLE',
      url: 'https://example.com',
    };
    expect(result).toEqual(expected);
  });

  it('should throw an error for invalid JSON format input', () => {
    const input = 'invalid_input';
    expect(() => convertStringToNameUrlDTO(input)).toThrowError(
      'Invalid input format',
    );
  });

  // Add more test cases for other input formats if needed
});
