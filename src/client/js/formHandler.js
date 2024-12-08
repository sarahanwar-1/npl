import { checkUrlValidity } from './validateURL';

const handleSubmit = async (event) => {
  event.preventDefault();

  const articleUrl = document.getElementById('article-url').value;

  if (!checkUrlValidity(articleUrl)) {
    alert('Please provide a valid URL');
    return;
  }

  try {
    const apiResponse = await fetch('http://localhost:8081/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ articleUrl }),
    });

    const result = await apiResponse.json();
    displayResults(result);
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};

const displayResults = (data) => {
  const resultContainer = document.getElementById('results-container');
  resultContainer.innerHTML = `
    <p>Sentiment: ${data.polarity}</p>
    <p>Degree of Subjectivity: ${data.subjectivity}</p>
    <p>Sample Text: ${data.text}</p>
  `;
};

export { handleSubmit }; // Ensure handleSubmit is being exported
