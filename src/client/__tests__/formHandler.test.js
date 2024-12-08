import { handleSubmit } from '../js/formHandler'; // Correct the import

jest.mock('../js/validateURL');  // Mocking checkUrlValidity
const { checkUrlValidity } = require('../js/validateURL');

describe('Form submission handler', () => {
  beforeEach(() => {
    // Setting up the DOM before each test
    document.body.innerHTML = `
      <form>
        <input type="text" id="article-url" value="https://example.com">
        <button type="submit" id="submit-btn">Submit</button>
      </form>
      <div id="results-container"></div>
    `;
  });

  test('Ensures form handler function is defined', () => {
    expect(handleSubmit).toBeDefined();  // Verifying handleSubmit is defined
  });

  test('Prevents default form behavior when submitted', () => {
    const mockEvent = { preventDefault: jest.fn() };
    handleSubmit(mockEvent);  // Call handleSubmit
    expect(mockEvent.preventDefault).toHaveBeenCalled();  // Verifying preventDefault was called
  });

  test('Grabs input value from the form field correctly', () => {
    const mockEvent = { preventDefault: jest.fn() };
    handleSubmit(mockEvent);  // Call handleSubmit

    const input = document.getElementById('article-url');
    expect(input.value).toBe('https://example.com');  // Verifying input value
  });

  test('Handles invalid URL input', () => {
    checkUrlValidity.mockReturnValue(false);  // Mock invalid URL response

    const mockEvent = { preventDefault: jest.fn() };
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});  // Mock alert

    handleSubmit(mockEvent);  // Call handleSubmit

    expect(alertMock).toHaveBeenCalledWith('Please provide a valid URL');  // Check if alert is triggered
    alertMock.mockRestore();  // Restore original alert function
  });

  test('Handles valid URL and makes API request', async () => {
    checkUrlValidity.mockReturnValue(true);  // Mock valid URL response

    const mockEvent = { preventDefault: jest.fn() };
    const mockApiResponse = { polarity: 'positive', subjectivity: 'subjective', text: 'Sample text' };
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockApiResponse),
    });

    await handleSubmit(mockEvent);  // Call handleSubmit

    // Check if the results are displayed correctly
    const resultContainer = document.getElementById('results-container');
    expect(resultContainer.innerHTML).toContain('Sentiment: positive');
    expect(resultContainer.innerHTML).toContain('Degree of Subjectivity: subjective');
    expect(resultContainer.innerHTML).toContain('Sample Text: Sample text');
  });
});
