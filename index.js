const express = require('express');
const { resolve } = require('path');
let cors = require('cors');
let hotels = require('./hotels');

const app = express();
const port = 3000;

app.use(express.static('static'));
app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
