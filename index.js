const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

const OWNER_ID = "5981189137";

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "🔥 DelayHunter aktif!");
});

bot.on('message', (msg) => {
  if (msg.text !== "/start") {
    bot.sendMessage(msg.chat.id, "👀 Mesajını aldım.");

    bot.sendMessage(
      OWNER_ID,
      `📩 Yeni Mesaj\n👤 ${msg.from.first_name}\n🆔 ${msg.from.id}\n💬 ${msg.text}`
    );
  }
});
