const { Sparky, isPublic } = require("../lib");
const axios = require('axios');

// Global State
global.autoBgmStatus = global.autoBgmStatus !== undefined ? global.autoBgmStatus : true;
const userCooldowns = new Map();

// Working audio links
const bgmAudios = [
  "https://n.uguu.se/qpXsfyCc.mp3",
  "https://d.uguu.se/mPahXQmj.mp3",
  "https://h.uguu.se/JYAhbQJV.mp3",
  "https://n.uguu.se/oZGnLUSi.mp3"
];

// --- AUTO-BGM COMMAND ---
Sparky({
  name: "autobgm",
  alias: ["setautobgm"],
  fromMe: isPublic,
  category: "owner",
  desc: "Turn Auto-BGM ON or OFF"
}, async ({ m, args, text }) => {
  let query = (text || (Array.isArray(args) ? args.join(" ") : args) || m.body || m.text || "").toLowerCase();
  
  if (query.includes("off")) {
    global.autoBgmStatus = false;
    return m.reply("❌ Auto-BGM is now **DISABLED**!");
  } else if (query.includes("on") || query === "") {
    global.autoBgmStatus = true;
    return m.reply("✅ Auto-BGM is now **ENABLED**!");
  } else {
    return m.reply(`ℹ️ Current Auto-BGM Status: *${global.autoBgmStatus ? "ON ✅" : "OFF ❌"}*\n\nUse:\n• \`autobgm on\`\n• \`autobgm off\``);
  }
});

// --- AUTO-BGM CLEAN LISTENER ---
Sparky({
  name: "autobgm_handler",
  on: "text"
}, async ({ client, m }) => {
  try {
    if (!global.autoBgmStatus) return;
    if (!m || !m.key || !m.key.remoteJid) return;

    let chatJid = m.key.remoteJid.toString();

    // Block groups and statuses
    if (chatJid.endsWith("@g.us") || chatJid.includes("status@broadcast")) return;

    let textMsg = (m.body || m.text || m.message?.conversation || m.message?.extendedTextMessage?.text || "").trim().toLowerCase();
    if (!textMsg) return;

    // Ignore command triggers to prevent loops
    if (textMsg.startsWith("autobgm") || textMsg.startsWith(".autobgm") || textMsg.startsWith("setautobgm")) return;

    // Trigger words
    const triggers = ["hi", "hello", "hii", "good morning", "good night", "ping"];
    let matched = triggers.some(w => textMsg === w || textMsg.startsWith(w + " ")) || textMsg.startsWith(".");

    if (!matched) return;

    // Anti-spam cooldown (1 second)
    let now = Date.now();
    if (userCooldowns.has(chatJid) && now - userCooldowns.get(chatJid) < 1000) return;
    userCooldowns.set(chatJid, now);

    let randomAudio = bgmAudios[Math.floor(Math.random() * bgmAudios.length)];

    let res = await axios.get(randomAudio, { responseType: 'arraybuffer' }).catch(() => null);
    if (!res || !res.data) return;

    let buffer = Buffer.from(res.data);

    await client.sendMessage(chatJid, {
      audio: buffer,
      mimetype: 'audio/mp4',
      ptt: false
    }, { quoted: m });

  } catch (err) {
    console.error("AutoBGM Error:", err);
  }
});
