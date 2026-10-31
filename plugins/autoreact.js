const { Sparky, isPublic } = require("../lib");

// Global States
global.autoReactStatus = global.autoReactStatus !== undefined ? global.autoReactStatus : true;
global.customReactEmoji = global.customReactEmoji || ""; 

// --- AUTO-REACT ON/OFF COMMAND ---
Sparky({
  name: "autoreact",
  fromMe: isPublic,
  category: "owner",
  desc: "Turn Auto-React ON or OFF"
}, async ({ m, args, text }) => {
  let fullQuery = (text || args.join(" ") || m.body || "").toLowerCase();
  
  if (fullQuery.includes("on")) {
    global.autoReactStatus = true;
    return m.reply("✅ Auto-React is now **ENABLED**!");
  } else if (fullQuery.includes("off")) {
    global.autoReactStatus = false;
    return m.reply("❌ Auto-React is now **DISABLED**!");
  } else {
    return m.reply(`ℹ️ Current Auto-React Status: *${global.autoReactStatus ? "ON ✅" : "OFF ❌"}*\n📌 Custom Emoji: *${global.customReactEmoji || "Random 🎲"}*\n\nUse:\n• \`.autoreact on\` (or without dot: \`autoreact on\`)\n• \`.autoreact off\` (or without dot: \`autoreact off\`)\n• \`.setreact ❤️\``);
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
    global.customReactEmoji = ""; 
    return m.reply("🔄 Custom react emoji reset to **Random (🎲)**!");
  }
  
  global.customReactEmoji = emoji;
  return m.reply(`✅ Auto-react custom emoji successfully set to: ${emoji}`);
});

// --- AUTO-REACT MESSAGE & DIRECT SWITCH LISTENER ---
Sparky({
    name: "autoreact_handler",
    on: "text",
    fromMe: true 
}, async ({ m }) => {
    let bodyText = (m.body || m.text || "").trim().toLowerCase();

    // Direct check for text without prefix so 'autoreact on/off' works instantly
    if (bodyText === "autoreact on" || bodyText === ".autoreact on") {
        global.autoReactStatus = true;
        return await m.reply("✅ Auto-React is now **ENABLED**!");
    }
    if (bodyText === "autoreact off" || bodyText === ".autoreact off") {
        global.autoReactStatus = false;
        return await m.reply("❌ Auto-React is now **DISABLED**!");
    }

    if (!global.autoReactStatus) return;
    if (m.jid === 'status@broadcast' || (m.key && m.key.remoteJid === 'status@broadcast')) return;
    if (m.broadcast || m.isStatus) return;

    // Command messages var auto-react honar nahi
    if (bodyText.startsWith(".") || bodyText.startsWith("!") || bodyText.startsWith("/") || bodyText.startsWith("#")) return;

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
