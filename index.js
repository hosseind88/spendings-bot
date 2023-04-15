const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const TelegramBot = require('node-telegram-bot-api');
const moment = require('jalali-moment');
require('dotenv').config();

// Replace YOUR_TOKEN_HERE with your actual bot token
const bot = new TelegramBot(process.env.API_TOKEN, { polling: true });

// This object will store all the spendings for the current month
let spendings = {};

app.get('*', (req, res) => {
  console.log('aaaaaa ppp');
  bot.on('message', (msg) => {
    console.log('aaaaaa', msg);
    const chatId = msg.chat.id;
  
    // Split the message into an array of words
    const words = msg.text.split(' ');
  
    if (words[0] === '/spent') {
      // Make sure the user provided the amount and the title
      if (words.length < 3) {
        bot.sendMessage(chatId, 'Please provide the amount and the title.');
        return;
      }
  
      // Parse the amount from the first word
      const amount = parseFloat(words[1]);
  
      // Join the rest of the words to form the title
      const title = words.slice(2).join(' ');
  
      // Get the current date in the format of YYYY-MM-DD
      const date = moment().format('jYYYY-jMM-jDD');
  
      // Append the spending to the spendings object
      if (!spendings[date]) {
        spendings[date] = [];
      }
      spendings[date].push({ amount, title });
  
      bot.sendMessage(chatId, `📝 Spending added successfully:\n\nTitle: ${title}\nAmount: ${amount} Toman\nDate: ${moment().format('jYYYY/jMM/jDD')}`);
    }
  
    if (words[0] === '/list') {
      // Get the current month and year
      const month = moment().format('jMMMM');
      const year = moment().format('jYYYY');
  
      let total = 0;
      let message = `💰 Spendings for ${month} ${year}:\n\n`;
  
      // Loop through all the dates in the current month
      for (let date in spendings) {
        if (moment(date, 'jYYYY-jMM-jDD').format('jMMMM') === month && moment(date, 'jYYYY-jMM-jDD').format('jYYYY') === year) {
          message += `${moment(date, 'jYYYY-jMM-jDD').format('jDD jMMMM')}\n\n`;
          spendings[date].forEach((spending) => {
            message += `🔹 ${spending.title}: ${spending.amount} Toman\n`;
            total += spending.amount;
          });
          message += '\n';
        }
      }
  
      message += `💰 Total: ${total} Toman`;
  
      bot.sendMessage(chatId, message);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
