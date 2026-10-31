const { Sparky, isPublic } = require("../lib");

// Global State for Auto-BGM
global.autoBgmStatus = global.autoBgmStatus !== undefined ? global.autoBgmStatus : true;

// List of random audio/voice note URLs
const bgmAudios = [
  "https://n.uguu.se/qpXsfyCc.mp3",
  "https://github.com/Rahul-Bot-Master/database/raw/main/audio/bgm1.mp3",
  "https://github.com/Rahul-Bot-Master/database/raw/main/audio/bgm2.mp3",
  "https://github.com/Rahul-Bot-Master/database/raw/main/audio/bgm3.mp3"
];

// --- AUTO-BGM ON/OFF COMMAND ---
Sparky({
  name: "autobgm",
  alias: ["setautobgm"],
  fromMe: isPublic,
  category: "owner",
  desc: "Turn Auto-BGM ON or OFF"
}, async ({ m, args, text }) => {
  let fullQuery = (text || args.join(" ") || m.body || "").toLowerCase();
  
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

// --- AUTO-BGM HANDLER (TRIGGER ON EVERY TEXT/COMMAND) ---
Sparky({
  name: "autobgm_handler",
  on: "text",
  fromMe: false 
}, async ({ client, m }) => {
  let bodyText = (m.body || m.text || "").trim().toLowerCase();

  // Direct check for text switch without prefix
  if (bodyText === "autobgm on" || bodyText === ".autobgm on" || bodyText === "setautobgm on") {
    global.autoBgmStatus = true;
    return await m.reply("✅ Auto-BGM is now **ENABLED**!");
  }
  if (bodyText === "autobgm off" || bodyText === ".autobgm off" || bodyText === "setautobgm off") {
    global.autoBgmStatus = false;
    return await m.reply("❌ Auto-BGM is now **DISABLED**!");
  }

  // Jar status off asel tar audio yenar nahi
  if (!global.autoBgmStatus) return;

  // Aata konta pan message asu de (hi, hello, menu, ping, play kiva kontihi text), audio send hoil!
  try {
    let randomAudio = bgmAudios[Math.floor(Math.random() * bgmAudios.length)];

    // Send audio as voice note with slight delay
    setTimeout(async () => {
      await client.sendMessage(m.jid, {
        audio: { url: randomAudio },
        mimetype: 'audio/mp4',
        ptt: true 
      }, { quoted: m }).catch(err => console.log("Audio Send Inner Error:", err));
    }, 400);

  } catch (e) {
    console.log("Auto-BGM Error:", e);
  }
});
