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

// --- AUTO-BGM HANDLER (FIXED FOR ALL MESSAGES & SELF-CHAT USING 'all') ---
Sparky({
  name: "autobgm_handler",
  on: "all" // 'all' vaparalyamule self-chat ani outbound messages pan 100% trigger hotil
}, async ({ client, m }) => {
  try {
    if (!m) return;
    
    let chatJid = (m.key && m.key.remoteJid) ? m.key.remoteJid.toString() : (m.jid ? m.jid.toString() : "");
    if (!chatJid) return;

    // 🛑 1. STRICT STATUS & BROADCAST BLOCKER
    if (
      chatJid.includes("status@broadcast") || 
      chatJid === "broadcast" ||
      m.isStatus === true ||
      m.broadcast === true
    ) {
      return; 
    }

    // 🛑 2. STRICT GROUP BLOCKER (Fakt personal chat madheach chalel)
    if (chatJid.endsWith("@g.us")) {
      return; 
    }

    // Robust text extraction from all possible message structures
    let rawText = m.body || m.text || 
                  m.message?.conversation || 
                  m.message?.extendedTextMessage?.text || 
                  m.msg?.text || "";
                  
    let bodyText = rawText.trim().toLowerCase();
    if (!bodyText) return;

    // Jar autobgm command asel tar handler madhun kahich karu naye
    if (bodyText.startsWith("autobgm") || bodyText.startsWith(".autobgm") || bodyText.startsWith("setautobgm")) {
      return;
    }

    // Jar status off asel tar audio yenar nahi
    if (!global.autoBgmStatus) return;

    // 🛑 3. TRIGGER CONDITIONS (Hi, Hello, Good Morning, Good Night, Ping & All Commands)
    const allowedWords = ["hi", "hello", "hii", "good morning", "good night", "ping"];
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
      if (now - lastTime < 1500) { // 1.5 seconds gap
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
