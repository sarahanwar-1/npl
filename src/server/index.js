const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const serverPort = 8081;

app.post('/analyze', async (request, response) => {
  const { url } = request.body;

  try {
    const apiResponse = await fetch('https://api.textrazor.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-textrazor-key': process.env.API_KEY,
      },
      body: `url=${encodeURIComponent(url)}&extractors=entities,topics`,
    });

    const responseData = await apiResponse.json();
    response.send(responseData);
  } catch (error) {
    console.error('Error:', error);
    response.status(500).send({ error: 'Unable to process request' });
  }
});

app.listen(serverPort, () => console.log(`Server running on port ${serverPort}`));
