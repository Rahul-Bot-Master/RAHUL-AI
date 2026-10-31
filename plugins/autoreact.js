const { Sparky, isPublic } = require("../lib");

// Global Auto-React State
global.autoReactStatus = global.autoReactStatus !== undefined ? global.autoReactStatus : false;

// --- AUTO-REACT ON/OFF COMMAND ---
Sparky({
  name: "autoreact",
  fromMe: isPublic,
  category: "owner",
  desc: "Turn Auto-React ON or OFF"
}, async ({ m, args }) => {
  let status = args[0] ? args[0].toLowerCase() : "";
  if (status === "on") {
    global.autoReactStatus = true;
    return m.reply("✅ Auto-React is now **ENABLED**!");
  } else if (status === "off") {
    global.autoReactStatus = false;
    return m.reply("❌ Auto-React is now **DISABLED**!");
  } else {
    return m.reply(`ℹ️ Current Auto-React Status: *${global.autoReactStatus ? "ON ✅" : "OFF ❌"}*\nUse: \`.autoreact on\` or \`.autoreact off\``);
  }
});

// --- AUTO-REACT MESSAGE LISTENER ---
Sparky({
    name: "autoreact_handler",
    on: "text",
    fromMe: false
}, async ({ m }) => {
    if (!global.autoReactStatus) return;
    if (m.jid === 'status@broadcast' || (m.key && m.key.remoteJid === 'status@broadcast')) return;
    if (m.broadcast || m.isStatus) return;

    try {
        const emojis = ["❤️", "🔥", "👍", "⚡", "✨", "🚀", "💎"];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        await m.react(randomEmoji);
    } catch (e) {
        console.log("Auto-React Error:", e);
    }
});
