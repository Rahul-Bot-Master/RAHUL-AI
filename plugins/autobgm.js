const { Sparky, isPublic } = require("../lib");
const axios = require('axios');

// Global State for Auto-BGM
global.autoBgmStatus = global.autoBgmStatus !== undefined ? global.autoBgmStatus : true;

// Active user request tracking to prevent flood/rate-limit crashes
const userCooldowns = new Map();

// Tuzi dilleli list (Uguu links)
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
  
  if (fullQuery.includes("on")) {
    global.autoBgmStatus = true;
    return m.reply("✅ Auto-BGM is now **ENABLED**!");
  } else if (fullQuery.includes("off")) {
    global.autoBgmStatus = false;
    return m.reply("❌ Auto-BGM is now **DISABLED**!");
  } else {
    return m.reply(`ℹ️ Current Auto-BGM Status: *${global.autoBgmStatus ? "ON ✅" : "OFF ❌"}*\n\nUse:\n• \`autobgm on\`\n• \`autobgm off\``);
  }
});

// --- AUTO-BGM HANDLER (SIMPLE & FAST AUDIO ONLY) ---
Sparky({
  name: "autobgm_handler",
  on: "text",
  fromMe: false 
}, async ({ client, m }) => {
  try {
    if (!m || !m.jid) return;
    
    let chatJid = m.jid.toString();
    let remoteJid = m.key && m.key.remoteJid ? m.key.remoteJid.toString() : "";
    let participant = m.participant ? m.participant.toString() : "";

    // 🛑 1. STRICT STATUS & BROADCAST BLOCKER
    if (
      chatJid.includes("status@broadcast") || 
      remoteJid.includes("status@broadcast") || 
      participant.includes("status@broadcast") ||
      chatJid === "broadcast" ||
      remoteJid === "broadcast" ||
      m.isStatus === true ||
      m.broadcast === true
    ) {
      return; 
    }

    // 🛑 2. STRICT GROUP BLOCKER (Fakt personal chat madheach chalel)
    if (chatJid.endsWith("@g.us") || remoteJid.endsWith("@g.us")) {
      return; 
    }

    // ✨ Automatically mark incoming message as read (Double Tick / Seen fix!)
    if (client && typeof client.readMessages === 'function' && m.key) {
      await client.readMessages([m.key]).catch(() => {});
    }

    let rawText = m.body || m.text || (m.message && (m.message.conversation || m.message.extendedTextMessage?.text)) || "";
    let bodyText = rawText.trim().toLowerCase();

    // Direct check for text switch without prefix
    if (bodyText === "autobgm on" || bodyText === ".autobgm on" || bodyText === "setautobgm on") {
      global.autoBgmStatus = true;
      return m.reply("✅ Auto-BGM is now **ENABLED**!");
    }
    if (bodyText === "autobgm off" || bodyText === ".autobgm off" || bodyText === "setautobgm off") {
      global.autoBgmStatus = false;
      return m.reply("❌ Auto-BGM is now **DISABLED**!");
    }

    // Jar status off asel tar audio yenar nahi
    if (!global.autoBgmStatus) return;

    // 🛑 3. TRIGGER CONDITIONS (Hi, Hello, Good Morning, Good Night, Ping & All Commands)
    const allowedWords = ["hi", "hello", "good morning", "good night", "ping"];
    const isAllowedWord = allowedWords.some(word => bodyText === word || bodyText.startsWith(word + " "));
    const isCommand = bodyText.startsWith(".") || bodyText.startsWith("!") || bodyText.startsWith("/") || bodyText.startsWith("#");

    if (!isAllowedWord && !isCommand) {
      return; 
    }

    // 🛑 4. ANTI-FLOOD COOLDOWN
    let senderKey = chatJid;
    let now = Date.now();
    if (userCooldowns.has(senderKey)) {
      let lastTime = userCooldowns.get(senderKey);
      if (now - lastTime < 2000) { // 2 seconds gap
        return; 
      }
    }
    userCooldowns.set(senderKey, now);

    let randomAudioUrl = bgmAudios[Math.floor(Math.random() * bgmAudios.length)];

    // Fetch simple audio buffer
    let audioRes = await axios.get(randomAudioUrl, { responseType: 'arraybuffer' }).catch(() => null);
    if (!audioRes || !audioRes.data) return;

    let audioBuffer = Buffer.from(audioRes.data);

    setTimeout(async () => {
      await client.sendMessage(chatJid, {
        audio: audioBuffer,
        mimetype: 'audio/mpeg',
        ptt: false
      }, { quoted: m }).catch(err => console.log("Audio Send Inner Error:", err));
    }, 200);

  } catch (e) {
    console.log("Auto-BGM Error:", e);
  }
});
