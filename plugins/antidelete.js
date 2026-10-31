const { Sparky, isPublic } = require("../lib");

// Global State for Anti-Delete (Default: ON)
global.antiDeleteStatus = global.antiDeleteStatus !== undefined ? global.antiDeleteStatus : true;

// In-memory message store
const messageStore = new Map();

// --- ANTI-DELETE ON/OFF COMMAND ---
Sparky({
  name: "antidelete",
  alias: ["antideletemsg"],
  fromMe: isPublic,
  category: "owner",
  desc: "Turn Anti-Delete ON or OFF"
}, async ({ m, args, text }) => {
  let safeArgs = Array.isArray(args) ? args.join(" ") : (typeof args === "string" ? args : "");
  let fullQuery = (text || safeArgs || m.body || m.text || "").toLowerCase();
  
  if (fullQuery.includes("on")) {
    global.antiDeleteStatus = true;
    return m.reply("✅ Anti-Delete is now **ENABLED**!");
  } else if (fullQuery.includes("off")) {
    global.antiDeleteStatus = false;
    return m.reply("❌ Anti-Delete is now **DISABLED**!");
  } else {
    return m.reply(`ℹ️ Current Anti-Delete Status: *${global.antiDeleteStatus ? "ON ✅" : "OFF ❌"}*\n\nUse:\n• \`antidelete on\`\n• \`antidelete off\``);
  }
});

// --- STORE MESSAGES IN BACKGROUND ---
Sparky({
  name: "antidelete_store",
  on: "all",
  fromMe: false
}, async ({ m }) => {
  try {
    if (!m || !m.key || !m.key.id) return;
    
    // Store message object and sender details
    messageStore.set(m.key.id, {
      key: m.key,
      message: m.message,
      body: m.body || m.text || "",
      remoteJid: m.key.remoteJid,
      participant: m.participant || m.key.participant || m.key.remoteJid
    });

    // Limit store size to 500 messages
    if (messageStore.size > 500) {
      const firstKey = messageStore.keys().next().value;
      messageStore.delete(firstKey);
    }
  } catch (err) {
    console.log("Anti-Delete Store Error:", err);
  }
});

// --- ANTI-DELETE DETECTOR & RESENDER ---
Sparky({
  name: "antidelete_handler",
  on: "message_delete",
  fromMe: false
}, async ({ client, m }) => {
  try {
    if (!global.antiDeleteStatus) return;
    if (!m || !m.key) return;

    let deletedMsgId = m.key.id || (m.message && m.message.protocolMessage?.key?.id);
    if (!deletedMsgId) return;

    let storedMessage = messageStore.get(deletedMsgId);
    if (!storedMessage) return;

    let chatJid = storedMessage.remoteJid;
    if (!chatJid) return;

    // Direct message content copy karun pathvne (No Forwarded Tag)
    if (storedMessage.message) {
      let content = storedMessage.message;
      
      // Remove any viewOnce wrapper if present so it sends normally if needed, or send raw
      await client.sendMessage(chatJid, content, { quoted: storedMessage.key }).catch(async () => {
        if (storedMessage.body) {
          await client.sendMessage(chatJid, { text: storedMessage.body });
        }
      });
    } else if (storedMessage.body) {
      await client.sendMessage(chatJid, { text: storedMessage.body });
    }

  } catch (e) {
    console.log("Anti-Delete Handler Error:", e);
  }
});
