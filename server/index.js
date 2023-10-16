const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const pool = require('./db');

require('dotenv').config();

const PORT = 9090;

app.use(bodyParser.json());

app.use(
  cors({
    origin: '*',
  }),
);

app.get('/api', (_, resp) => {
  resp.json({ info: 'Welcome to countries api' });
});

app.get('/api/countries', (req, res) => {
  const searchQuery = req.query.name.toLowerCase();

  pool.connect((err, client) => {
    if (err) {
      throw new Error(err);
    }

    const query = {
      name: 'fetch-countries',
      text: `SELECT * from countries WHERE name ILIKE $1`,
      values: [`%${searchQuery}%`],
    };

    client.query(query, (err, result) => {
      if (err) throw new Error(err);

      res.json(result.rows);
    });
  });
});

app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`);
});
