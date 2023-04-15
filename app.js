const express = require('express');
const path = require('path');

const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'bot.js'));
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running...');
});
