const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "🔥 DelayHunter aktif!\nCanlı maç delay botu hazır.");
});

bot.on('message', (msg) => {
  if (msg.text !== "/start") {
    bot.sendMessage(msg.chat.id, "👀 Mesajını aldım: " + msg.text);
  }
});
