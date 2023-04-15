const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.get('/bot.js', (req, res) => {
  res.sendFile(__dirname + '/bot.js');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
