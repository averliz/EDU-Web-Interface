const express = require('express');
const app = express();
const port = 3000; // or any other port number

const fs = require('fs');
const rawDataFilePath = 'rest_han_reg.raw'; // replace with the actual path to your raw data file

app.get('/api/raw-data', (req, res) => {
  fs.readFile(rawDataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading raw data file');
    } else {
      res.send(data);
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
