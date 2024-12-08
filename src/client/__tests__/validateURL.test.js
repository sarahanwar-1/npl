import { checkUrlValidity } from '../js/validateURL';

describe('URL validation function', () => {
  test('Validates a correctly formatted URL', () => {
    const validUrl = 'https://www.example.com';
    expect(checkUrlValidity(validUrl)).toBe(true);
  });

  test('Rejects an incorrectly formatted URL', () => {
    const invalidUrl = 'invalid-url';
    expect(checkUrlValidity(invalidUrl)).toBe(false);
  });

  test('Handles empty URL input gracefully', () => {
    const emptyUrl = '';
    expect(checkUrlValidity(emptyUrl)).toBe(false);
  });
});