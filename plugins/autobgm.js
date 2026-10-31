const { Sparky, isPublic } = require("../lib");
const axios = require('axios');

// Global State for Auto-BGM
global.autoBgmStatus = global.autoBgmStatus !== undefined ? global.autoBgmStatus : true;

// Active user request tracking to prevent flood
const userCooldowns = new Map();

// Working audio list
const bgmAudios = [
  "https://n.uguu.se/qpXsfyCc.mp3",
  "https://d.uguu.se/mPahXQmj.mp3",
  "https://h.uguu.se/JYAhbQJV.mp3",
  "https://n.uguu.se/oZGnLUSi.mp3"
];

// --- AUTO-BGM ON/OFF COMMAND ---
Sparky({
  name: "autobgm",
  alias: ["setautobgm"],
  fromMe: isPublic,
  category: "owner",
  desc: "Turn Auto-BGM ON or OFF"
}, async ({ m, args, text }) => {
  let safeArgs = Array.isArray(args) ? args.join(" ") : (typeof args === "string" ? args : "");
  let fullQuery = (text || safeArgs || m.body || m.text || "").toLowerCase();
  
  if (fullQuery.includes("off")) {
    global.autoBgmStatus = false;
    return m.reply("❌ Auto-BGM is now **DISABLED**!");
  } else if (fullQuery.includes("on") || fullQuery === "") {
    global.autoBgmStatus = true;
    return m.reply("✅ Auto-BGM is now **ENABLED**!");
  } else {
    return m.reply(`ℹ️ Current Auto-BGM Status: *${global.autoBgmStatus ? "ON ✅" : "OFF ❌"}*\n\nUse:\n• \`autobgm on\`\n• \`autobgm off\``);
  }
});

// --- AUTO-BGM HANDLER (BUFFER DOWNLOAD & SECURE SEND) ---
Sparky({
  name: "autobgm_handler",
  on: "all"
}, async ({ client, m }) => {
  try {
    if (!m) return;
    
    let chatJid = (m.key && m.key.remoteJid) ? m.key.remoteJid.toString() : (m.jid ? m.jid.toString() : "");
    if (!chatJid) return;

    // Status & Group Blocker
    if (chatJid.includes("status@broadcast") || chatJid === "broadcast" || m.isStatus === true || m.broadcast === true) return;
    if (chatJid.endsWith("@g.us")) return;

    let rawText = m.body || m.text || m.message?.conversation || m.message?.extendedTextMessage?.text || m.msg?.text || "";
    let bodyText = rawText.trim().toLowerCase();
    if (!bodyText) return;

    if (bodyText.startsWith("autobgm") || bodyText.startsWith(".autobgm") || bodyText.startsWith("setautobgm")) return;
    if (!global.autoBgmStatus) return;

    const allowedWords = ["hi", "hello", "hii", "good morning", "good night", "ping"];
    const isAllowedWord = allowedWords.some(word => bodyText === word || bodyText.startsWith(word + " "));
    const isCommand = bodyText.startsWith(".") || bodyText.startsWith("!") || bodyText.startsWith("/") || bodyText.startsWith("#");

    if (!isAllowedWord && !isCommand) return;

    // Cooldown check
    let senderKey = chatJid;
    let now = Date.now();
    if (userCooldowns.has(senderKey)) {
      if (now - userCooldowns.get(senderKey) < 1500) return;
    }
    userCooldowns.set(senderKey, now);

    let randomAudioUrl = bgmAudios[Math.floor(Math.random() * bgmAudios.length)];

    // Fetch Audio Buffer via Axios
    let audioRes = await axios.get(randomAudioUrl, { responseType: 'arraybuffer' }).catch(err => {
      console.log("Audio Fetch Error:", err.message);
      return null;
    });

    if (!audioRes || !audioRes.data) return;
    let audioBuffer = Buffer.from(audioRes.data);

    // Send Audio Buffer to Chat
    setTimeout(async () => {
      await client.sendMessage(chatJid, {
        audio: audioBuffer,
        mimetype: 'audio/mp4',
        ptt: true
      }, { quoted: m }).catch(err => console.log("Audio Send Error:", err));
    }, 300);

  } catch (e) {
    console.log("Auto-BGM Critical Error:", e);
  }
});
