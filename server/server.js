const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 5000;

const cors = require('cors');
app.use(cors());

app.use(express.json());

app.get('/country/:name', async (req, res) => {
  const { name } = req.params;
  try {
    
    const response = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
    const data = response.data;

    if (data.length > 0) {
      const countryInfo = data[0];
      console.log(countryInfo);
      res.json(countryInfo);
    } else {
      res.status(404).json({ error: 'Country not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});