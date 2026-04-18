const TelegramBot = require('node-telegram-bot-api');
const https = require("https");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Bot aktif");
});

app.listen(process.env.PORT || 10000, () => {
  console.log("Web server aktif");
});
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
bot.onText(/^\/canli$/, async (msg) => {
try {
const res = await fetch("https://www.thesportsdb.com/api/v1/json/3/livescore.php?s=Soccer");
const data = await res.json();

if (!data || !data.event || data.event.length === 0) {
bot.sendMessage(msg.chat.id,"📡 Şu anda canlı maç yok.");
return;
}

let text = "🔥 CANLI MAÇ MERKEZİ\n\n";

data.event.slice(0,10).forEach((m,i)=>{

text += `${i+1}. ⚽ ${m.strHomeTeam} ${m.intHomeScore || 0}-${m.intAwayScore || 0} ${m.strAwayTeam}\n`;
text += `⏱ ${m.intTime || "Canlı"} dk\n\n`;

});

bot.sendMessage(msg.chat.id,text);

} catch(err){
bot.sendMessage(msg.chat.id,"❌ Veri alınamadı.");
}
});
bot.onText(/\/firsat/, (msg) => {
  bot.sendMessage(msg.chat.id, `🔥 Güncel Fırsatlar

1️⃣ Peru Liga 2
73' Gol baskısı

2️⃣ Finlandiya 2 Lig
Oran düşüyor

DelayHunter Fırsat`);
});
bot.onText(/^\/global$/, async (msg) => {

try {

const url = "https://www.scorebat.com/video-api/v3/";

const res = await fetch(url);
const data = await res.json();

const games = data.response || [];

if(games.length === 0){
bot.sendMessage(msg.chat.id,"🌍 Veri bulunamadı.");
return;
}

let text = "🌍 GLOBAL LIVE\n\n";

games.slice(0,5).forEach((m,i)=>{
text += `${i+1}. ⚽ ${m.title}\n`;
text += `🏆 ${m.competition}\n\n`;
});

text += "DelayHunter Global";

bot.sendMessage(msg.chat.id,text);

} catch(err){
bot.sendMessage(msg.chat.id,"❌ Veri çekilemedi.");
}

});
bot.onText(/\/elite/, (msg) => {
  bot.sendMessage(msg.chat.id, `🚨 ELITE SIGNAL

⚽ Finlandiya 2 Lig
78'

Güven Skoru: 9.2

DelayHunter Elite`);
});

bot.onText(/^\/globalplus$/, async (msg) => {
try {

const res = await fetch("https://www.thesportsdb.com/api/v1/json/3/livescore.php?s=Soccer");
const data = await res.json();

if (!data || !data.event || data.event.length === 0) {
bot.sendMessage(msg.chat.id,"🔥 Şu anda canlı premium maç yok.");
return;
}

let text = "🔥 GLOBAL PLUS\n\n";

data.event.slice(0,5).forEach((m,i)=>{

text += `${i+1}. ⚽ ${m.strHomeTeam} ${m.intHomeScore || 0}-${m.intAwayScore || 0} ${m.strAwayTeam}\n`;
text += `⏱ ${m.intTime || "Canlı"} dk\n`;
text += `🔥 Premium Takip\n\n`;

});

text += "💰 DelayHunter Plus";

bot.sendMessage(msg.chat.id,text);

} catch(err){
bot.sendMessage(msg.chat.id,"❌ Plus veri hatası");
}
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
  const txt = msg.text || "";

  if (txt && !txt.startsWith('/')) {
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
