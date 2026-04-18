const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

let kasa = 0;

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id,
`DelayHunter Executive aktif.

Komutlar:
/kasa 5000
/durum
/hedef
/testelite
/testozet`);
});
bot.onText(/\/canli/, (msg) => {
  bot.sendMessage(msg.chat.id,
`Canlı Maç Merkezi

⚽ Finlandiya 2. Lig
67' | 1-1

⚽ Peru Liga 2
74' | 2-1

⚽ İsveç Kadınlar
58' | 0-0

🏀 Poland Basket
Q4 03:12 | 78-75

DelayHunter Live`);
});
bot.onText(/\/firsat/, (msg) => {
  bot.sendMessage(msg.chat.id, `🔥 Güncel Fırsatlar

1️⃣ Peru Liga 2
73' Gol baskısı

2️⃣ Finlandiya 2 Lig
Oran düşüyor

DelayHunter Fırsat`);
});

bot.onText(/\/elite/, (msg) => {
  bot.sendMessage(msg.chat.id, `🚨 ELITE SIGNAL

⚽ Finlandiya 2 Lig
78'

Güven Skoru: 9.2

DelayHunter Elite`);
});
bot.onText(/\/global/, (msg) => {
  bot.sendMessage(msg.chat.id, `🌍 Global Canlı Merkez

⚽ Finlandiya 2 Lig
68' | 1-1

⚽ Peru Liga 2
74' | 2-1

⚽ İsveç Kadınlar
59' | 0-0

🏀 Poland Basket
Q4 03:12 | 78-75

🏀 Brazil NBB
Q3 05:41 | 61-58

DelayHunter Global`);
});
bot.onText(/\/delay/, (msg) => {
  bot.sendMessage(msg.chat.id, `⚠️ Veri Farkı Merkezi

⚽ Finlandiya 2 Lig
Kaynak A: 74'
Kaynak B: 70'

⚽ Peru Liga 2
Kaynak A: 81'
Kaynak B: 77'

DelayHunter Delay Engine`);
});

bot.onText(/\/liveplus/, (msg) => {
  bot.sendMessage(msg.chat.id, `🔥 Premium Live Feed

⚽ Peru Liga 2
Gol baskısı artıyor

⚽ Finlandiya 2 Lig
Oran hareketi başladı

🏀 Poland Basket
Tempo yükseldi

DelayHunter Plus`);
});

bot.onText(/\/vip/, (msg) => {
  bot.sendMessage(msg.chat.id, `💎 VIP Sistem

Yakında açılıyor.

Özel sinyaller
Erken bildirimler
Premium analizler`);
});

bot.onText(/\/gunluk/, (msg) => {
  bot.sendMessage(msg.chat.id, `📊 Günlük Durum

Kasa: 5000 TL
Bugünkü Net: +420 TL

Hedef tamamlandı.
Disiplin korunuyor.`);
});
bot.onText(/\/kasa (.+)/, (msg, match) => {
  kasa = parseInt(match[1]);

  bot.sendMessage(msg.chat.id,
`Kasa kaydedildi: ${kasa} TL`);
});

bot.onText(/\/durum/, (msg) => {
  bot.sendMessage(msg.chat.id,
`Güncel Kasa: ${kasa} TL`);
});

bot.onText(/\/hedef/, (msg) => {
  if(kasa <= 0){
    bot.sendMessage(msg.chat.id,"Önce /kasa yaz.");
    return;
  }

  let alt = Math.round(kasa * 0.06);
  let ust = Math.round(kasa * 0.10);
  let stop = Math.round(kasa * 0.05);

  bot.sendMessage(msg.chat.id,
`Günlük Plan

Kasa: ${kasa} TL
Hedef Aralığı: +${alt} TL / +${ust} TL
Stop Loss: -${stop} TL`);
});

bot.onText(/\/testelite/, (msg) => {
  bot.sendMessage(msg.chat.id,
`🚨 ELITE SİNYAL

⚽ Peru Liga 2
Dakika: 81

Veri farkı: 4 dk
Oran düşüşü mevcut
Baskı yüksek

Skor: 9.4 / 10

Öncelikli inceleme önerilir.`);
});

bot.onText(/\/testozet/, (msg) => {
  bot.sendMessage(msg.chat.id,
`Saatlik Özet

1) Finlandiya 2 Lig - Skor 8.3
2) Peru Liga 2 - Skor 9.1
3) Poland Basket - Skor 8.0`);
});

bot.on('message', (msg) => {
  const txt = msg.text;

  if(!txt.startsWith('/')){
    bot.sendMessage(msg.chat.id,"Komut kullanınız. /start");
  }
});

setInterval(() => {
  const chatId = 5981189137;

  bot.sendMessage(chatId,
`10 Dakikalık Canlı Özet

⚽ İzlenen maçlar güncelleniyor
📊 Fırsatlar taranıyor
🔥 Elite sinyal aranıyor

DelayHunter Executive`);
}, 600000);
