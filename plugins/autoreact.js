const { Sparky, isPublic } = require("../lib");

// Global States
global.autoReactStatus = global.autoReactStatus !== undefined ? global.autoReactStatus : true;
global.customReactEmoji = global.customReactEmoji || ""; // Blank asel tr random emojis vaprel

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
    return m.reply(`ℹ️ Current Auto-React Status: *${global.autoReactStatus ? "ON ✅" : "OFF ❌"}*\n📌 Custom Emoji: *${global.customReactEmoji || "Random 🎲"}*\n\nUse:\n• \`.autoreact on\`\n• \`.autoreact off\`\n• \`.setreact ❤️\``);
  }
});

// --- CUSTOM REACT EMOJI COMMAND ---
Sparky({
  name: "setreact",
  fromMe: isPublic,
  category: "owner",
  desc: "Set custom emoji for auto-react"
}, async ({ m, args }) => {
  let emoji = args[0];
  if (!emoji) {
    global.customReactEmoji = ""; // Reset to random
    return m.reply("🔄 Custom react emoji reset to **Random (🎲)**!");
  }
  
  global.customReactEmoji = emoji;
  return m.reply(`✅ Auto-react custom emoji successfully set to: ${emoji}`);
});

// --- AUTO-REACT MESSAGE LISTENER (WORKS FOR EVERYONE & OWNER) ---
Sparky({
    name: "autoreact_handler",
    on: "text",
    fromMe: true // Owner swata message karel tari react hoil
}, async ({ m }) => {
    if (!global.autoReactStatus) return;
    if (m.jid === 'status@broadcast' || (m.key && m.key.remoteJid === 'status@broadcast')) return;
    if (m.broadcast || m.isStatus) return;

    try {
        let reactionEmoji = "";
        
        if (global.customReactEmoji) {
            reactionEmoji = global.customReactEmoji;
        } else {
            const emojis = ["❤️", "🔥", "👍", "⚡", "✨", "🚀", "💎", "😎", "💯", "🗿"];
            reactionEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        }

        await m.react(reactionEmoji);
    } catch (e) {
        console.log("Auto-React Error:", e);
    }
});
